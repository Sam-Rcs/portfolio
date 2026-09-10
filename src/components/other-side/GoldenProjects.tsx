"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Zap, Sparkles } from "lucide-react";

interface GoldenProjectsProps {
  isDark: boolean;
}

const realProjects = [
  {
    title: "Amagi Payment System",
    category: "Financial Architecture & WebSockets",
    date: "Oct 2025 – Present",
    desc: "Engineered a high-volume payment platform featuring secure multi-gateway transactions, API orchestration, and real-time chat via WebSockets with dynamic analytics dashboards.",
    tech: ["Spring Boot", "React.js", "WebSockets", "MySQL", "Redis"],
    highlight: "Real-time Transactions",
  },
  {
    title: "Coach Konnects",
    category: "Full Stack Platform Architecture",
    date: "Independent",
    desc: "Designed and implemented end-to-end coaching ecosystem architecture encompassing responsive web applications, secure WebAuthn authentication, and PostgreSQL storage.",
    tech: ["Spring Boot", "React", "WebAuthn API", "PostgreSQL"],
    highlight: "Full Ownership",
  },
  {
    title: "NT Nation Trust Bank",
    category: "Enterprise Banking Microservices",
    date: "Oct 2025 – Present",
    desc: "Engineered core banking modules with multi-tier approval workflows, role-based access control (RBAC), and hardened REST APIs on top of Oracle DB.",
    tech: ["Java", "Spring Boot", "Microservices", "Oracle DB"],
    highlight: "Enterprise RBAC",
  },
  {
    title: "Hotel Management Platform",
    category: "Cross-Platform Tri-App Suite",
    date: "Web, Android & iOS",
    desc: "Complete hospitality operational management suite spanning Web (React), native iOS (Swift), and native Android (Kotlin) backed by unified Node.js/Express APIs.",
    tech: ["Node.js", "React", "Swift (iOS)", "Kotlin (Android)", "MongoDB"],
    highlight: "Tri-Platform Native",
  },
  {
    title: "DHL Asset Management (AMS / SIMS)",
    category: "Global Logistics Systems",
    date: "Full Stack",
    desc: "Streamlined asset management systems, optimized high-volume database queries, and resolved critical operational issues for DHL international logistics.",
    tech: ["Spring Boot", "Java", "React", "Oracle DB"],
    highlight: "Logistics Optimization",
  },
  {
    title: "Zomato Hyperpure",
    category: "B2B Restaurant Supply Platform",
    date: "Full Stack",
    desc: "Architected procurement pipeline features, high-efficiency inventory checks, and real-time order tracking for restaurant supply logistics.",
    tech: ["Spring Boot", "React", "PostgreSQL"],
    highlight: "High Throughput",
  },
];

export default function GoldenProjects({ isDark }: GoldenProjectsProps) {
  return (
    <section className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-500/20 z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/20 bg-amber-500/5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deployed Systems</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Proven in Production.
          </h2>
        </div>
        <p className="text-sm text-neutral-400 mt-4 sm:mt-0 max-w-sm font-mono leading-relaxed">
          Production systems engineered across financial tech, banking, logistics, and independent SaaS.
        </p>
      </div>

      <div className="space-y-5">
        {realProjects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group rounded-3xl p-6 sm:p-8 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(22, 17, 10, 0.8) 0%, rgba(10, 8, 4, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 251, 240, 0.9) 0%, rgba(254, 243, 199, 0.7) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: isDark
                ? "0 15px 35px rgba(0,0,0,0.6), inset 0 1px 0 rgba(251,191,36,0.15)"
                : "0 15px 30px rgba(217,119,6,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Subtle Golden Hover Ribbon */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                  {p.category}
                </span>
                <span className="text-amber-500/40">&bull;</span>
                <span className="text-xs font-mono text-neutral-400">{p.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                {p.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 sm:gap-10 justify-between md:justify-end shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-amber-500/10">
              <div className="text-left md:text-right">
                <div className="text-base sm:text-lg font-bold tracking-tight text-amber-300">
                  {p.highlight}
                </div>
                <div className="text-[10px] font-mono text-neutral-400">Pillar Benchmark</div>
              </div>

              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 text-amber-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
