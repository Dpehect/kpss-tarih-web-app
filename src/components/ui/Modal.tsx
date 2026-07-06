"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Modal({
  open,
  title,
  description,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(5,8,20,.58)] p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(10px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl rounded-[2rem] border border-[var(--border-soft)] bg-[var(--bg)] p-6 text-[var(--ink)] shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">{title}</h2>
                {description ? <p className="mt-2 text-sm leading-7 text-[var(--graphite)]">{description}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--border-soft)] bg-white text-[var(--ink)]"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
