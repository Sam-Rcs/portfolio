"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

export default function OtherSideBadge() {
  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] p-8 sm:p-14 bg-[#161617] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Apple blue accent light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#2997ff]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#2997ff] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ProMotion Lab</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#f5f5f7] mb-3">
          Curious about the other side?
        </h2>

        <p className="max-w-lg mx-auto text-sm sm:text-base text-[#86868b] mb-8 leading-relaxed">
          Experience Apple-style fluid motions, spring physics, and 120Hz choreography in the experimental lab.
        </p>

        <div className="flex justify-center">
          <Link
            href="/other-side"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,113,227,0.35)] hover:scale-105 active:scale-95"
          >
            <span>Explore ProMotion Experience</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
