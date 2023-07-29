"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { exploreRecommendations } from "../constants";
import { staggerContainer } from "../utils/motion";
import { RecommendedCard, TitleText, TypingText } from "../components";

const Staff: React.FC = () => {
  const [active, setActive] = useState("");

  return (
    <section className={`sm:p-16 xs:p-8 px-6 py-12`} id="explore">
      <motion.div
        variants={staggerContainer(0.1, 1.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`2xl:max-w-[1280px] w-full mx-auto flex flex-col`}
      >
        {/* <TypingText title="| The Staff" textStyles="text-center" /> */}
        <TitleText
          title={
            <>
              <br className="md:block hidden" /> Recommendations
            </>
          }
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row min-h-[70vh] gap-5">
          {exploreRecommendations.map((world, index) => (
            <RecommendedCard key={world.id} {...world} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Staff;
