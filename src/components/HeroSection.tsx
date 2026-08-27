"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import CodeSnippet from "./CodeSnippet";

export default function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [subtitle, setSubtitle] = useState("!#X@...92");

  // Secret Easter Egg State
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [secretRevealed, setSecretRevealed] = useState(false);

  useEffect(() => {
    const finalSubtitle = "Initiating System...";
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let iterations = 0;
    const interval = setInterval(() => {
      setSubtitle(
        finalSubtitle.split("").map((char, index) => {
          if (index < iterations) return finalSubtitle[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iterations >= finalSubtitle.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleNameClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 === 5) {
      alert("Congratulations. You have officially spent too much time on my portfolio.");
      setClickCount(0);
    }
  };

  const handleSecretPress = (e: React.PointerEvent) => {
    e.preventDefault();
    const timer = setTimeout(() => setSecretRevealed(true), 3000);
    setPressTimer(timer);
  };

  const handleSecretRelease = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)] bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.05)_0%,_transparent_60%)]">
      {/* Floating neumorphic orbs */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full pointer-events-none"
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full pointer-events-none"
        animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Scramble subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[var(--color-primary)] font-mono tracking-[0.3em] text-xs md:text-sm mb-6 uppercase h-6">
            {subtitle}
          </p>
        </motion.div>

        {/* Name with Easter Egg */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1
            className={`text-[14vw] sm:text-7xl md:text-9xl font-black mb-8 tracking-tighter transition-all duration-300 flex flex-row items-center justify-center flex-wrap sm:flex-nowrap ${
              clickCount > 3 ? "animate-pulse text-[var(--color-secondary)]" : "text-[var(--color-foreground)]"
            }`}
          >
            <div className="flex flex-row items-center whitespace-nowrap">
              <span
                onPointerDown={handleSecretPress}
                onPointerUp={handleSecretRelease}
                onPointerLeave={handleSecretRelease}
                onPointerCancel={handleSecretRelease}
                onContextMenu={(e) => e.preventDefault()}
                className="cursor-pointer select-none touch-none [-webkit-touch-callout:none] [-webkit-user-select:none]"
              >
                S
              </span>
              <AnimatePresence mode="wait">
                {secretRevealed ? (
                  <motion.span
                    key="seenam"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-pink-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]"
                  >
                    EENAM <span className="animate-pulse">❤️</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="ameer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                    transition={{ duration: 0.3 }}
                    onClick={handleNameClick}
                    className="cursor-pointer select-none touch-none"
                  >
                    AMEER
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {!secretRevealed && (
              <span
                onClick={handleNameClick}
                className="ml-3 sm:ml-5 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] cursor-pointer select-none bg-[length:200%] animate-[shimmer_3s_linear_infinite]"
              >
                KHAN
              </span>
            )}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-[var(--color-muted)] mb-12 font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
        >
          Full Stack Developer · Scalable Systems · Real-time Architecture
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="neu-btn px-8 py-4 rounded-2xl text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.18)] transition-all duration-300 w-full md:w-auto text-center"
          >
            Inspect my questionable decisions
          </a>

          <div className="flex gap-4 items-center">
            {/* Contact Toggle */}
            <button
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="neu-btn px-8 py-4 rounded-2xl text-[var(--color-foreground)] font-bold tracking-widest uppercase text-sm hover:text-[var(--color-primary)] transition-all duration-300 whitespace-nowrap"
            >
              Contact Me {isContactOpen ? "▲" : "▼"}
            </button>

            {/* Resume Download */}
            <div className="relative group/download">
              <a
                href="/resume.pdf"
                download="Sameer_Khan_Resume.pdf"
                className="neu-btn flex items-center justify-center w-14 h-14 rounded-2xl text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(37,99,235,0.2)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
              </a>
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 scale-0 group-hover/download:scale-100 transition-transform duration-200 neu-raised text-[10px] font-mono px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none z-30 flex flex-col items-center">
                <span className="text-[var(--color-foreground)]">Download Resume</span>
                <span className="text-[var(--color-accent)]">(100% Virus Free, probably)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Flowchart */}
        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center overflow-hidden mt-6"
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "2rem" }}
                exit={{ height: 0 }}
                className="w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-transparent"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "16rem" }}
                exit={{ width: 0 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
              />
              <div className="flex w-full max-w-xs justify-between px-2 mt-4 gap-4">
                <motion.a
                  href="mailto:sameer6306khan@gmail.com"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring" }}
                  className="neu-raised flex-1 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 hover:shadow-[0_0_18px_rgba(37,99,235,0.15)] group relative"
                >
                  <div className="absolute -top-4 w-0.5 h-4 bg-[var(--color-primary)]" />
                  <Mail className="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                  <span className="font-mono text-xs tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors">EMAIL</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/917985835954"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="neu-raised flex-1 p-4 rounded-2xl flex flex-col items-center gap-2 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)] transition-all duration-300 group relative"
                >
                  <div className="absolute -top-4 w-0.5 h-4 bg-[var(--color-primary)]" />
                  <MessageCircle className="w-5 h-5 text-green-500/60 group-hover:text-green-400 transition-colors" />
                  <span className="font-mono text-xs tracking-wider text-green-600 group-hover:text-green-400 transition-colors">WHATSAPP</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Code Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 w-full"
        >
          <CodeSnippet />
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
