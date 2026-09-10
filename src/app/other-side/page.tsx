"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, ChevronRight } from "lucide-react";
import GoldenBulletShowcase from "@/components/other-side/GoldenBulletShowcase";
import GoldenBento from "@/components/other-side/GoldenBento";
import GoldenProjects from "@/components/other-side/GoldenProjects";

export default function OtherSidePage() {
  return (
    <div
      className="min-h-screen bg-[#030201] text-[#fef3c7] selection:bg-amber-400 selection:text-black relative"
      style={{
        fontFamily:
          'var(--font-outfit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Royal Black & Gold Minimal Top Navigation */}
      <header className="sticky top-0 z-50 w-full px-6 py-3.5 flex items-center justify-between border-b border-amber-500/15 bg-[#030201]/85 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10 text-xs font-mono text-[#fef3c7] transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>Standard Portfolio</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-amber-400/90 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            SAMEER KHAN &bull; KINETIC GALAXY
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            Exit to Home
          </Link>
        </div>
      </header>

      {/* Main Experience */}
      <main>
        {/* The Golden Invisible Supersonic Piercing Scroll Showcase */}
        <GoldenBulletShowcase />

        {/* Royal Black & Gold Bento Grid */}
        <GoldenBento isDark={true} />

        {/* Deployed Systems Showcase */}
        <GoldenProjects isDark={true} />
      </main>

      {/* Return Footer */}
      <footer className="py-24 px-6 border-t border-amber-500/15 bg-[#030201] text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-amber-400 uppercase border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            <span>End of Galaxy Realm</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Return to standard portfolio.
          </h4>
          <p className="text-sm text-neutral-400 leading-relaxed">
            All systems verified and accessible in standard format for recruiter review.
          </p>
          <div className="pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              <span>Return to Main Portfolio</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
