"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CODE_LINES = [
  { text: "const sameer = {",             color: "text-slate-700" },
  { text: '  name: "Sameer Khan",',       color: "text-emerald-600" },
  { text: '  role: "Full Stack Dev",',    color: "text-emerald-600" },
  { text: "  stack: [",                   color: "text-slate-600" },
  { text: '    "Spring Boot",',           color: "text-blue-500" },
  { text: '    "React",',                 color: "text-blue-500" },
  { text: '    "Node.js",',               color: "text-blue-500" },
  { text: '    "PostgreSQL",',            color: "text-blue-500" },
  { text: "  ],",                         color: "text-slate-600" },
  { text: "  available: true, // 👈",    color: "text-violet-500" },
  { text: "  coffee: Infinity,",          color: "text-amber-500" },
  { text: "  bugs: 0, // allegedly",      color: "text-slate-400" },
  { text: "};",                           color: "text-slate-700" },
];

export default function CodeSnippet() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCounts, setCharCounts] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  // Type each line one by one
  useEffect(() => {
    if (!started) return;
    if (visibleLines >= CODE_LINES.length) return;

    const line = CODE_LINES[visibleLines];
    const totalChars = line.text.length;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      charIndex++;
      setCharCounts((prev) => {
        const next = [...prev];
        next[visibleLines] = charIndex;
        return next;
      });
      if (charIndex >= totalChars) {
        clearInterval(typeInterval);
        setTimeout(() => setVisibleLines((v) => v + 1), 80);
      }
    }, 22);

    return () => clearInterval(typeInterval);
  }, [started, visibleLines]);

  const allDone = visibleLines >= CODE_LINES.length;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: "8px 8px 20px rgba(0,0,0,0.1), -4px -4px 12px rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/5"
          style={{ background: "#f1f5f9" }}
        >
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[10px] font-mono text-slate-400 tracking-wider">sameer.ts</span>
        </div>

        {/* Code body */}
        <div className="px-4 py-4 min-h-[220px]" style={{ background: "#f8fafc" }}>
          <pre className="font-mono text-xs leading-6">
            {CODE_LINES.map((line, i) => {
              if (i > visibleLines) return null;
              const chars = i < visibleLines ? line.text.length : (charCounts[i] ?? 0);
              const displayed = line.text.slice(0, chars);
              const isCurrent = i === visibleLines && !allDone;

              return (
                <div key={i} className="flex items-center">
                  <span className="text-slate-300 select-none w-5 text-right mr-3 text-[9px]">{i + 1}</span>
                  <span className={line.color}>{displayed}</span>
                  {isCurrent && (
                    <span className="inline-block w-0.5 h-3.5 bg-blue-500 ml-0.5 animate-pulse" />
                  )}
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
