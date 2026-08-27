"use client";

import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 bg-[var(--color-background)] relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-[var(--color-secondary)] font-mono text-xs tracking-[0.4em] uppercase mb-4">work.log</p>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--color-foreground)] tracking-tight">
            OPERATIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]">HISTORY</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] mt-6 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative ml-6 md:ml-0">
          {/* Vertical glowing line */}
          <div className="absolute left-0 md:left-[1.5rem] top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(to bottom, var(--color-primary), var(--color-accent), transparent)" }}
          />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ml-10 md:ml-20 relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[3.2rem] md:-left-[4.4rem] top-8 w-5 h-5 rounded-full z-10 flex items-center justify-center"
              style={{
                background: "var(--color-surface)",
                boxShadow: "0 0 0 3px var(--color-primary), 0 0 14px rgba(37,99,235,0.5)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            </div>

            {/* Experience Card */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden group"
              style={{
                background: "var(--color-surface)",
                boxShadow: "8px 8px 20px var(--color-shadow-dark), -8px -8px 20px var(--color-shadow-light)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
              />

              <div className="relative z-10">
                <span className="font-mono text-xs text-[var(--color-primary)] mb-3 block tracking-widest uppercase">
                  APR 2024 – PRESENT
                </span>

                <div className="relative inline-block group/title mb-1">
                  <h3 className="text-2xl font-bold text-[var(--color-foreground)]">Full Stack Developer</h3>
                  <div
                    className="absolute -top-9 left-0 scale-0 group-hover/title:scale-100 transition-transform duration-200 rounded-xl px-3 py-1.5 text-[10px] font-mono whitespace-nowrap pointer-events-none z-20"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: "3px 3px 8px var(--color-shadow-dark), -3px -3px 8px var(--color-shadow-light)",
                      color: "var(--color-secondary)",
                      border: "1px solid rgba(255,0,110,0.2)",
                    }}
                  >
                    Currently convincing production that everything is fine.
                  </div>
                </div>

                <h4 className="text-base text-[var(--color-muted)] mb-6 font-mono">RCS Tec</h4>

                <ul className="space-y-3">
                  {[
                    "Developing highly scalable applications leveraging Spring Boot, Node.js, React, and MySQL.",
                    "Leading development teams, enforcing code quality through reviews, and managing deployment pipelines.",
                    "Architecting and implementing real-time features, complex workflow systems, and analytics dashboards.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--color-muted)] text-sm leading-relaxed">
                      <span className="text-[var(--color-primary)] mt-0.5 shrink-0">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
