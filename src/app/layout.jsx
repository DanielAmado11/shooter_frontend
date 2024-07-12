"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getUser } from "@/services/user";
import { AuthProvider } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/loader/LoaderPage";
import { sounds } from "@/components/sounds/sounds";
import Rotate from "@/components/rotate/rotate";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [rotate, setRotate] = useState(false);
  const [soundsInitialized, setSoundsInitialized] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth <= 768; // Puedes ajustar el ancho según tus necesidades
      const isVertical = window.innerHeight > window.innerWidth;
      setRotate(isMobile && isVertical);
    }

    // Agregar el evento de resize
    window.addEventListener("resize", handleResize);

    // Verificar la orientación inicial
    handleResize();

    // Limpiar el evento de resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initializeSounds = () => {
    sounds.background_1.play();
    setSoundsInitialized(true);
  };

  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider getAuth={getUser}>
            <Rotate open={rotate} onClose={() => setRotate(false)} />
            {!soundsInitialized && (
              <button
                style={{
                  position: "absolute",
                  top: "90%",
                  left: "10%",
                  transform: "translate(-50%, -50%)",
                  padding: "20px",
                  fontSize: "20px",
                  background: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={initializeSounds}
                onTouchStart={initializeSounds}
              >
                Start Sound
              </button>
            )}
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
