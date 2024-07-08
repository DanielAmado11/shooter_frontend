"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getUser } from "@/services/user";
import { AuthProvider } from "@/components/providers/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/loader/LoaderPage";
import AudioLoop from "@/components/audioLoop/AudioLoop";

// import { AuthProvider } from "@/components/providers/auth-provider.jsx";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const pathname = usePathname();

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
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider getAuth={getUser}>
            <Suspense fallback={<Loader />}>
              <AudioLoop src="/sounds/loop_1.ogg" />
              {children}
            </Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
