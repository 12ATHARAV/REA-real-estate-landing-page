import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Aurelia Homes — Spaces That Rise Above",
  description: "Premium residential developer in Mumbai. Luxury apartments, villas, and penthouses.",
  openGraph: {
    title: "Aurelia Homes — Spaces That Rise Above",
    description: "Premium residential developer in Mumbai.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f5f0e8] antialiased font-[family-name:var(--font-inter)]">{children}</body>
    </html>
  );
}
