"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  MoveRight,
  RotateCcw,
  ArrowRight
} from "lucide-react";

const TOTAL_FRAMES = 192;

export default function CanvasScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Direct DOM Refs for 0-overhead HUD updates (no React re-renders while scrubbing)
  const frameNumRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);

  // Preloader State
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scrubbing & Animation State
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // Active Act Stage (1 to 5) — Only triggers React render when Act transitions
  const [activeAct, setActiveAct] = useState(1);
  const activeActRef = useRef(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;

  // Interaction Mode: 'scroll' | 'cursor'
  const [scrubMode, setScrubMode] = useState<"scroll" | "cursor">("scroll");
  const scrubModeRef = useRef<"scroll" | "cursor">("scroll");
  scrubModeRef.current = scrubMode;

  // ── 1. High-Performance Canvas Rendering (Zero CPU gradient, Native Blit) ─
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Nearest-neighbor fallback for missing/loading frames
    let img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 16; offset++) {
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

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Object-fit cover
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const x = (canvasWidth - drawWidth) * 0.5;
    const y = (canvasHeight - drawHeight) * 0.5;

    // Clean direct GPU blit (Vignette is handled in hardware via CSS)
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
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

      if (index === 0 || count === 1) {
        drawFrame(0);
      }

      // Unlock progressively as soon as 45 frames are cached
      if (count >= TOTAL_FRAMES || count >= 45) {
        setIsLoaded(true);
      }
    };

    // Auto-unlock after 1.2s failsafe
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    }, 1200);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = i - 1;

      img.onload = () => handleLoaded(frameIndex);
      img.onerror = () => handleLoaded(frameIndex);

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

  // ── 3. Resize Canvas (1:1 Resolution to Match 1080p source with 0 Lag) ────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Native resolution eliminates 4x pixel overhead on Retina
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
    }

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });
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

  // Cursor Scrubbing
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

  // ── 5. Linear Interpolation (LERP) rAF Loop (Zero React Renders) ──────────
  useEffect(() => {
    let animId: number;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      if (isPlayingRef.current) {
        targetFrameRef.current = (targetFrameRef.current + 0.6) % TOTAL_FRAMES;
      }

      // Responsive momentum
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) < 0.04) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * 0.18;
      }

      const targetIdx = Math.min(Math.max(Math.round(currentFrameRef.current), 0), TOTAL_FRAMES - 1);

      // Only blit if frame changed
      if (targetIdx !== lastDrawnFrameRef.current) {
        lastDrawnFrameRef.current = targetIdx;
        drawFrame(targetIdx);

        // Update HUD directly on DOM (0 React re-renders!)
        if (frameNumRef.current) {
          frameNumRef.current.textContent = `${String(targetIdx + 1).padStart(3, "0")} / ${TOTAL_FRAMES}`;
        }
        if (hudBarRef.current) {
          hudBarRef.current.style.width = `${((targetIdx + 1) / TOTAL_FRAMES) * 100}%`;
        }

        // Determine Active Act (Only re-renders component 5 times total)
        let nextAct = 1;
        if (targetIdx >= 168) nextAct = 5;
        else if (targetIdx >= 128) nextAct = 4;
        else if (targetIdx >= 82) nextAct = 3;
        else if (targetIdx >= 38) nextAct = 2;

        if (nextAct !== activeActRef.current) {
          activeActRef.current = nextAct;
          setActiveAct(nextAct);
        }
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
    const el = document.getElementById("exit-3d");
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#090a0f] px-6 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 shadow-xl">
              <span className="text-xl font-black tracking-tighter text-amber-300">SK</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
              Preparing 3D Workspace
            </h2>
            <p className="text-xs font-mono text-amber-200/70 mb-6 tracking-widest uppercase">
              Caching High-Performance Frames
            </p>

            <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden relative mb-4">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full transition-all duration-150"
                style={{ width: `${Math.max(progressPercent, 15)}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-full max-w-xs text-xs font-mono text-neutral-400 mb-6">
              <span>INITIALIZING</span>
              <span className="text-amber-400 font-bold">{progressPercent}%</span>
            </div>

            <button
              onClick={() => setIsLoaded(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-amber-300 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <span>Enter Immediately</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky Pinned Hero Viewport ───────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Fullscreen Canvas Rendering Active Frame */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        />

        {/* Hardware-Accelerated CSS Vignette (Zero CPU Draw Call) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)] z-10" />

        {/* ── Minimalist Top Navbar ───────────────────────────────────────────── */}
        <header className="relative z-30 w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center font-bold text-sm text-amber-300 shadow-lg">
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
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/60 hover:bg-black/80 transition-all text-xs font-mono text-neutral-300 hover:text-white"
            >
              <span>← Main Portfolio</span>
            </a>

            <a
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
            >
              <span>Exit 3D</span>
            </a>
          </div>
        </header>

        {/* ── Dynamic Hero Project & Humor Overlays (Only re-renders on Act Change) ── */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-8 pointer-events-none">
          {/* Act 1 (Frames 0 - 38): The Aesthetic Creative Setup */}
          {activeAct === 1 && (
            <div className="text-center max-w-4xl transition-all duration-500 absolute">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/25 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
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

              <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-white/15 text-xs font-mono text-neutral-300">
                <span className="text-amber-400 font-bold">PRO-TIP:</span>
                <span>Decreased server response times 20% simply by deleting console.log</span>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-amber-300 animate-bounce">
                <ChevronDown className="w-4 h-4" />
                <span>SCROLL DOWN TO FLY THROUGH WORKSPACE</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Act 2 (Frames 39 - 82): Project 1 — Amagi Payment System & WebSockets */}
          {activeAct === 2 && (
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 absolute px-4">
              {/* Left Project Card */}
              <div className="w-full md:max-w-md p-6 rounded-3xl bg-[#0c0d14]/92 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
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

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4 text-xs font-mono text-amber-200">
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

              {/* Right Witty Metric Badge */}
              <div className="hidden md:flex flex-col items-end gap-3 text-right">
                <div className="p-5 rounded-2xl bg-[#0c0d14]/92 border border-white/10 max-w-xs shadow-2xl">
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
          )}

          {/* Act 3 (Frames 83 - 128): Project 2 — NT Nation Trust Bank & Coach Konnects */}
          {activeAct === 3 && (
            <div className="w-full max-w-6xl flex flex-col md:flex-row-reverse items-center justify-between gap-6 transition-all duration-500 absolute px-4">
              {/* Right Project Card */}
              <div className="w-full md:max-w-md p-6 rounded-3xl bg-[#0c0d14]/92 border border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
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

                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4 text-xs font-mono text-orange-200">
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

              {/* Left Witty Stat Badge */}
              <div className="hidden md:flex flex-col items-start gap-3 text-left">
                <div className="p-5 rounded-2xl bg-[#0c0d14]/92 border border-white/10 max-w-xs shadow-2xl">
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
          )}

          {/* Act 4 (Frames 129 - 168): Project 3 — DHL & Zomato Hyperpure Logistics */}
          {activeAct === 4 && (
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 absolute px-4">
              {/* Left Project Card */}
              <div className="w-full md:max-w-md p-6 rounded-3xl bg-[#0c0d14]/92 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
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

                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4 text-xs font-mono text-cyan-200">
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

              {/* Right Witty Metric Badge */}
              <div className="hidden md:flex flex-col items-end gap-3 text-right">
                <div className="p-5 rounded-2xl bg-[#0c0d14]/92 border border-white/10 max-w-xs shadow-2xl">
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
          )}

          {/* Act 5 (Frames 169 - 191): Zoom into Laptop Screen (VS Code Finale) */}
          {activeAct === 5 && (
            <div className="text-center max-w-3xl transition-all duration-500 absolute px-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
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

              <div className="mt-4 p-2.5 rounded-xl bg-black/70 border border-white/10 max-w-md mx-auto text-[11px] font-mono text-neutral-400">
                <span className="text-amber-400">$ git status:</span> 0 uncommitted bugs &bull; Ready for production
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
                <button
                  onClick={scrollToNextSection}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(245,158,11,0.4)] cursor-pointer"
                >
                  <span>Scroll to Exit 3D</span>
                  <MoveRight className="w-4 h-4" />
                </button>

                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono text-neutral-300 border border-white/15 bg-black/60 hover:bg-black/80 transition-all"
                >
                  <span>← Main Portfolio</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom Interactive Control Bar (HUD) ─────────────────────────────── */}
        <footer className="relative z-30 w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Interactive Scrub Bar & Active Frame Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 border border-white/15 text-xs font-mono text-neutral-300 shadow-2xl">
            <span className="text-amber-400 font-semibold">FRAME</span>
            <span ref={frameNumRef} className="font-bold text-white min-w-[58px]">
              001 / {TOTAL_FRAMES}
            </span>

            {/* Clickable Scrubber */}
            <div
              onClick={handleScrubBarClick}
              title="Click or drag anywhere on scrubber to jump frames"
              className="w-28 sm:w-44 h-2 rounded-full bg-white/20 overflow-hidden cursor-pointer relative group hover:h-2.5 transition-all"
            >
              <div
                ref={hudBarRef}
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 transition-all duration-75"
                style={{ width: "1%" }}
              />
            </div>
          </div>

          {/* Interactive Mode & Playback Controls */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 border border-white/15 text-xs font-medium text-neutral-300 shadow-2xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer font-mono"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? "Pause" : "Auto Play"}</span>
            </button>

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

            {/* Scrub Mode Toggle */}
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
