"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert, Sparkles, Home, Server, Code2, Database, ExternalLink, Cpu } from "lucide-react";
import CanvasScrubHero from "@/components/CanvasScrubHero";

const showcaseProjects = [
  {
    title: "Amagi Payment System",
    category: "Fintech & WebSockets",
    date: "Oct 2025 – Present",
    desc: "Built a high-security payment processing platform with sub-second settlement pipelines, live WebSocket communication, and real-time fraud monitoring.",
    humor: "Where transactions are atomic and race conditions fear to tread.",
    tech: ["Spring Boot", "React.js", "WebSockets", "Redis", "MySQL"],
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "NT Nation Trust Bank",
    category: "Enterprise Core Banking",
    date: "Oct 2025 – Present",
    desc: "Developed core banking approval modules, RBAC governance, and secure distributed APIs, transforming legacy structures into modern microservices.",
    humor: "Strict approval workflows: Even our bugs require manager sign-off.",
    tech: ["Java", "Spring Boot", "Microservices", "Oracle DB"],
    accent: "from-orange-500/20 to-rose-500/10",
    border: "border-orange-500/30",
    badge: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "Coach Konnects",
    category: "Full Stack & WebAuthn",
    date: "Independent",
    desc: "Architected an independent full-stack coaching platform. Designed and engineered end-to-end architecture with WebAuthn biometric security.",
    humor: "Zero passwords stored: Biometrics so sharp you can't fake being yourself.",
    tech: ["Spring Boot", "React", "WebAuthn", "PostgreSQL"],
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "DHL (AMS / SIMS) & Logistics",
    category: "Global Fleet Tracking",
    date: "Logistics",
    desc: "Enhanced critical asset management systems and multi-warehouse route dispatch pipelines for high operational throughput across transit networks.",
    humor: "Moving freight across continents without dropping a single semicolon.",
    tech: ["Spring Boot", "Java", "React", "Oracle DB"],
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Zomato Hyperpure",
    category: "B2B Procurement Supply",
    date: "High Throughput",
    desc: "Built and optimized procurement pipelines and inventory management for high-volume B2B restaurant supply fulfillment.",
    humor: "Supplying thousands of restaurants faster than a chef can yell 'Order up!'.",
    tech: ["Spring Boot", "React", "PostgreSQL"],
    accent: "from-rose-500/20 to-amber-500/10",
    border: "border-rose-500/30",
    badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Cross-Platform Hotel App",
    category: "Web & Mobile Ecosystem",
    date: "Full Stack",
    desc: "Engineered a unified hotel reservation and staff management ecosystem across Web, iOS (Swift), and Android (Kotlin) clients.",
    humor: "One backend to rule them all, across web, phones, and front desk tablets.",
    tech: ["Node.js", "Express", "Swift", "Kotlin", "MongoDB"],
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/30",
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
];

export default function OtherSidePage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white selection:bg-amber-400 selection:text-black relative">
      {/* 192-Frame 3D Cursor & Scroll Scrubbing Canvas Hero with Dynamic Project Cards */}
      <CanvasScrubHero />

      {/* ── Technical Projects Matrix Section (Reached when scrolling down) ── */}
      <section id="projects-matrix" className="relative py-28 px-6 bg-[#0a0b10] border-t border-white/10">
        {/* Subtle Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-amber-500/5 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 mb-4">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>DEPLOYED PRODUCTION ARCHITECTURE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Engineering Built for <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Real-World Scale.</span>
            </h2>

            <p className="text-sm sm:text-base font-mono text-neutral-400 leading-relaxed max-w-xl mx-auto">
              Real projects shipped to actual users. Zero buzzwords, rock-solid backends, and responsive UIs.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {showcaseProjects.map((p, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 bg-gradient-to-b ${p.accent} bg-black/50 border ${p.border} backdrop-blur-xl flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-xl group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.badge}`}>
                      {p.category}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">{p.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-4 text-[11px] font-mono text-neutral-400">
                    <span className="text-amber-400 font-semibold">&gt; Reality Check:</span> {p.humor}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Return to Normal Portfolio Section */}
          <div className="max-w-2xl mx-auto text-center p-8 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
              [ END OF 3D WORKSPACE ]
            </span>
            <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              Had enough 3D for today?
            </h3>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md mx-auto leading-relaxed">
              Ready to head back to the clean, polite, recruiter-friendly main portfolio?
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                <span>Return to Main Portfolio</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Emergency Escape to Reality</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
