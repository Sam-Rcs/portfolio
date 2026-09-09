"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Layout, Database, Activity, Cpu, ShieldCheck, Terminal, Layers } from "lucide-react";

export default function AppleBento() {
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
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2997ff] block mb-2">
          Engineering Arsenal
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#f5f5f7]">
          End-to-end ownership. <br />
          <span className="text-[#86868b]">From database schema to deployed pixel.</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento 1: Interactive Stack Selector (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 rounded-[28px] p-8 sm:p-12 bg-[#161617] border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[400px] group hover:border-white/20 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2997ff]/10 blur-[100px] rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2997ff] mb-3">
              <Layers className="w-4 h-4" />
              <span>Interactive Technical Core</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-semibold text-[#f5f5f7] tracking-tight mb-3">
              Architecture Built to Scale.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-lg leading-relaxed">
              &ldquo;Clean architecture, readable code, and systems that are easy to reason about six months later.&rdquo; Select a domain to inspect my toolset:
            </p>
          </div>

          {/* Domain Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStack("backend")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${
                activeStack === "backend"
                  ? "bg-[#0071e3] text-white shadow-lg"
                  : "bg-white/5 text-[#86868b] hover:text-[#f5f5f7]"
              }`}
            >
              Backend &amp; APIs
            </button>
            <button
              onClick={() => setActiveStack("frontend")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${
                activeStack === "frontend"
                  ? "bg-[#0071e3] text-white shadow-lg"
                  : "bg-white/5 text-[#86868b] hover:text-[#f5f5f7]"
              }`}
            >
              Frontend &amp; Motion
            </button>
            <button
              onClick={() => setActiveStack("database")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${
                activeStack === "database"
                  ? "bg-[#0071e3] text-white shadow-lg"
                  : "bg-white/5 text-[#86868b] hover:text-[#f5f5f7]"
              }`}
            >
              Databases &amp; Cache
            </button>
          </div>

          {/* Active Domain Items */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stackData[activeStack].map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between"
              >
                <span className="text-sm font-semibold text-[#f5f5f7]">{item.name}</span>
                <span className="text-xs text-[#86868b] mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bento 2: RCS Tec Operational History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] p-8 bg-[#161617] border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[400px] group hover:border-white/20 transition-all duration-500"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#30d158] mb-3">
              <Activity className="w-4 h-4" />
              <span>Work Log</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#f5f5f7] tracking-tight mb-2">
              Full Stack Developer.
            </h3>
            <div className="text-xs font-mono text-[#2997ff] mb-2">RCS Tec · Apr 2024 – Present</div>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Leading developer teams, architecting real-time features, optimizing SQL queries, and maintaining production stability.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#86868b]">Production Deployments:</span>
              <span className="font-semibold text-[#f5f5f7]">9+ Enterprise Systems</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#86868b]">Architecture:</span>
              <span className="font-semibold text-[#f5f5f7]">Spring Boot &amp; React</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#86868b]">Real-Time Feed:</span>
              <span className="font-semibold text-[#30d158]">WebSockets Online</span>
            </div>
          </div>
        </motion.div>

        {/* Bento 3: Real-Time WebSockets & Sub-Millisecond Speed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] p-8 bg-[#161617] border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[340px] group hover:border-white/20 transition-all duration-500"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#bf5af2] mb-3">
              <Cpu className="w-4 h-4" />
              <span>Real-Time Pipeline</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#f5f5f7] tracking-tight mb-2">
              Low Latency.
            </h3>
            <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
              Bi-directional WebSocket streaming with Redis pub/sub backplanes for immediate client updates.
            </p>
          </div>

          <div className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-[#f5f5f7]">
            &lt; 0.2<span className="text-[#86868b] text-xl font-normal">ms</span>
            <div className="text-xs text-[#86868b] font-medium mt-1">Average Event Latency</div>
          </div>
        </motion.div>

        {/* Bento 4: Mobile & Cross-Platform (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 rounded-[28px] p-8 sm:p-10 bg-[#161617] border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[340px] group hover:border-white/20 transition-all duration-500"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff9f0a] mb-3">
              <Terminal className="w-4 h-4" />
              <span>Cross-Platform Versatility</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight mb-2">
              Web, iOS, and Android Native Applications.
            </h3>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-xl leading-relaxed">
              Beyond the web stack, experienced in building mobile clients using Swift (iOS) and Kotlin (Android), connecting seamlessly to unified backend APIs.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Spring Boot", "React", "Node.js", "Kotlin", "Swift", "WebAuthn", "PostgreSQL", "MySQL", "Oracle DB", "Redis"].map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2c2c2e]/70 border border-white/10 text-[#f5f5f7]"
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
