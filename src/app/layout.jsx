"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getUser } from "@/services/user";
import { AuthProvider } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loader from "@/components/loader/LoaderPage";
import { sounds } from "@/components/sounds/sounds";

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
  useEffect(() => {
    sounds.background_1.play();
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
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
