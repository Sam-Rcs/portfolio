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
          highlight="CREDENTIALS"
          gradient="from-slate-500 to-slate-700"
          description="Error 404: GPA Not Found. Reading actual code is recommended instead."
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
              <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest block mb-2">LEARNING STATUS</span>
              <span className="font-black text-2xl text-[var(--color-foreground)]">FOREVER</span>
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
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">Senior StackOverflow Research Fellow</h3>
                <h4 className="text-sm text-[var(--color-muted)] font-mono mb-5">University of YouTube, GitHub &amp; ChatGPT · Class of 2020–∞</h4>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-6">
                  Honestly, who looks at academic certificates in 2026? Production logs and commit graphs tell the real story. But for the traditionalists among us, here is my official developer transcript:
                </p>

                {/* Course Transcript */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 rounded-xl neu-inset flex items-center justify-between">
                    <span className="text-[var(--color-foreground)]">CS101: Exiting Vim</span>
                    <span className="text-amber-500 font-bold">INCOMPLETE</span>
                  </div>
                  <div className="p-3 rounded-xl neu-inset flex items-center justify-between">
                    <span className="text-[var(--color-foreground)]">CS204: Googling Errors</span>
                    <span className="text-emerald-500 font-bold">A+ (SUMMA)</span>
                  </div>
                  <div className="p-3 rounded-xl neu-inset flex items-center justify-between">
                    <span className="text-[var(--color-foreground)]">CS305: Blaming CORS &amp; Cache</span>
                    <span className="text-blue-500 font-bold">100% PERFECT</span>
                  </div>
                  <div className="p-3 rounded-xl neu-inset flex items-center justify-between">
                    <span className="text-[var(--color-foreground)]">CS401: Friday Deployments</span>
                    <span className="text-rose-500 font-bold">SURVIVED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
