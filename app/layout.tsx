import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Nav from "./Nav";
import { Suspense } from "react";

export const metadata = {
  title: "Ophiussa Esports",
  description:
    "6mans and levels leaderboard page of Ophiussa Esports discord server",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-void">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
