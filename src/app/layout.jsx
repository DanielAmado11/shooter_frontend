import { Outfit } from "next/font/google";
import "./globals.css";
import RootClient from "@/components/providers/root-client";

const poppins = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
