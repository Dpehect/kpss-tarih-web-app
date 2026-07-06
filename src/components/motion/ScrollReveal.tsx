"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function ScrollReveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
