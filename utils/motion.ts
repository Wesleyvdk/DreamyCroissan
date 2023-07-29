export const fadeIn = (
    direction: "left" | "right" | "up" | "down",
    type: string,
    delay: number,
    duration: number
  ): {
    hidden: { x: number; y: number; opacity: number };
    show: {
      x: number;
      y: number;
      opacity: number;
      transition: {
        type: string;
        delay: number;
        duration: number;
        ease: string;
      };
    };
  } => ({
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  });
  
  export const staggerContainer = (
    staggerChildren: number,
    delayChildren: number
  ): { hidden: {}; show: { transition: { staggerChildren: number; delayChildren: number } } } => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });
  
  
  export const textContainer = {
    hidden: {
      opacity: 0,
    },
    show: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
    }),
  };
  
  export const textVariant2 = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeIn",
      },
    },
  };
  