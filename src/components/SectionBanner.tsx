"use client";

import { motion } from "framer-motion";

interface SectionBannerProps {
  eyebrow: string;
  title: string;
  highlight: string;
  gradient: string; // tailwind gradient string e.g. "from-blue-500 to-violet-500"
  description?: string;
}

export default function SectionBanner({ eyebrow, title, highlight, gradient, description }: SectionBannerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-16"
      style={{
        background: "var(--color-background)",
        boxShadow: "inset 4px 4px 12px var(--color-shadow-dark), inset -4px -4px 12px var(--color-shadow-light)",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      {/* Gradient accent line at top */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} rounded-t-2xl`} />

      {/* Subtle bg gradient blob */}
      <div className={`absolute -top-8 -right-8 w-48 h-48 rounded-full blur-[60px] opacity-10 bg-gradient-to-br ${gradient}`} />

      <div className="relative z-10 px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--color-muted)] mb-2 block">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-foreground)] tracking-tight leading-tight">
            {title}{" "}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
              {highlight}
            </span>
          </h2>
          {description && (
            <p className="text-[var(--color-muted)] text-sm mt-2 max-w-md">{description}</p>
          )}
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
          style={{ boxShadow: "4px 4px 12px var(--color-shadow-dark), -4px -4px 12px var(--color-shadow-light)" }}
        >
          <span className="text-white text-xl font-black">/</span>
        </motion.div>
      </div>
    </div>
  );
}
