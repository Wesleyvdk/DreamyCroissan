import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ophiussa Esports",
  description: "Ophiussa Esports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-w-fit max-w-full mx-auto py-10 px-4">
            <header>
              <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] scale-300 h-32 invert"
                  src="/image.svg"
                  alt="Next.js Logo"
                  width={1920}
                  height={1080}
                  priority
                />
              </div>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-base font-medium space-x-2">
                  <Link
                    className="hover:bg-gradient-conic from-sky-600 via-purple-950 to-sky-600"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="hover:bg-gradient-conic from-sky-600 via-blue-950 to-sky-600"
                    href="/about"
                  >
                    About
                  </Link>
                  <Link
                    className="hover:bg-gradient-conic from-sky-600 via-blue-950 to-sky-600"
                    href="/stories"
                  >
                    Stories
                  </Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
