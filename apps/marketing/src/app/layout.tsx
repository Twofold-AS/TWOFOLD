import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Marketing",
  description: "Twofold marketing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="inter min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <body>{children}</body>
    </html>
  );
}
