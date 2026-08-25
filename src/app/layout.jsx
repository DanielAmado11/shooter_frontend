"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getUser } from "@/services/user";
import { AuthProvider } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/loader/LoaderPage";
import { sounds } from "@/components/sounds/sounds";
import Rotate from "@/components/rotate/rotate";
import Mute from "@/components/mute/Mute";

const poppins = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient();

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [rotate, setRotate] = useState(false);
  const [soundsInitialized, setSoundsInitialized] = useState(false);

  useEffect(() => {
    const initializeSounds = () => {
      if (!soundsInitialized) {
        sounds.background_1.play();
        setSoundsInitialized(true);
      }
    };

    if (isIOS()) {
      document.addEventListener("click", initializeSounds, { once: true });
      document.addEventListener("touchstart", initializeSounds, { once: true });
    } else {
      initializeSounds();
    }

    function handleResize() {
      const isMobile = window.innerWidth <= 768;
      const isVertical = window.innerHeight > window.innerWidth;
      setRotate(isMobile && isVertical);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (isIOS()) {
        document.removeEventListener("click", initializeSounds);
        document.removeEventListener("touchstart", initializeSounds);
      }
    };
  }, [soundsInitialized]);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider getAuth={getUser}>
            <Mute />
            <Rotate
              open={rotate && pathname === "/game"}
              onClose={() => setRotate(false)}
            />
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
