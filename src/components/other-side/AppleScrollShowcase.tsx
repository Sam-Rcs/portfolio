"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, RotateCw, Sparkles, SlidersHorizontal, MousePointerClick, Code, Database, Server } from "lucide-react";
import Apple3DDevice from "./Apple3DDevice";

export default function AppleScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [manualOverride, setManualOverride] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentY = -rect.top;
      const p = Math.min(Math.max(currentY / totalScrollable, 0), 1);
      
      setManualOverride(null);
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeProgress = manualOverride !== null ? manualOverride : scrollProgress;

  const scrollToPhase = (targetP: number) => {
    setManualOverride(targetP);
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + targetP * totalScrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative h-[360vh] bg-[#000000]">
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Apple Ambient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(41,151,255,0.1)_0%,_transparent_70%)] pointer-events-none -z-10" />

        {/* 3D MacBook Device Canvas in Center */}
        <div className="absolute inset-0 z-0">
          <Apple3DDevice
            scrollProgress={activeProgress}
            isAutoRotating={isAutoRotating}
          />
        </div>

        {/* Drag Hint Tag */}
        <div className="absolute top-20 right-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161617]/80 border border-white/10 text-xs font-mono text-[#86868b] pointer-events-none z-20 backdrop-blur-md">
          <MousePointerClick className="w-3.5 h-3.5 text-[#2997ff]" />
          <span>Click &amp; Drag Sameer&apos;s MacBook</span>
        </div>

        {/* --- Synchronized Narrative Titles with Sameer's Real Portfolio Data --- */}

        {/* Phase 1: 0% to 25% — Sameer Khan Intro */}
        <div
          className="absolute top-20 sm:top-24 text-center px-4 max-w-4xl pointer-events-none z-10 transition-all duration-500"
          style={{
            opacity: activeProgress < 0.22 ? 1 - activeProgress * 4.2 : 0,
            transform: `translateY(${activeProgress * 40}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sameer Khan &bull; Full Stack Developer</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.02]">
            The Architecture. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#86868b] to-[#424245]">
              Forged in code.
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#86868b] max-w-lg mx-auto">
            Full-stack mindset. End-to-end ownership. Scroll down to open the hardware and inspect my real-world systems.
          </p>
          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#2997ff] font-medium tracking-wide animate-bounce">
            <span>Scroll Down to Inspect Systems</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Phase 2: 25% to 60% — Work History at RCS Tec & Backend Mastery */}
        <div
          className="absolute top-20 sm:top-24 text-center px-4 max-w-3xl pointer-events-none z-10 transition-all duration-500"
          style={{
            opacity: activeProgress >= 0.25 && activeProgress < 0.6 ? 1 : 0,
            transform: `translateY(${(activeProgress - 0.38) * 30}px)`,
          }}
        >
          <div className="text-xs uppercase font-semibold tracking-wider text-[#30d158] mb-2">
            ● Full Stack Developer at RCS Tec (Apr 2024 – Present)
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-[#f5f5f7]">
            Schema to Deployed Pixel.
          </h2>
          <p className="mt-2 text-sm sm:text-lg text-[#86868b] max-w-xl mx-auto leading-relaxed">
            Developing scalable enterprise systems with Spring Boot, Java, React, Node.js, and high-performance SQL databases.
          </p>
        </div>

        {/* Phase 3: 60% to 90% — Flagship Systems (Amagi & NT Bank) */}
        <div
          className="absolute bottom-28 sm:bottom-32 text-center px-4 max-w-3xl pointer-events-none z-10 transition-all duration-500"
          style={{
            opacity: activeProgress >= 0.6 && activeProgress < 0.9 ? 1 : 0,
            transform: `translateY(${(activeProgress - 0.72) * 30}px)`,
          }}
        >
          <div className="text-xs uppercase font-semibold tracking-wider text-[#2997ff] mb-2">
            Flagship Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] text-[#f5f5f7]">
            Amagi Payments &amp; NT Bank.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#86868b] max-w-md mx-auto">
            High-volume transactions, banking approval workflows, and live WebSockets synchronized at 120 FPS.
          </p>
        </div>

        {/* Phase 4: 90% to 100% — Prompt for Projects & Specs */}
        <div
          className="absolute bottom-28 text-center px-4 pointer-events-none z-10 transition-all duration-500"
          style={{
            opacity: activeProgress >= 0.9 ? 1 : 0,
          }}
        >
          <div className="text-xs text-[#86868b] uppercase tracking-widest font-mono">
            Scroll down to inspect all 9+ deployed systems &amp; tech arsenal
          </div>
          <ChevronDown className="w-5 h-5 mx-auto text-[#2997ff] mt-2 animate-bounce" />
        </div>

        {/* --- Apple Interactive Control Dock --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-full bg-[#161617]/90 border border-white/15 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => scrollToPhase(0.0)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeProgress < 0.2
                ? "bg-white text-black font-semibold"
                : "text-[#86868b] hover:text-[#f5f5f7]"
            }`}
          >
            Closed
          </button>

          <button
            onClick={() => scrollToPhase(0.45)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeProgress >= 0.2 && activeProgress < 0.7
                ? "bg-white text-black font-semibold"
                : "text-[#86868b] hover:text-[#f5f5f7]"
            }`}
          >
            Inspect Code
          </button>

          <button
            onClick={() => scrollToPhase(0.85)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeProgress >= 0.7
                ? "bg-white text-black font-semibold"
                : "text-[#86868b] hover:text-[#f5f5f7]"
            }`}
          >
            Retina Zoom
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1 hidden sm:block" />

          {/* Scrubber */}
          <div className="hidden sm:flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#86868b]" />
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(activeProgress * 100)}
              onChange={(e) => setManualOverride(Number(e.target.value) / 100)}
              className="w-24 accent-[#2997ff] cursor-pointer"
            />
            <span className="text-[11px] font-mono text-[#86868b] w-8">
              {Math.round(activeProgress * 100)}%
            </span>
          </div>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* Auto Spin */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              isAutoRotating
                ? "bg-[#2997ff] text-white"
                : "text-[#86868b] hover:text-[#f5f5f7] bg-white/5"
            }`}
            title="Auto rotate 3D device"
          >
            <RotateCw className={`w-3 h-3 ${isAutoRotating ? "animate-spin" : ""}`} />
            <span className="hidden xs:inline">Auto Spin</span>
          </button>
        </div>
      </div>
    </section>
  );
}
