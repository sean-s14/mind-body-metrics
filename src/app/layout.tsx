import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { DIMENSIONS } from "@/constants/styles";

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
        <Navigation />
        <main
          className="flex"
          style={{
            minHeight: `calc(100vh - ${
              DIMENSIONS.NAV_HEIGHT + DIMENSIONS.FOOTER_HEIGHT
            }px)`,
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
