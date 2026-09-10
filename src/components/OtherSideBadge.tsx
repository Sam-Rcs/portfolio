"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Zap } from "lucide-react";

export default function OtherSideBadge() {
  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] p-8 sm:p-14 border border-amber-500/30 shadow-2xl relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(20, 15, 8, 0.95) 0%, rgba(10, 8, 4, 0.98) 100%)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.15)",
        }}
      >
        {/* Ambient Golden Core Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-amber-500/15 blur-[95px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Page 2 // Golden Galaxy Edition</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Curious about the other side?
        </h2>

        <p className="max-w-lg mx-auto text-sm sm:text-base text-neutral-400 mb-8 font-mono leading-relaxed">
          Step into the Black &amp; Golden Galaxy. Watch a high-speed golden projectile pierce through my name with kinetic physics and spark trails.
        </p>

        <div className="flex justify-center">
          <Link
            href="/other-side"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-black font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current text-black" />
            <span>Enter The Golden Galaxy</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
