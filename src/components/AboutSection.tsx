"use client";

import { motion } from "framer-motion";
import SectionBanner from "./SectionBanner";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4">
        <SectionBanner
          eyebrow="about.me"
          title="THE"
          highlight="ARCHITECTURE"
          gradient="from-blue-500 to-violet-500"
          description="Full-stack mindset. End-to-end ownership. Always shipping."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-8 md:p-12 relative overflow-hidden group"
          style={{
            background: "var(--color-surface)",
            boxShadow: "10px 10px 24px var(--color-shadow-dark), -10px -10px 24px var(--color-shadow-light)",
            border: "1px solid rgba(0,212,255,0.08)",
          }}
        >
          {/* Gradient sweep on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)" }}
          />

          {/* Decorative quote mark */}
          <div
            className="absolute top-6 right-8 text-7xl font-black leading-none select-none pointer-events-none"
            style={{ color: "rgba(0,212,255,0.08)", fontFamily: "Georgia, serif" }}
          >
            &ldquo;
          </div>

          <div className="space-y-6 text-[var(--color-foreground)] text-lg md:text-xl leading-relaxed font-light relative z-10">
            <p>
              I&apos;m a full-stack developer who moves comfortably across the entire stack. I specialize in building
              secure REST APIs, designing robust authentication systems, and shipping responsive,
              high-performance frontends.
            </p>
            <p>
              My philosophy is simple:{" "}
              <strong className="text-[var(--color-foreground)] font-medium">
                clean architecture, readable code, and systems that are easy to reason about six months later.
              </strong>
            </p>
            <p>
              Whether it&apos;s wiring up real-time WebSockets, optimizing SQL queries, or making sure the UI
              feels buttery smooth — I own features end-to-end, from the database schema all the way to the
              deployed pixel.
            </p>
          </div>

          {/* Developer Reality Check */}
          <div className="mt-8 p-5 rounded-2xl neu-inset text-xs font-mono space-y-2 relative z-10 border border-black/5 dark:border-white/5">
            <div className="flex items-center justify-between gap-2 text-[var(--color-primary)] font-bold mb-2">
              <div className="flex items-center gap-2">
                <span>💡</span>
                <span className="tracking-wider">DEVELOPER REALITY CHECK</span>
              </div>
              <span className="text-[10px] text-[var(--color-muted)] font-normal hidden sm:inline">(Confidential engineering truths)</span>
            </div>
            <p className="text-[var(--color-foreground)] leading-relaxed">
              <span className="text-[var(--color-primary)] font-semibold">Bug Protocol:</span> If it works on localhost, the bug is legally classified as a client network anomaly.
            </p>
            <p className="text-[var(--color-foreground)] leading-relaxed">
              <span className="text-[var(--color-secondary)] font-semibold">Refactoring Rule:</span> Never question a 400-line function that has been running untouched since 2021.
            </p>
            <p className="text-[var(--color-foreground)] leading-relaxed">
              <span className="text-emerald-500 font-semibold">Energy Conversion:</span> 3 espressos = 1 microservice. 0 espressos = <code>Cannot read properties of undefined</code>.
            </p>
          </div>

          {/* Signature line */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-[var(--color-primary)]"
              style={{
                background: "var(--color-surface)",
                boxShadow: "inset 3px 3px 8px var(--color-shadow-dark), inset -3px -3px 8px var(--color-shadow-light)",
              }}
            >
              SK
            </div>
            <div>
              <p className="text-[var(--color-foreground)] text-sm font-semibold">Sameer Khan</p>
              <p className="text-[var(--color-muted)] text-xs font-mono">Full Stack Developer · RCS Tec · 0 Uncommitted Merge Conflicts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
