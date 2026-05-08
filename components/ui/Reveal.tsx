"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Animación individual con whileInView
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, duration = 0.65, y = 24, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Contenedor que aplica stagger a sus RevealItem hijos
interface RevealGroupProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function RevealGroup({ children, stagger = 0.09, className }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hijo de RevealGroup — hereda el stagger del padre
interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

export function RevealItem({ children, className, y = 24 }: RevealItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, scale: 0.93 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
