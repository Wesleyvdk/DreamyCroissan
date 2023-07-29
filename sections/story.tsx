"use client";
import { motion } from "framer-motion";
import { TypingText } from "../components";

import { fadeIn, staggerContainer } from "../utils/motion";
const Story = () => (
  <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
    <div className="gradient-02 z-0" />
    <div
      className={`2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col`}
    >
      <p className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white">
        Welcome to
        <span className="font-extrabold text-white"> DreamyCroissant</span>,
        your gateway to a world of captivating stories! We believe that every
        story has the power to transport readers to new realms of imagination
        and emotion. Our platform is dedicated to providing a diverse collection
        of tales from talented storytellers across the globe.
      </p>
    </div>
  </section>
);

export default Story;
