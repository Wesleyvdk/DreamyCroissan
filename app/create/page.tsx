"use client";
import Image from "next/image";
import "../globals.css";
import { motion } from "framer-motion";
import { TypingText } from "../../components";
import { fadeIn, staggerContainer } from "../../utils/motion";
import { Footer } from "@/components";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Work in progress</div>
      <Footer />
    </main>
  );
}
