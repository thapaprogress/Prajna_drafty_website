"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

type MotionSectionProps = HTMLMotionProps<"section"> & {
  children: ReactNode;
};

export function MotionSection({ children, className = "", ...props }: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      {...props}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
