import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const loubag = localFont({
  src: [
    { path: "../public/fonts/Loubag-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Loubag-Bold.ttf", weight: "700" },
    { path: "../public/fonts/Loubag-Black.ttf", weight: "900" },
  ],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Claudy's 30th Birthday",
  description: "You're invited to celebrate Claudy's 30th birthday!",
  openGraph: {
    title: "Claudy's 30th Birthday",
    description: "Let's hit the court! Join us for Claudy's 30th.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${loubag.variable} ${dmSans.variable}`}>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
