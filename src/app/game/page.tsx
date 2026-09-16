"use client";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to ensure Three.js WebGL canvas mounts client-side
const ThreeGameWorld = dynamic(() => import("@/components/ThreeGameWorld"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#08090f] text-white">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 animate-pulse">
        <span className="text-xl font-black text-amber-300 font-mono">SK</span>
      </div>
      <h2 className="text-2xl font-light text-white mb-2">Loading 3D Playground World</h2>
      <p className="text-xs font-mono text-amber-200/70 uppercase tracking-widest">
        Initializing Three.js Physics &amp; WebGL Canvas
      </p>
    </div>
  ),
});

export default function GamePage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#08090f]">
      <ThreeGameWorld />
    </main>
  );
}
