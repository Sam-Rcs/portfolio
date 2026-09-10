"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Layout, Database, Activity, Cpu, ShieldCheck, Terminal, Layers, Sparkles } from "lucide-react";

interface GoldenBentoProps {
  isDark: boolean;
}

export default function GoldenBento({ isDark }: GoldenBentoProps) {
  const [activeStack, setActiveStack] = useState<"backend" | "frontend" | "database">("backend");

  const stackData = {
    backend: [
      { name: "Spring Boot", desc: "Enterprise services, REST APIs & DI" },
      { name: "Java", desc: "Robust multi-threaded application logic" },
      { name: "Node.js & Express", desc: "High-speed asynchronous gateways" },
      { name: "WebSockets", desc: "Bi-directional real-time event broadcasting" },
      { name: "Microservices", desc: "Decoupled domain-driven architecture" },
    ],
    frontend: [
      { name: "React.js", desc: "Component architecture & custom hooks" },
      { name: "Next.js App Router", desc: "SSR, edge hydration & static prerendering" },
      { name: "TypeScript", desc: "Strict end-to-end type safety" },
      { name: "Framer Motion", desc: "Hardware-accelerated 120Hz choreography" },
      { name: "Tailwind CSS", desc: "Design tokens & responsive utilities" },
    ],
    database: [
      { name: "MySQL & PostgreSQL", desc: "Relational modeling, indexing & ACID" },
      { name: "Oracle DB", desc: "Enterprise banking data warehousing" },
      { name: "Redis", desc: "In-memory caching & PubSub streaming" },
      { name: "MongoDB", desc: "Flexible document-based mobile storage" },
    ],
  };

  return (
    <section className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/20 bg-amber-500/5 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Royal Technical Core</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
          End-to-End Ownership. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
            From Database Schema to Deployed Pixel.
          </span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Interactive Stack Tabs (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 rounded-3xl p-8 sm:p-12 border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(26, 20, 12, 0.85) 0%, rgba(13, 10, 6, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 251, 240, 0.9) 0%, rgba(254, 243, 199, 0.7) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(251,191,36,0.2)"
              : "0 20px 40px rgba(217,119,6,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>Full Stack Toolset</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Scalable Systems &amp; High Concurrency
            </h3>
            <p className="text-sm text-neutral-400 max-w-lg leading-relaxed">
              &ldquo;Clean architecture, readable code, and systems that are easy to reason about six months later.&rdquo; Select a layer to inspect:
            </p>
          </div>

          {/* Tab buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStack("backend")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${
                activeStack === "backend"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-neutral-400 hover:text-amber-300 border border-white/5"
              }`}
            >
              Backend &amp; APIs
            </button>
            <button
              onClick={() => setActiveStack("frontend")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${
                activeStack === "frontend"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-neutral-400 hover:text-amber-300 border border-white/5"
              }`}
            >
              Frontend &amp; Motion
            </button>
            <button
              onClick={() => setActiveStack("database")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${
                activeStack === "database"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-neutral-400 hover:text-amber-300 border border-white/5"
              }`}
            >
              Databases &amp; Caching
            </button>
          </div>

          {/* Active Items */}
          <div className="mt-6 pt-6 border-t border-amber-500/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stackData[activeStack].map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/10 flex flex-col justify-between"
              >
                <span className="text-sm font-bold text-amber-200">{item.name}</span>
                <span className="text-xs text-neutral-400 mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: RCS Tec Work History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl p-8 border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(26, 20, 12, 0.85) 0%, rgba(13, 10, 6, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 251, 240, 0.9) 0%, rgba(254, 243, 199, 0.7) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(251,191,36,0.2)"
              : "0 20px 40px rgba(217,119,6,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Activity className="w-4 h-4" />
              <span>Operational History</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
              Full Stack Developer
            </h3>
            <div className="text-xs font-mono text-amber-400/90 mb-3">
              RCS Tec · Apr 2024 – Present
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Leading development teams, enforcing code quality through reviews, optimizing SQL schemas, and managing zero-downtime releases.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-amber-500/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Production Systems:</span>
              <span className="font-bold text-amber-300">9+ Enterprise Platforms</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Core Architecture:</span>
              <span className="font-bold text-amber-300">Spring Boot &amp; React</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Real-Time Streams:</span>
              <span className="font-bold text-emerald-400">WebSockets Active</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Real-Time Latency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl p-8 border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[340px]"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(26, 20, 12, 0.85) 0%, rgba(13, 10, 6, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 251, 240, 0.9) 0%, rgba(254, 243, 199, 0.7) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(251,191,36,0.2)"
              : "0 20px 40px rgba(217,119,6,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Telemetry &amp; Speed</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Sub-Millisecond APIs
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              SQL query optimization, connection pooling, and in-memory Redis caching for peak efficiency.
            </p>
          </div>

          <div className="mt-6 text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
            &lt; 0.2<span className="text-xs sm:text-sm text-neutral-400 font-mono ml-1">ms</span>
            <div className="text-[11px] text-amber-400/80 font-mono mt-1 font-normal">
              Average WebSocket Latency
            </div>
          </div>
        </motion.div>

        {/* Card 4: Cross-Platform Native Apps (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-2 rounded-3xl p-8 sm:p-10 border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[340px]"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(26, 20, 12, 0.85) 0%, rgba(13, 10, 6, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 251, 240, 0.9) 0%, rgba(254, 243, 199, 0.7) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(251,191,36,0.2)"
              : "0 20px 40px rgba(217,119,6,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Terminal className="w-4 h-4" />
              <span>Multi-Platform Reach</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Web, Android (Kotlin), and iOS (Swift)
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              Full-spectrum software engineering: building responsive Web interfaces alongside native mobile experiences, all connected to hardened Spring Boot &amp; Node.js microservices.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Spring Boot", "React", "Node.js", "Java", "Kotlin", "Swift", "WebSockets", "MySQL", "PostgreSQL", "Oracle DB", "Redis"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-200"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
