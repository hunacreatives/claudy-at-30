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
  icons: { icon: "/elements/paddle.png" },
  openGraph: {
    title: "You're Invited — Claudy's 30th Birthday! 🎾",
    description: "Join us as we celebrate Claudy's 30th! Saturday, July 25th · 5:00 PM · Dinkside Pickleball Court. RSVP at claudyat30.com",
    url: "https://claudyat30.com",
    siteName: "Claudy's 30th",
    type: "website",
    images: [{ url: "https://claudyat30.com/og-image.png", width: 1366, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "You're Invited — Claudy's 30th Birthday! 🎾",
    description: "Join us as we celebrate Claudy's 30th! Saturday, July 25th · 5:00 PM",
    images: ["https://claudyat30.com/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${loubag.variable} ${dmSans.variable}`}>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
