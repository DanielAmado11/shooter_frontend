"use client";
import { getUser, logout } from "@/services/user";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const authContext = createContext({
  data: {},
  status: "UNAUTHENTICATED",
  signOut: () => {},
  refresh: () => {},
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState({});
  const [status, setStatus] = useState("UNAUTHENTICATED");
  const [initialized, setInitialized] = useState(false);

  const getInitialData = useCallback(async () => {
    try {
      const { data } = await getUser();
      if (data) {
        setData(data);
        setStatus("AUTHENTICATED");
      }
    } catch (error) {
      setData({});
      setStatus("UNAUTHENTICATED");
    } finally {
      setInitialized(true);
    }
  }, []);

  const signOut = async () => {
    try {
      await logout();
      Cookies.remove("user_code");
      setData({});
      setStatus("UNAUTHENTICATED");
      router.push("/welcome");
    } catch (error) {
      alert("Error signing out");
    }
  };

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    let cancelled = false;
    const protectedRoutes = ["/", "/dashboard", "/game", "/match", "/multiplayer-stats", "/leaderboard"];
    const guestRoutes = ["/", "/home", "/welcome", "/login"];

    const evaluate = () => {
      if (cancelled || !initialized) return;
      if (protectedRoutes.includes(pathname) && status === "UNAUTHENTICATED") {
        router.push("/welcome");
      }
      if (guestRoutes.includes(pathname) && status === "AUTHENTICATED") {
        router.push("/dashboard");
      }
    };

    // A protected route reached while UNAUTHENTICATED may mean the cookie was
    // just set mid-session (login/consent flow): refresh auth before deciding.
    if (
      initialized &&
      status === "UNAUTHENTICATED" &&
      protectedRoutes.includes(pathname)
    ) {
      getInitialData().then(evaluate);
    } else {
      evaluate();
    }

    return () => {
      cancelled = true;
    };
  }, [pathname, status, initialized, getInitialData, router]);

  return (
    <authContext.Provider value={{ data, status, signOut, refresh: getInitialData }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
