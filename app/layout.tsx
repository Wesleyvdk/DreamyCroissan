import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DreamyCroissant",
  description: "Take stories to the next level",
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
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto mr-20 text-xl font-medium space-x-2">
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
