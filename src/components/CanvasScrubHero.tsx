"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  MousePointer,
  MoveRight,
  Sliders,
  RotateCcw,
  ArrowRight
} from "lucide-react";

const TOTAL_FRAMES = 192;

function getFrameOpacity(frame: number, start: number, fadeIn: number, fadeOut: number, end: number): number {
  if (frame < start || frame > end) return 0;
  if (frame < fadeIn) return (frame - start) / Math.max(fadeIn - start, 1);
  if (frame > fadeOut) return 1 - (frame - fadeOut) / Math.max(end - fadeOut, 1);
  return 1;
}

export default function CanvasScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preloader State
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scrubbing & Animation State
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDisplayRef = useRef(-1);

  const [activeFrameDisplay, setActiveFrameDisplay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;

  // Interaction Mode: 'scroll' | 'cursor'
  const [scrubMode, setScrubMode] = useState<"scroll" | "cursor">("scroll");
  const scrubModeRef = useRef<"scroll" | "cursor">("scroll");
  scrubModeRef.current = scrubMode;

  // ── 1. Canvas Rendering (Object-Fit Cover with Fallback) ───────────────────
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Direct frame lookup with instant nearest-neighbor fallback
    let img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find the nearest loaded frame in either direction so canvas NEVER freezes
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = images[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = images[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Use scaled canvas pixel dimensions for Retina full-density clarity
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Object-fit: cover calculation
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const x = (canvasWidth - drawWidth) / 2;
    const y = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    // Subtle cinematic vignette
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      Math.min(canvasWidth, canvasHeight) * 0.4,
      canvasWidth / 2,
      canvasHeight / 2,
      Math.max(canvasWidth, canvasHeight) * 0.75
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }, []);

  // ── 2. Fail-Safe Image Preloader ──────────────────────────────────────────
  useEffect(() => {
    let isCancelled = false;
    const loadedIndices = new Set<number>();
    const images: HTMLImageElement[] = [];

    const handleLoaded = (index: number) => {
      if (isCancelled || loadedIndices.has(index)) return;
      loadedIndices.add(index);
      const count = loadedIndices.size;
      setLoadedCount(count);

      // Render the very first frame immediately
      if (index === 0 || count === 1) {
        drawFrame(0);
      }

      // Unlock progressively: as soon as 60 frames or all frames are ready
      if (count >= TOTAL_FRAMES || count >= 60) {
        setIsLoaded(true);
      }
    };

    // Failsafe auto-unlock: user is NEVER blocked beyond 1.5 seconds
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    }, 1500);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = i - 1;

      img.onload = () => handleLoaded(frameIndex);
      img.onerror = () => handleLoaded(frameIndex); // Never stall on errors

      const frameNum = String(i).padStart(4, "0");
      img.src = `/frames/frame_${frameNum}.jpg`;

      if (img.complete && img.naturalWidth > 0) {
        handleLoaded(frameIndex);
      }

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [drawFrame]);

  // ── 3. Resize Canvas with HiDPI / Retina DPR ──────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // ── 4. Scrubbing via Scroll & Cursor ───────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current || !containerRef.current) return;
      if (scrubModeRef.current !== "scroll") return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentY = -rect.top;
      const progress = Math.min(Math.max(currentY / totalScrollable, 0), 1);
      targetFrameRef.current = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Horizontal Cursor Scrubbing
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPlayingRef.current) return;
    if (scrubModeRef.current !== "cursor") return;

    const xRatio = e.clientX / window.innerWidth;
    targetFrameRef.current = Math.min(Math.floor(xRatio * TOTAL_FRAMES), TOTAL_FRAMES - 1);
  };

  // Direct HUD Scrub Bar Click / Drag
  const handleScrubBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    targetFrameRef.current = Math.min(Math.floor(ratio * TOTAL_FRAMES), TOTAL_FRAMES - 1);
  };

  // ── 5. Linear Interpolation (LERP) rAF Loop ───────────────────────────────
  useEffect(() => {
    let animId: number;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      if (isPlayingRef.current) {
        targetFrameRef.current = (targetFrameRef.current + 0.5) % TOTAL_FRAMES;
      }

      // Smooth LERP momentum
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.12;

      const targetIdx = Math.min(Math.max(Math.round(currentFrameRef.current), 0), TOTAL_FRAMES - 1);

      drawFrame(targetIdx);

      // Only trigger React state update if frame actually changed to prevent high CPU / thrashing
      if (targetIdx !== lastDisplayRef.current) {
        lastDisplayRef.current = targetIdx;
        setActiveFrameDisplay(targetIdx);
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  const scrollToNextSection = () => {
    const el = document.getElementById("projects-matrix");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 3.3, behavior: "smooth" });
    }
  };

  const progressPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative h-[320vh] bg-[#0c0d12] text-white select-none"
    >
      {/* ── Preloader Overlay ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="workspace-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#090a0f] px-6 text-center"
          >
            {/* Ambient Warm Desk Lamp Glow */}
            <div className="absolute w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

            {/* Glowing Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-white/10 to-cyan-500/20 border border-white/15 flex items-center justify-center mb-8 backdrop-blur-xl shadow-2xl"
            >
              <span className="text-xl font-black tracking-tighter text-amber-300">SK</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
              Preparing Workspace Experience
            </h2>
            <p className="text-xs sm:text-sm font-mono text-amber-200/70 mb-8 tracking-widest uppercase">
              Caching 192 Hi-Res 3D Scrub Frames
            </p>

            {/* Glowing Progress Bar */}
            <div className="w-full max-w-md h-2 rounded-full bg-white/10 overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.8)] transition-all duration-150"
                style={{ width: `${Math.max(progressPercent, 12)}%` }}
              />
            </div>

            {/* Percentage & Frame Counter */}
            <div className="flex items-center justify-between w-full max-w-md text-xs font-mono text-neutral-400 mb-6">
              <span>LOADING WORKSPACE</span>
              <span className="text-amber-400 font-bold">{progressPercent}%</span>
            </div>

            {/* Instant Skip / Enter Button so user is never stalled */}
            <button
              onClick={() => setIsLoaded(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono text-amber-300 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <span>Enter Workspace Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky Pinned Hero Viewport ───────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Fullscreen Canvas Rendering Active Frame with Contrast-Aware CSS Sharpening */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
        />

        {/* ── Minimalist Glassmorphism Top Navbar ─────────────────────────────── */}
        <header className="relative z-30 w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/15 backdrop-blur-xl flex items-center justify-center font-bold text-sm text-amber-300 shadow-lg">
              SK
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
                Sameer Khan
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Full Stack Developer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-mono text-neutral-300 hover:text-white"
            >
              <span>← Return to Normal Portfolio</span>
            </a>

            <a
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
            >
              <span>Exit 3D</span>
            </a>
          </div>
        </header>

        {/* ── Dynamic Hero Project & Humor Overlays (Driven by Active Frame) ── */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-8 pointer-events-none">
          {/* Act 1 (Frames 0 - 40): The Aesthetic Creative Setup */}
          {(() => {
            const op = getFrameOpacity(activeFrameDisplay, 0, 0, 32, 42);
            if (op <= 0) return null;
            return (
              <div
                className="text-center max-w-4xl transition-opacity duration-300 absolute"
                style={{
                  opacity: op,
                  transform: `translateY(${activeFrameDisplay * 0.4}px) scale(${1 - activeFrameDisplay * 0.001})`,
                }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/25 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>CRAFTING HIGH-THROUGHPUT SYSTEMS</span>
                </div>

                <h1 className="text-4xl sm:text-7xl md:text-8xl font-light tracking-[-0.04em] text-white leading-[0.98] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                  Where Code Meets <br />
                  <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-amber-400 font-normal">
                    Craftsmanship.
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-lg text-neutral-300 font-light max-w-xl mx-auto leading-relaxed drop-shadow-md">
                  Sameer Khan &bull; Full Stack Architect building distributed backends, real-time WebSockets, and fluid digital interfaces.
                </p>

                {/* Humorous Dev Badge */}
                <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-white/10 text-xs font-mono text-neutral-400 backdrop-blur-md">
                  <span className="text-amber-400 font-bold">PRO-TIP:</span>
                  <span>Decreased server response times 20% simply by deleting console.log</span>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-amber-300 animate-bounce">
                  <ChevronDown className="w-4 h-4" />
                  <span>SCROLL DOWN TO FLY THROUGH WORKSPACE</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            );
          })()}

          {/* Act 2 (Frames 40 - 85): Project 1 — Amagi Payment System & WebSockets */}
          {(() => {
            const op = getFrameOpacity(activeFrameDisplay, 38, 48, 76, 86);
            if (op <= 0) return null;
            return (
              <div
                className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 transition-opacity duration-300 absolute px-4"
                style={{
                  opacity: op,
                  transform: `translateY(${(activeFrameDisplay - 62) * 0.35}px)`,
                }}
              >
                {/* Left Floating Glass Project Card */}
                <div className="w-full md:max-w-md p-6 rounded-3xl bg-black/60 border border-amber-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)] pointer-events-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      PROJECT 01 &bull; FINTECH &amp; WEBSOCKETS
                    </span>
                    <span className="text-xs font-mono text-neutral-400">Oct 2025 – Present</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                    Amagi Payment System
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    High-security payment processing platform with sub-second settlement pipelines, live WebSocket communication, and real-time fraud monitoring.
                  </p>

                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-4 text-xs font-mono text-amber-200/90">
                    <span className="text-amber-400 font-bold">&gt; Architecture:</span> Atomic ledger transactions &bull; zero race conditions allowed.
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["Spring Boot", "React.js", "WebSockets", "Redis", "MySQL"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Floating Witty Metric Badge */}
                <div className="hidden md:flex flex-col items-end gap-3 text-right">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl max-w-xs shadow-2xl">
                    <span className="text-3xl font-black text-amber-400 block font-mono">
                      &lt; 85ms
                    </span>
                    <span className="text-xs font-semibold text-white block mt-1">
                      WebSocket Event Latency
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                      &quot;Where money moves fast and timeouts are not invited.&quot;
                    </span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active In Production Ledger</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Act 3 (Frames 85 - 132): Project 2 — NT Nation Trust Bank & Coach Konnects */}
          {(() => {
            const op = getFrameOpacity(activeFrameDisplay, 83, 94, 122, 133);
            if (op <= 0) return null;
            return (
              <div
                className="w-full max-w-6xl flex flex-col md:flex-row-reverse items-center justify-between gap-6 transition-opacity duration-300 absolute px-4"
                style={{
                  opacity: op,
                  transform: `translateY(${(activeFrameDisplay - 108) * 0.35}px)`,
                }}
              >
                {/* Right Floating Glass Project Card */}
                <div className="w-full md:max-w-md p-6 rounded-3xl bg-black/60 border border-orange-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(249,115,22,0.15)] pointer-events-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                      PROJECT 02 &bull; ENTERPRISE BANKING &amp; AUTH
                    </span>
                    <span className="text-xs font-mono text-neutral-400">Core Systems</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                    NT Nation Trust &amp; Konnects
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    Architected bank approval workflows with RBAC governance, plus WebAuthn biometrics for zero-password authentication in Coach Konnects.
                  </p>

                  <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/15 mb-4 text-xs font-mono text-orange-200/90">
                    <span className="text-orange-400 font-bold">&gt; Security Policy:</span> Even our bugs require two-factor authentication and manager sign-off.
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["Java", "Spring Boot", "Microservices", "Oracle DB", "WebAuthn"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Left Floating Witty Stat Badge */}
                <div className="hidden md:flex flex-col items-start gap-3 text-left">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl max-w-xs shadow-2xl">
                    <span className="text-3xl font-black text-orange-400 block font-mono">
                      100%
                    </span>
                    <span className="text-xs font-semibold text-white block mt-1">
                      StackOverflow Success Rate
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                      &quot;Maintained a perfect track record of finding solutions for obscure production crashes.&quot;
                    </span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] font-mono text-orange-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span>RBAC Multi-Level Approval Enabled</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Act 4 (Frames 133 - 170): Project 3 — DHL & Zomato Hyperpure Logistics */}
          {(() => {
            const op = getFrameOpacity(activeFrameDisplay, 130, 140, 162, 172);
            if (op <= 0) return null;
            return (
              <div
                className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 transition-opacity duration-300 absolute px-4"
                style={{
                  opacity: op,
                  transform: `translateY(${(activeFrameDisplay - 150) * 0.3}px)`,
                }}
              >
                {/* Left Floating Glass Project Card */}
                <div className="w-full md:max-w-md p-6 rounded-3xl bg-black/60 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] pointer-events-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      PROJECT 03 &bull; HIGH-THROUGHPUT LOGISTICS
                    </span>
                    <span className="text-xs font-mono text-neutral-400">Scale</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                    DHL &amp; Zomato Hyperpure
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    Engineered asset management &amp; B2B procurement modules. Dispatched drivers and handled multi-warehouse routes with high operational reliability.
                  </p>

                  <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 mb-4 text-xs font-mono text-cyan-200/90">
                    <span className="text-cyan-400 font-bold">&gt; Philosophy:</span> Moving freight and restaurant supply chains without dropping a single semicolon.
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["Spring Boot", "React", "Node.js", "MySQL", "Oracle DB"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Floating Witty Metric Badge */}
                <div className="hidden md:flex flex-col items-end gap-3 text-right">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl max-w-xs shadow-2xl">
                    <span className="text-3xl font-black text-cyan-400 block font-mono">
                      0 Lost
                    </span>
                    <span className="text-xs font-semibold text-white block mt-1">
                      Shipment Packets
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                      &quot;From database schema all the way to deployed pixel.&quot;
                    </span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Real-Time Fleet Sync</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Act 5 (Frames 170 - 192): Zoom into Laptop Screen (VS Code Finale) */}
          {(() => {
            const op = getFrameOpacity(activeFrameDisplay, 168, 178, 192, 192);
            if (op <= 0) return null;
            return (
              <div
                className="text-center max-w-3xl transition-opacity duration-300 absolute px-4"
                style={{
                  opacity: op,
                  transform: `translateY(${(activeFrameDisplay - 182) * 0.25}px)`,
                }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WORKSPACE CONSOLE ACTIVE</span>
                </div>

                <h2 className="text-3xl sm:text-6xl font-light tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] leading-tight">
                  Architecture Built <br />
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300">
                    to Scale Under Pressure.
                  </span>
                </h2>

                <p className="mt-3 text-xs sm:text-base text-neutral-300 max-w-lg mx-auto font-mono drop-shadow-md">
                  Spring Boot &bull; Distributed Microservices &bull; WebSockets &bull; High-Fidelity React
                </p>

                {/* Humorous Console Banner */}
                <div className="mt-4 p-2.5 rounded-xl bg-black/60 border border-white/10 max-w-md mx-auto text-[11px] font-mono text-neutral-400 backdrop-blur-xl">
                  <span className="text-amber-400">$ git status:</span> 0 uncommitted bugs &bull; Ready for production
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
                  <button
                    onClick={scrollToNextSection}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(245,158,11,0.4)] cursor-pointer"
                  >
                    <span>Explore Project Matrix Below</span>
                    <MoveRight className="w-4 h-4" />
                  </button>

                  <a
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono text-neutral-300 border border-white/10 bg-white/5 hover:bg-white/15 transition-all"
                  >
                    <span>← Return to Normal Portfolio</span>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── Bottom Interactive Control Bar (HUD) ─────────────────────────────── */}
        <footer className="relative z-30 w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Interactive Scrub Bar & Active Frame Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/55 border border-white/15 backdrop-blur-xl text-xs font-mono text-neutral-300 shadow-2xl">
            <span className="text-amber-400 font-semibold">FRAME</span>
            <span className="font-bold text-white min-w-[58px]">
              {String(activeFrameDisplay + 1).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>

            {/* Clickable Interactive Scrubber */}
            <div
              onClick={handleScrubBarClick}
              title="Click or drag anywhere on scrubber to jump frames"
              className="w-28 sm:w-44 h-2 rounded-full bg-white/20 overflow-hidden cursor-pointer relative group hover:h-2.5 transition-all"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400"
                style={{ width: `${((activeFrameDisplay + 1) / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>

          {/* Interactive Mode & Playback Controls */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/55 border border-white/15 backdrop-blur-xl text-xs font-medium text-neutral-300 shadow-2xl">
            {/* Auto Play / Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer font-mono"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? "Pause" : "Auto Play"}</span>
            </button>

            {/* Reset to Frame 0 */}
            <button
              onClick={() => {
                targetFrameRef.current = 0;
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Reset to Beginning"
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="text-white/20">|</span>

            {/* Scrub Mode Toggle: Scroll vs Cursor */}
            <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10">
              <button
                onClick={() => setScrubMode("scroll")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  scrubMode === "scroll"
                    ? "bg-amber-400 text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Scroll Mode
              </button>
              <button
                onClick={() => setScrubMode("cursor")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  scrubMode === "cursor"
                    ? "bg-cyan-400 text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Cursor Mode
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
