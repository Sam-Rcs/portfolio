"use client";

import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";
import CanvasScrubHero from "@/components/CanvasScrubHero";

export default function OtherSidePage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white selection:bg-amber-400 selection:text-black relative">
      {/* 192-Frame 3D Cursor & Scroll Scrubbing Canvas Hero with Dynamic Project Cards */}
      <CanvasScrubHero />

      {/* ── Humorous Return to Normal Portfolio Portal Section ──────────────── */}
      <section id="exit-3d" className="relative py-28 px-6 bg-[#0a0b10] border-t border-white/10 text-center">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 p-8 sm:p-12 rounded-3xl bg-black/60 border border-white/10 shadow-2xl space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
            [ END OF 3D WORKSPACE ]
          </span>

          <h3 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Had enough 3D for today?
          </h3>

          <p className="text-sm font-mono text-neutral-400 max-w-md mx-auto leading-relaxed">
            Ready to head back to the clean, polite, recruiter-friendly main portfolio?
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span>Return to Main Portfolio</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Emergency Escape to Reality</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
