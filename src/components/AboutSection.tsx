"use client";

import { motion } from "framer-motion";
import SectionBanner from "./SectionBanner";
import DualityProfile from "./DualityProfile";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-[var(--color-background)] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4">
        <SectionBanner
          eyebrow="about.me // duality"
          title="THE"
          highlight="DEVELOPER & BEYOND"
          gradient="from-blue-500 via-indigo-500 to-rose-500"
          description="High-performance backend engineering meets high-octane real life."
        />

        {/* The Two Sides / Duality Profile Component */}
        <DualityProfile />

        {/* Philosophy & Architecture Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden group mt-12"
          style={{
            background: "var(--color-surface)",
            boxShadow: "10px 10px 25px var(--color-shadow-dark), -10px -10px 25px var(--color-shadow-light)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          {/* Gradient sweep on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
            style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(37,99,235,0.06) 0%, transparent 60%)" }}
          />

          {/* Decorative quote mark */}
          <div
            className="absolute top-6 right-8 text-7xl font-black leading-none select-none pointer-events-none"
            style={{ color: "rgba(37,99,235,0.08)", fontFamily: "Georgia, serif" }}
          >
            &ldquo;
          </div>

          <div className="space-y-6 text-[var(--color-foreground)] text-base md:text-lg leading-relaxed relative z-10">
            <p>
              I&apos;m a full-stack developer who moves comfortably across the entire stack. I specialize in building
              secure REST APIs, designing robust authentication systems, and shipping responsive,
              high-performance frontends.
            </p>
            <p>
              My philosophy is simple:{" "}
              <strong className="text-[var(--color-foreground)] font-semibold">
                clean architecture, readable code, and systems that are easy to reason about six months later.
              </strong>
            </p>
            <p>
              Whether it&apos;s wiring up real-time WebSockets, optimizing SQL queries, or making sure the UI
              feels buttery smooth — I own features end-to-end, from the database schema all the way to the
              deployed pixel.
            </p>
          </div>

          {/* Signature line */}
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center gap-3">
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
              <p className="text-[var(--color-muted)] text-xs font-mono">Full Stack Developer · RCS Tec</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
