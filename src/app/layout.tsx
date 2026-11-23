import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const body = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Saxborsah Music & Event Management | Live saxophone, band, sound & DJ",
  description:
    "Book live saxophone, a live band, sound equipment, DJ services or music consulting for weddings, church services, corporate events and private functions.",
};

export const viewport: Viewport = {
  themeColor: "#E9E6E0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
