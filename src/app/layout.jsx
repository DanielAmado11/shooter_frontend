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

// import { AuthProvider } from "@/components/providers/auth-provider.jsx";

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
  useEffect(() => {
    sounds.background_1.play();

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

  // if (
  //   pathname !== "/login" &&
  //   pathname !== "/term_conditions" &&
  //   pathname !== "/dashboard" &&
  //   pathname !== "/game" &&
  //   pathname !== "/leaderboard"
  // ) {
  //   return (
  //     <html lang="en">
  //       <body className={inter.className}>
  //         <QueryClientProvider client={queryClient}>
  //           {children}
  //         </QueryClientProvider>
  //       </body>
  //     </html>
  //   );
  // }

  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider getAuth={getUser}>
            <Rotate rotate={rotate} onClose={() => setRotate(false)} />
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
