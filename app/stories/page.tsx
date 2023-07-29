"use client";
import Image from "next/image";
import "../globals.css";
import Story from "@/sections/story";
import { Footer } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Story />
      <Footer />
    </main>
  );
}
