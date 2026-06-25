import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const garet = localFont({
  src: [
    { path: "../public/fonts/Garet-Book.ttf", weight: "400" },
    { path: "../public/fonts/Garet-Heavy.ttf", weight: "700" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
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
    <html lang="en" className={`${fraunces.variable} ${garet.variable}`}>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
