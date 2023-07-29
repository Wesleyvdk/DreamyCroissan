import Image from "next/image";
import "../globals.css";
import Story from "@/sections/story";
import { Footer } from "@/components/footer";
import { getServerSession } from "next-auth/next";
import { userAgent } from "next/server";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{session?.user?.name}</div>
      <div>
        <Image
          className="h-8 w-8 rounded-full"
          src={session?.user?.image || "https://avatar.vercel.sh/leerob"}
          height={512}
          width={512}
          alt={`${session?.user?.name || "placeholder"} avatar`}
        />
      </div>
      <Footer />
    </main>
  );
}
