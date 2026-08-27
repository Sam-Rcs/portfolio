"use client";

import { motion } from "framer-motion";
import SectionBanner from "./SectionBanner";

export default function EducationSection() {
  return (
    <section id="education" className="py-28 bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <SectionBanner
          eyebrow="education.log"
          title="ACADEMIC"
          highlight="CORE"
          gradient="from-slate-500 to-slate-700"
          description="Bachelor of Computer Applications · 2020–2023"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:grid md:grid-cols-5 gap-8 items-center"
        >
          {/* Year badge */}
          <div className="md:col-span-2 flex justify-center md:justify-end mb-8 md:mb-0">
            <div
              className="rounded-2xl px-8 py-6 text-center"
              style={{
                background: "var(--color-surface)",
                boxShadow: "inset 4px 4px 12px var(--color-shadow-dark), inset -4px -4px 12px var(--color-shadow-light)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest block mb-2">GRADUATED</span>
              <span className="font-black text-4xl text-[var(--color-foreground)]">2023</span>
            </div>
          </div>

          {/* Content card */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-8 relative overflow-hidden group"
              style={{
                background: "var(--color-surface)",
                boxShadow: "8px 8px 20px var(--color-shadow-dark), -8px -8px 20px var(--color-shadow-light)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(circle at 0% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
              />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">Bachelor of Computer Applications</h3>
                <h4 className="text-sm text-[var(--color-muted)] font-mono mb-5">Chhatrapati Shahu Ji Maharaj University · 2020–2023</h4>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  Focus on software engineering, database management systems, and core computer science fundamentals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
