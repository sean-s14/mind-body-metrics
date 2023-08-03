import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { DIMENSIONS } from "@/constants/styles";
import { Providers } from "./Providers";

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
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main
            className="flex bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-200"
            style={{
              minHeight: `calc(100vh - ${
                DIMENSIONS.NAV_HEIGHT + DIMENSIONS.FOOTER_HEIGHT
              }px)`,
            }}
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
