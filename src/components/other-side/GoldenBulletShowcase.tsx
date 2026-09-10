"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, Zap, Play, RotateCcw } from "lucide-react";
import GalaxyStarfield from "./GalaxyStarfield";

interface GoldenBulletShowcaseProps {
  isDark: boolean;
}

export default function GoldenBulletShowcase({ isDark }: GoldenBulletShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualProgress, setManualProgress] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bulletSpark, setBulletSpark] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const letters = ["S", "A", "M", "E", "E", "R", "\u00A0", "K", "H", "A", "N"];

  // Scroll listener
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

  const progress = manualProgress !== null ? manualProgress : scrollProgress;

  // Auto-play / fire animation
  useEffect(() => {
    if (!isPlaying) return;
    let startTime: number | null = null;
    const duration = 2200; // ms

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

  // Bullet X Position calculation (-10vw to 110vw)
  // Bullet active between progress 0.15 and 0.75
  const bulletT = Math.min(Math.max((progress - 0.15) / 0.6, 0), 1);
  const bulletXPercent = -10 + bulletT * 120; // in vw
  const isBulletActive = progress >= 0.15 && progress <= 0.8;

  // Update spark coordinates for canvas
  useEffect(() => {
    if (isBulletActive && typeof window !== "undefined") {
      const screenX = (bulletXPercent / 100) * window.innerWidth;
      const screenY = window.innerHeight * 0.5;
      setBulletSpark({ x: screenX, y: screenY, active: true });
    } else {
      setBulletSpark((prev) => ({ ...prev, active: false }));
    }
  }, [bulletXPercent, isBulletActive]);

  const fireBullet = () => {
    setManualProgress(0);
    setIsPlaying(true);
  };

  return (
    <section ref={containerRef} className="relative h-[380vh]">
      {/* Dynamic Galaxy Background */}
      <GalaxyStarfield isDark={isDark} bulletSpark={bulletSpark} />

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none">
        
        {/* Golden Galactic Ambient Core */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full blur-[140px] pointer-events-none -z-10 transition-colors duration-700"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.04) 50%, transparent 70%)",
          }}
        />

        {/* Top Eyebrow Tag */}
        <div
          className="absolute top-16 sm:top-20 text-center z-20 transition-all duration-500"
          style={{ opacity: progress < 0.2 ? 1 : 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Black &amp; Golden Galaxy Edition</span>
          </div>
          <p className="text-xs font-mono text-neutral-400">
            {progress < 0.2
              ? "Scroll down to launch the golden projectile through the name"
              : "Kinetic piercing in progress"}
          </p>
        </div>

        {/* Target Laser Trajectory Line (Midline) */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.2) 20%, rgba(255, 215, 0, 0.6) 50%, rgba(251, 191, 36, 0.2) 80%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.2) 20%, rgba(180, 83, 9, 0.5) 50%, rgba(217, 119, 6, 0.2) 80%, transparent 100%)",
            opacity: isBulletActive ? 1 : 0.3,
            boxShadow: isBulletActive ? "0 0 12px rgba(255, 215, 0, 0.8)" : "none",
          }}
        />

        {/* --- MAIN GIANT NAME: "SAMEER KHAN" WITH SLICED HALVES --- */}
        <div className="relative flex items-center justify-center font-black tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-9xl z-20">
          {letters.map((char, index) => {
            if (char === "\u00A0") {
              return <span key={index} className="w-4 sm:w-8 md:w-12 inline-block" />;
            }

            // Calculate letter position relative to screen (normalized 0 to 1)
            const letterPos = 0.25 + (index / letters.length) * 0.5; // letter spread in center 50%
            const isImpacted = bulletT > letterPos;
            const impactDistance = bulletT - letterPos;

            // Split offset calculation based on impact
            const splitAmount = isImpacted ? Math.min(impactDistance * 80, 48) : 0;
            const splitRotate = isImpacted ? Math.min(impactDistance * 20, 7) : 0;

            return (
              <div key={index} className="relative inline-block leading-none mx-[1px] sm:mx-1">
                
                {/* TOP HALF OF LETTER */}
                <div
                  className="transition-transform duration-75"
                  style={{
                    transform: `translateY(-${splitAmount}px) rotate(-${splitRotate}deg)`,
                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                  }}
                >
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage: isDark
                        ? "linear-gradient(180deg, #fff7ed 0%, #fde047 30%, #eab308 70%, #854d0e 100%)"
                        : "linear-gradient(180deg, #78350f 0%, #b45309 40%, #d97706 70%, #92400e 100%)",
                      filter: isImpacted
                        ? "drop-shadow(0 0 20px rgba(255,215,0,0.8))"
                        : "drop-shadow(0 4px 15px rgba(0,0,0,0.5))",
                    }}
                  >
                    {char}
                  </span>
                </div>

                {/* BOTTOM HALF OF LETTER */}
                <div
                  className="absolute inset-0 transition-transform duration-75"
                  style={{
                    transform: `translateY(${splitAmount}px) rotate(${splitRotate}deg)`,
                    clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                  }}
                >
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage: isDark
                        ? "linear-gradient(180deg, #ca8a04 0%, #eab308 30%, #fde047 70%, #713f12 100%)"
                        : "linear-gradient(180deg, #92400e 0%, #d97706 40%, #b45309 70%, #78350f 100%)",
                      filter: isImpacted
                        ? "drop-shadow(0 0 20px rgba(255,215,0,0.8))"
                        : "drop-shadow(0 4px 15px rgba(0,0,0,0.5))",
                    }}
                  >
                    {char}
                  </span>
                </div>

                {/* Molten Glow Cut Seam between halves when impacted */}
                {isImpacted && (
                  <div
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#ffd700] rounded-full pointer-events-none z-30"
                    style={{
                      boxShadow: "0 0 10px #ffd700, 0 0 20px #f59e0b",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* --- THE GOLDEN BULLET PROJECTILE --- */}
        {isBulletActive && (
          <div
            className="absolute top-1/2 -translate-y-1/2 z-40 pointer-events-none"
            style={{
              left: `${bulletXPercent}vw`,
              transition: "left 0.05s linear",
            }}
          >
            {/* Supersonic Shockwave Cone trailing behind */}
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-16 sm:h-24 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.15) 60%, rgba(255, 237, 213, 0.5) 100%)",
                clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 55%)",
                filter: "blur(2px)",
              }}
            />

            {/* Glowing Laser Tracer Tail */}
            <div
              className="absolute right-6 top-1/2 -translate-y-1/2 w-32 sm:w-48 h-1 bg-gradient-to-l from-[#ffffff] via-[#ffd700] to-transparent rounded-full"
              style={{ boxShadow: "0 0 15px #ffd700, 0 0 30px #f59e0b" }}
            />

            {/* The Solid Golden Bullet Mesh */}
            <div className="relative w-10 sm:w-14 h-4 sm:h-5 flex items-center">
              {/* Bullet Tip (Aerodynamic ogive curve) */}
              <div
                className="absolute right-0 w-5 sm:w-7 h-full bg-gradient-to-r from-[#fef08a] to-[#ffffff] rounded-r-full shadow-[0_0_25px_#ffd700]"
                style={{
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                }}
              />
              {/* Bullet Body (Brass Gold cylinder) */}
              <div
                className="w-7 sm:w-10 h-full rounded-l-sm bg-gradient-to-b from-[#fde047] via-[#ca8a04] to-[#713f12] border-t border-[#fef08a]"
                style={{
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.8), inset 0 1px 2px #fff",
                }}
              />
              {/* Bullet Tip Intense Spark Glow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] shadow-[0_0_20px_#ffffff,0_0_40px_#ffd700]" />
            </div>
          </div>
        )}

        {/* Phase 3 Reveal: Title and RCS Tec Credentials (after piercing) */}
        <div
          className="absolute bottom-24 sm:bottom-28 text-center px-4 z-20 transition-all duration-700 max-w-xl"
          style={{
            opacity: progress >= 0.7 ? 1 : 0,
            transform: `translateY(${progress >= 0.7 ? 0 : 20}px)`,
          }}
        >
          <div className="text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
            ● Projectile Pierce Complete
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

        {/* --- Interactive Golden Control Dock (Bottom Center) --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border border-amber-500/30 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <button
            onClick={fireBullet}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)] disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isPlaying ? "Firing..." : "⚡ Fire Bullet"}</span>
          </button>

          <button
            onClick={() => {
              setManualProgress(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-full text-neutral-400 hover:text-amber-400 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* Scrubber slider */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-400">Piercing:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(progress * 100)}
              onChange={(e) => {
                setIsPlaying(false);
                setManualProgress(Number(e.target.value) / 100);
              }}
              className="w-24 accent-amber-400 cursor-pointer"
            />
            <span className="text-[11px] font-mono text-amber-300 w-8">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
