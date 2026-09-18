"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

// Client-side only rendering for Three.js WebGL Zen Canvas
const ZenGardenWorld = dynamic(() => import("@/components/ZenGardenWorld"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#161522] text-white px-6 text-center select-none">
      {/* Serene Japanese Zen Preloader */}
      <div className="w-20 h-20 rounded-3xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(244,114,182,0.2)] animate-pulse">
        <span className="text-3xl font-serif text-pink-300">禅</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-2">
        Entering the Zen Garden
      </h1>

      <p className="text-xs font-mono text-pink-300/80 mb-6 tracking-widest uppercase flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span>Synthesizing Cherry Blossoms &amp; Ambient Koto</span>
      </p>

      <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-pink-400 via-amber-300 to-pink-400 rounded-full w-2/3 animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  ),
});

export default function ZenGardenPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#161522]">
      <ZenGardenWorld />
    </main>
  );
}
