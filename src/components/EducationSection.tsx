"use client";

import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">CORE</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-transparent" />
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-800" />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative md:grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Timeline dot */}
            <div className="absolute -left-10 md:left-1/2 md:-ml-2 top-0 md:top-1/2 md:-mt-2 w-4 h-4 rounded-full bg-gray-600 shadow-[0_0_15px_rgba(156,163,175,0.5)] z-10" />
            
            <div className="md:text-right pb-8 md:pb-0 md:pr-12">
              <span className="font-mono text-sm text-gray-400 mb-2 block tracking-widest">
                2020 – 2023
              </span>
              <h3 className="text-2xl font-bold text-white mb-1">Bachelor of Computer Applications</h3>
              <h4 className="text-lg text-gray-500 font-mono">Chhatrapati Shahu Ji Maharaj University</h4>
            </div>
            
            <div className="md:pl-12 hidden md:block">
              <div className="glass-panel p-6 rounded-xl border border-gray-800 text-gray-400 text-sm">
                Focus on software engineering, database management systems, and core computer science fundamentals.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
