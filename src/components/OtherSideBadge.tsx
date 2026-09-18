"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Film } from "lucide-react";

export default function OtherSideBadge() {
  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] p-8 sm:p-14 bg-[#12131d] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Ambient Warm Amber / Cyan light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>INTERACTIVE 3D EXPERIENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Explore My Interactive Dimensions
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 font-mono mb-8 leading-relaxed">
          Choose your journey: Take a peaceful stroll through a blooming Japanese Zen Garden with ambient music, or scrub through a high-definition 192-frame 3D cinematic workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Zen Garden Portal */}
          <Link
            href="/garden"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 hover:from-white hover:to-pink-200 text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_35px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95"
          >
            <span>🌸</span>
            <span>Enter Japanese Zen Garden</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </Link>

          {/* 3D Cinematic Workspace Portal */}
          <Link
            href="/other-side"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Film className="w-4 h-4 text-cyan-400" />
            <span>3D Scrubbing Workspace</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
