"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [subtitle, setSubtitle] = useState("!#X@...92");
  
  // Secret Easter Egg State
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [secretRevealed, setSecretRevealed] = useState(false);

  useEffect(() => {
    // Scramble decryption effect
    const finalSubtitle = "Initiating System...";
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let iterations = 0;
    
    const interval = setInterval(() => {
      setSubtitle(finalSubtitle.split("").map((char, index) => {
        if (index < iterations) return finalSubtitle[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iterations >= finalSubtitle.length) clearInterval(interval);
      iterations += 1/3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleNameClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 === 5) {
      alert("Congratulations. You have officially spent too much time on my portfolio.");
      setClickCount(0); // reset
    }
  };

  // Easter egg handlers
  const handleSecretPress = (e: React.PointerEvent) => {
    e.preventDefault(); // Prevent text selection on mobile
    const timer = setTimeout(() => {
      setSecretRevealed(true);
    }, 3000); // 3 seconds hold to reveal (5s is too long for OS touch cancellation)
    setPressTimer(timer);
  };

  const handleSecretRelease = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-secondary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[var(--color-primary)] font-mono tracking-widest text-sm md:text-base mb-4 uppercase h-6">
            {subtitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 
            className={`text-[12vw] sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white transition-transform active:scale-95 flex flex-row items-center justify-center flex-wrap sm:flex-nowrap ${clickCount > 3 ? 'animate-pulse text-red-500' : ''}`}
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
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                  >
                    EENAM <span className="animate-pulse">❤️</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="ameer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                    onClick={handleNameClick}
                    className="cursor-pointer select-none touch-none [-webkit-touch-callout:none] [-webkit-user-select:none]"
                  >
                    AMEER
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {!secretRevealed && (
              <span className="ml-2 sm:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] cursor-pointer select-none" onClick={handleNameClick}>
                KHAN
              </span>
            )}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-gray-400 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Full Stack Developer specializing in scalable web applications, real-time systems, and modern architecture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-6 relative"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-sm md:max-w-none mx-auto">
            <MagneticButton>
              <a href="#projects" className="w-full md:w-auto px-6 py-4 md:px-8 text-sm md:text-base bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-none hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 font-bold tracking-widest uppercase neon-border whitespace-nowrap text-center">
                Inspect my questionable decisions
              </a>
            </MagneticButton>
            
            <div className="flex flex-row gap-4 items-center w-full md:w-auto justify-center h-[56px]">
              <MagneticButton>
                <button 
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  className="flex-1 md:flex-none px-6 py-4 md:px-8 h-full bg-white text-black font-bold tracking-widest uppercase hover:bg-gray-200 transition-all duration-300 z-20 whitespace-nowrap"
                >
                  Contact Me {isContactOpen ? '▲' : '▼'}
                </button>
              </MagneticButton>

              <MagneticButton>
                <div className="relative group/download inline-block h-full">
                  <a 
                    href="/resume.pdf" 
                    download="Sameer_Khan_Resume.pdf"
                    className="flex items-center justify-center w-[56px] h-full bg-[#111] border border-gray-700 text-gray-300 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300 rounded-none z-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </a>
                  {/* Funny Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover/download:scale-100 transition-transform duration-200 bg-black/90 text-gray-300 text-[10px] font-mono px-3 py-2 rounded whitespace-nowrap border border-gray-600 pointer-events-none z-30 flex flex-col items-center">
                    <span>Download Resume</span>
                    <span className="text-[var(--color-accent)]">(100% Virus Free, probably)</span>
                  </div>
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Inline Flowchart Dropdown */}
          <AnimatePresence>
            {isContactOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col items-center overflow-hidden w-full"
              >
                {/* Vertical line down from Contact button */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "2rem" }}
                  exit={{ height: 0 }}
                  className="w-0.5 bg-[var(--color-primary)]"
                />
                
                {/* Horizontal branch */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "20rem" }}
                  exit={{ width: 0 }}
                  className="h-0.5 bg-[var(--color-primary)]"
                />

                {/* Branch Nodes */}
                <div className="flex w-full max-w-sm justify-between px-2 mt-4">
                  {/* Email Node */}
                  <motion.a
                    href="mailto:sameer6306khan@gmail.com"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring" }}
                    className="glass-panel p-4 rounded-xl border border-gray-700 hover:border-white transition-all flex flex-col items-center gap-2 w-36 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] group relative z-10"
                  >
                    <div className="absolute -top-4 w-0.5 h-4 bg-[var(--color-primary)]" />
                    <Mail className="w-6 h-6 text-gray-300 group-hover:text-white" />
                    <span className="font-mono text-xs tracking-wider text-white">EMAIL</span>
                  </motion.a>

                  {/* WhatsApp Node */}
                  <motion.a
                    href="https://wa.me/917985835954"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="glass-panel p-4 rounded-xl border border-green-900/50 hover:border-green-500 transition-all flex flex-col items-center gap-2 w-36 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,197,94,0.2)] group relative z-10 bg-black/40"
                  >
                    <div className="absolute -top-4 w-0.5 h-4 bg-[var(--color-primary)]" />
                    <MessageCircle className="w-6 h-6 text-green-500/70 group-hover:text-green-400" />
                    <span className="font-mono text-xs tracking-wider text-green-400">WHATSAPP</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Grid overlay for cyberpunk feel */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay" />
    </section>
  );
}
