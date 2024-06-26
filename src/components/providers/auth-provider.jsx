"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext({
  data: {},
  status: "UNAUTHENTICATED",
  signOut: () => {},
});

export const AuthProvider = ({ children, getAuth }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState({});
  const [status, setStatus] = useState("UNAUTHENTICATED");

  const getInitialData = async () => {
    try {
      const data = await getAuth();
      if (data) {
        setData(data);
        setStatus("AUTHENTICATED");
      }
    } catch (error) {
      setData({});
      setStatus("UNAUTHENTICATED");
    }
  };

  const signOut = () => {
    setData({});
    setStatus("UNAUTHENTICATED");
    router.push("/welcome");
  };

  useEffect(() => {
    getInitialData();
    if ((pathname === "/term_conditions" || pathname === "/dashboard" || pathname === "/game" || pathname === "/leaderboard") && status === "UNAUTHENTICATED") {
      router.push("/welcome");
    } 
    if ((pathname === "/home" || pathname === "/welcome" || pathname === "/selection" || pathname === "/login") && status === "AUTHENTICATED") {
      router.push("/dashboard");
    }
  }, [pathname, status]);

  return (
    <authContext.Provider value={{ data, status, signOut }}>
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
