"use client";
import Image from "next/image";
import "../globals.css";
import { motion } from "framer-motion";
import { TypingText } from "../../components";
import { fadeIn, staggerContainer } from "../../utils/motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
        <div className="gradient-02 z-0" />
        <motion.div
          variants={staggerContainer(0.1, 1.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col`}
        >
          <motion.p
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
          >
            Welcome to
            <span className="font-extrabold text-white"> DreamyCroissant</span>,
            your gateway to a world of captivating stories! We believe that
            every story has the power to transport readers to new realms of
            imagination and emotion. Our platform is dedicated to providing a
            diverse collection of tales from talented storytellers across the
            globe.
          </motion.p>
        </motion.div>
      </section>
      <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
        <div className="gradient-02 z-0" />
        <motion.div
          variants={staggerContainer(0.1, 1.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col`}
        >
          <motion.p
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
          >
            At DreamyCroissant, you can dive into a myriad of genres, from
            fantasy and science fiction to romance and mystery. With our
            user-friendly interface, you can easily discover stories based on
            your preferences, sorted by upload date, name, or rating. If you're
            an aspiring author, you can share your own tales and connect with
            readers who share your passion for storytelling.
          </motion.p>
        </motion.div>
      </section>
      <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
        <div className="gradient-02 z-0" />
        <motion.div
          variants={staggerContainer(0.1, 1.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col`}
        >
          <motion.p
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
          >
            Our commitment to creating an engaging community extends to the next
            level with secure login options through Discord. With NextAuth
            integration, you can rest assured that your reading journey is both
            seamless and protected.
          </motion.p>
        </motion.div>
      </section>
      <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
        <div className="gradient-02 z-0" />
        <motion.div
          variants={staggerContainer(0.1, 1.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col`}
        >
          <motion.p
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
          >
            Join us on this literary adventure and immerse yourself in the magic
            of words. Uncover new worlds, follow unforgettable characters, and
            be a part of the ever-growing DreamyCroissant community. Happy
            reading!
          </motion.p>
        </motion.div>
      </section>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
