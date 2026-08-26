"use client";

import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-[#050505] relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            OPERATIONAL <span className="text-[var(--color-secondary)]">HISTORY</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-secondary)] to-transparent" />
        </motion.div>

        <div className="relative border-l-2 border-[var(--color-primary)] border-opacity-30 ml-4 md:ml-0">
          {/* Experience Item */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 ml-8 md:ml-12 relative"
          >
            <div className="absolute -left-[41px] md:-left-[57px] top-1 w-6 h-6 bg-[#050505] border-2 border-[var(--color-primary)] rounded-full z-10 shadow-[0_0_10px_var(--color-primary)]" />
            
            <div className="glass-panel p-8 rounded-xl hover:neon-border transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity" />
              
              <span className="font-mono text-sm text-[var(--color-primary)] mb-2 block tracking-widest">
                APR 2024 – PRESENT
              </span>
              <div className="relative inline-block group/title">
                <h3 className="text-2xl font-bold text-white mb-1 cursor-default">Full Stack Developer</h3>
                <div className="absolute -top-8 left-0 scale-0 group-hover/title:scale-100 transition-transform duration-200 bg-black/90 text-[var(--color-secondary)] text-[10px] font-mono px-3 py-1 rounded whitespace-nowrap border border-[var(--color-secondary)]/30 pointer-events-none z-20">
                  Currently convincing production that everything is fine.
                </div>
              </div>
              <h4 className="text-lg text-gray-400 mb-6 font-mono">RCS Tec</h4>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[var(--color-primary)] mr-3 mt-1">▹</span>
                  Developing highly scalable applications leveraging Spring Boot, Node.js, React, and MySQL.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary)] mr-3 mt-1">▹</span>
                  Leading development teams, enforcing code quality through reviews, and managing deployment pipelines.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary)] mr-3 mt-1">▹</span>
                  Architecting and implementing real-time features, complex workflow systems, and analytics dashboards.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
