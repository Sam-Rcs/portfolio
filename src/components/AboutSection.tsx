"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] border-t border-b border-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-2xl border border-[var(--color-primary)]/20 relative overflow-hidden group"
        >
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <h2 className="text-2xl font-mono text-[var(--color-primary)] mb-6 tracking-widest uppercase">
            // The Architecture
          </h2>
          
          <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            <p>
              I'm a full-stack developer who moves comfortably across the stack. I specialize in building secure REST APIs, designing robust authentication systems, and shipping responsive, high-performance frontends.
            </p>
            <p>
              My philosophy is simple: <strong className="text-white font-normal">clean architecture, readable code, and systems that are easy to reason about six months later.</strong>
            </p>
            <p>
              Whether it's wiring up real-time WebSockets, optimizing SQL queries, or making sure the UI feels buttery smooth, I own features end-to-end—from the database schema all the way to the deployed pixel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
