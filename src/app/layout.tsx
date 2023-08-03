import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mind Body Metrics",
  description:
    "MindBodyMetrics - a website for monitoring sleep, exercise, nutrition, reading habits, personal hygiene, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex">{children}</main>
      </body>
    </html>
  );
}
