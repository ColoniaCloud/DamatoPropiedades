"use client";

import { motion } from "framer-motion";

// Usar la misma constante de ease que Reveal.tsx para evitar errores de tipo
const EASE = [0.22, 1, 0.36, 1] as const;

const TEXT = "Expertos en conectar personas con negocios inmobiliarios seguros, transparentes y rentables.";
const WORDS = TEXT.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const word = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function TaglineBanner() {
  return (
    <div className="bg-[#1a5fb4] py-7 px-4 sm:px-6 overflow-hidden">
      <motion.p
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="max-w-4xl mx-auto text-center text-white font-semibold text-lg sm:text-xl lg:text-2xl leading-snug flex flex-wrap justify-center gap-x-[0.35em] gap-y-1"
      >
        {WORDS.map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block">
            {w}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
