"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Coffee } from "lucide-react";

export default function OtherSideBadge() {
  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] p-8 sm:p-14 bg-[#14151f] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Warm Amber / Cyan light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-cyan-500/15 blur-[90px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>CLASSIFIED // 3D WORKSPACE DIMENSION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Curious about my 3D side?
        </h2>

        <p className="max-w-lg mx-auto text-sm sm:text-base text-slate-300 font-mono mb-8 leading-relaxed">
          &quot;This is what happens when you let a developer drink 4 iced espressos and turn their workstation into an interactive 3D scrubbing canvas.&quot;
        </p>

        <div className="flex justify-center">
          <Link
            href="/other-side"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-white hover:to-amber-200 text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
          >
            <Coffee className="w-4 h-4 text-black" />
            <span>Enter The 3D Workspace</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
