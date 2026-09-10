"use client";

import { useRef, useState, useEffect } from "react";
import { Sparkles, ChevronDown, Zap, RotateCcw } from "lucide-react";
import GalaxyStarfield from "./GalaxyStarfield";

export default function GoldenBulletShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualProgress, setManualProgress] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth lerped progress value for 60-120fps buttery smoothness
  const smoothProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const letters = ["S", "A", "M", "E", "E", "R", "\u00A0", "K", "H", "A", "N"];

  // Raw scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const currentY = -rect.top;
      const p = Math.min(Math.max(currentY / total, 0), 1);
      setManualProgress(null);
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const targetProgress = manualProgress !== null ? manualProgress : scrollProgress;

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;
    let startTime: number | null = null;
    const duration = 2400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const p = Math.min(elapsed / duration, 1);
      setManualProgress(p);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setIsPlaying(false);
      }
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [isPlaying]);

  // Smooth 60-120 FPS Lerp Loop to guarantee zero stutter
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const diff = targetProgress - smoothProgressRef.current;
      smoothProgressRef.current += diff * 0.12; // buttery spring easing
      setSmoothProgress(smoothProgressRef.current);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetProgress]);

  // Invisible cutting point X position (-5vw to 105vw)
  // Active between progress 0.15 and 0.78
  const sliceT = Math.min(Math.max((smoothProgress - 0.14) / 0.62, 0), 1);
  const cuttingHeadXPercent = -5 + sliceT * 110; // in vw
  const isBeamActive = smoothProgress >= 0.14 && smoothProgress <= 0.85;

  const fireBeam = () => {
    setManualProgress(0);
    smoothProgressRef.current = 0;
    setIsPlaying(true);
  };

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-[#030201]">
      {/* 100% Pure Dark Cosmic Galaxy Starfield */}
      <GalaxyStarfield isDark={true} />

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none">
        
        {/* Golden Galactic Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full blur-[140px] pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.18)_0%,_rgba(217,119,6,0.06)_45%,_transparent_70%)]" />

        {/* Top Minimalist Tag */}
        <div
          className="absolute top-16 sm:top-20 text-center z-20 transition-opacity duration-700"
          style={{ opacity: smoothProgress < 0.2 ? 1 : 0.35 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Black &amp; Golden Kinetic Galaxy</span>
          </div>
          <p className="text-xs font-mono text-neutral-400">
            {smoothProgress < 0.15
              ? "Scroll down to slice the name with the invisible supersonic beam"
              : "Supersonic incision in progress"}
          </p>
        </div>

        {/* Midline Incision Guide (Subtle Hairline) */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.08) 20%, rgba(255, 215, 0, 0.3) 50%, rgba(251, 191, 36, 0.08) 80%, transparent 100%)",
            opacity: isBeamActive ? 0.6 : 0.15,
          }}
        />

        {/* --- LUXURY DISPLAY TYPOGRAPHY: "SAMEER KHAN" --- */}
        <div
          className="relative flex items-center justify-center font-extrabold tracking-[-0.04em] text-5xl sm:text-7xl md:text-8xl lg:text-9xl z-20 select-none"
          style={{
            fontFamily:
              'var(--font-outfit), -apple-system, BlinkMacSystemFont, "Syne", "Cinzel", sans-serif',
          }}
        >
          {letters.map((char, index) => {
            if (char === "\u00A0") {
              return <span key={index} className="w-5 sm:w-10 md:w-14 inline-block" />;
            }

            // Normal distribution position along the center span
            const letterPos = 0.18 + (index / letters.length) * 0.64;
            const impactDelta = sliceT - letterPos;
            const isSliced = impactDelta > 0;

            // Ultra-smooth sigmoidal displacement wave (buttery physics)
            const liftFactor = isSliced
              ? Math.min(1, Math.max(0, impactDelta * 4.5))
              : 0;
            const splitY = liftFactor * 40; // px offset
            const splitRot = liftFactor * 4.0; // degrees

            return (
              <div key={index} className="relative inline-block leading-none mx-[2px] sm:mx-1">
                
                {/* TOP HALF OF GLYPH */}
                <div
                  style={{
                    transform: `translateY(-${splitY}px) rotate(-${splitRot}deg)`,
                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                    willChange: "transform",
                  }}
                >
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, #ffffff 0%, #fef08a 25%, #eab308 65%, #a16207 100%)",
                      filter: isSliced
                        ? "drop-shadow(0 0 25px rgba(255,215,0,0.85))"
                        : "drop-shadow(0 4px 15px rgba(0,0,0,0.8))",
                    }}
                  >
                    {char}
                  </span>
                </div>

                {/* BOTTOM HALF OF GLYPH */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `translateY(${splitY}px) rotate(${splitRot}deg)`,
                    clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                    willChange: "transform",
                  }}
                >
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, #ca8a04 0%, #eab308 35%, #fef08a 75%, #713f12 100%)",
                      filter: isSliced
                        ? "drop-shadow(0 0 25px rgba(255,215,0,0.85))"
                        : "drop-shadow(0 4px 15px rgba(0,0,0,0.8))",
                    }}
                  >
                    {char}
                  </span>
                </div>

                {/* Delicate Hairline Cut Seam */}
                {isSliced && (
                  <div
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] rounded-full pointer-events-none z-30 bg-[#ffd700]"
                    style={{
                      boxShadow: "0 0 8px #ffd700, 0 0 16px #f59e0b",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* --- TINY GLOWING LIGHT PARTICLE (PHOTON SPARK) --- */}
        {isBeamActive && (
          <div
            className="absolute top-1/2 -translate-y-1/2 z-40 pointer-events-none flex items-center"
            style={{
              left: `${cuttingHeadXPercent}vw`,
              willChange: "left",
            }}
          >
            {/* Ultra-Delicate Whisper Tail (fades out smoothly) */}
            <div
              className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-[#ffffff] via-[#ffd700] to-transparent rounded-full opacity-75"
              style={{ boxShadow: "0 0 8px #ffd700" }}
            />

            {/* The Tiny Concentrated Light Particle */}
            <div className="relative flex items-center justify-center -ml-0.5">
              {/* Core Light Speck */}
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"
                style={{
                  boxShadow: "0 0 4px #ffffff, 0 0 10px #ffd700, 0 0 20px #f59e0b",
                }}
              />
              {/* Delicate Micro Aura */}
              <div
                className="absolute w-4 h-4 rounded-full bg-amber-400/20 blur-[2px]"
              />
            </div>
          </div>
        )}

        {/* Phase 3 Reveal: Title & RCS Tec Credentials */}
        <div
          className="absolute bottom-24 sm:bottom-28 text-center px-4 z-20 transition-all duration-700 max-w-xl"
          style={{
            opacity: smoothProgress >= 0.7 ? 1 : 0,
            transform: `translateY(${smoothProgress >= 0.7 ? 0 : 20}px)`,
          }}
        >
          <div className="text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
            ● Incision Complete &bull; Architect Revealed
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Sameer Khan
          </h3>
          <p className="text-xs sm:text-sm font-mono text-neutral-300">
            Full Stack Developer &bull; RCS Tec &bull; Spring Boot &bull; React &bull; Microservices
          </p>
          <div className="mt-4 flex items-center justify-center gap-1 text-xs text-amber-400 animate-bounce">
            <span>Scroll down for Black &amp; Golden Portfolio Systems</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* --- Minimalist Luxury Golden Control Dock --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border border-amber-500/30 bg-black/85 backdrop-blur-2xl shadow-[0_0_30px_rgba(245,158,11,0.25)]">
          <button
            onClick={fireBeam}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isPlaying ? "Slicing..." : "⚡ Trigger Slice"}</span>
          </button>

          <button
            onClick={() => {
              setManualProgress(0);
              smoothProgressRef.current = 0;
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-full text-neutral-400 hover:text-amber-400 transition-colors"
            title="Reset to start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* Scrubber slider */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-400">Slice:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(smoothProgress * 100)}
              onChange={(e) => {
                setIsPlaying(false);
                setManualProgress(Number(e.target.value) / 100);
              }}
              className="w-24 accent-amber-400 cursor-pointer"
            />
            <span className="text-[11px] font-mono text-amber-300 w-8">
              {Math.round(smoothProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
