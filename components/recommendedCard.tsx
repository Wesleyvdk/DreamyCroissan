"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "../utils/motion";

interface RecommendedCardProps {
  id: string; // eslint-disable-line no-unused-vars
  imgUrl: string;
  title: string;
  about: string;
  index: number;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({
  id, // eslint-disable-line no-unused-vars
  imgUrl,
  title,
  about,
  index,
}) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className={`relative ${"lg:flex-[0.5] flex-[2]"} flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
  >
    <Image
      src={imgUrl}
      width={1280}
      height={720}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[24px]"
    />

    <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
      <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
        {title}
      </h2>
      <p className="font-normal text-[12px] leading-[20.16px] text-white uppercase">
        {about}
      </p>
    </div>
  </motion.div>
);

export default RecommendedCard;
