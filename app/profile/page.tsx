import Image from "next/image";
import "../globals.css";
import { Footer } from "@/components";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Username: {session?.user?.name}</div>
      <Link href="/create"></Link>

      <Footer />
    </main>
  );
}
