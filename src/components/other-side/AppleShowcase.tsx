"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const realProjects = [
  {
    title: "Amagi Payment System",
    category: "Financial Architecture & WebSockets",
    date: "Oct 2025 – Present",
    desc: "Built high-volume payment platform with secure transactions and API integrations. Implemented real-time chat using WebSockets and analytics dashboards.",
    tech: ["Spring Boot", "React.js", "WebSockets", "MySQL", "Redis"],
    highlight: "Real-time Transactions",
  },
  {
    title: "Coach Konnects",
    category: "Full Stack Coaching Platform",
    date: "Independent",
    desc: "Designed and developed the complete architecture encompassing web applications, secure WebAuthn authentication, and PostgreSQL database layers.",
    tech: ["Spring Boot", "React", "WebAuthn API", "PostgreSQL"],
    highlight: "End-to-End Ownership",
  },
  {
    title: "NT Nation Trust Bank",
    category: "Enterprise Banking Microservices",
    date: "Oct 2025 – Present",
    desc: "Developed enterprise banking modules with approval workflows. Implemented RBAC and secure APIs, improving legacy systems with modern microservice architecture.",
    tech: ["Java", "Spring Boot", "Microservices", "Oracle DB"],
    highlight: "RBAC & Security",
  },
  {
    title: "Hotel Management Platform",
    category: "Cross-Platform Ecosystem",
    date: "Web, iOS & Android",
    desc: "Comprehensive hotel management system supporting cross-platform operations across Web (React), iOS (Swift), and Android (Kotlin) backed by Node.js APIs.",
    tech: ["Node.js", "React", "Swift (iOS)", "Kotlin (Android)", "MongoDB"],
    highlight: "Tri-Platform Native",
  },
  {
    title: "DHL Asset Management (AMS / SIMS)",
    category: "Global Logistics Systems",
    date: "Full Stack",
    desc: "Enhanced asset management systems and resolved critical bottlenecks to streamline transit tracking for DHL global logistics.",
    tech: ["Spring Boot", "Java", "React", "Oracle DB"],
    highlight: "Logistics Optimization",
  },
  {
    title: "Zomato Hyperpure",
    category: "B2B Supply Chain & Procurement",
    date: "Full Stack",
    desc: "Built and optimized procurement features and inventory synchronization for the restaurant supply platform.",
    tech: ["Spring Boot", "React", "PostgreSQL"],
    highlight: "High-Throughput Supply",
  },
];

export default function AppleShowcase() {
  return (
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2997ff] block mb-2">
            Sameer Khan // System Archive
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f5f5f7]">
            Deployed Systems.
          </h2>
        </div>
        <p className="text-sm text-[#86868b] mt-4 sm:mt-0 max-w-sm leading-relaxed">
          Production systems engineered across financial technology, banking, logistics, and independent SaaS.
        </p>
      </div>

      <div className="space-y-4">
        {realProjects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-2xl p-6 sm:p-8 bg-[#161617] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#2997ff] font-semibold">
                  {p.category}
                </span>
                <span className="text-[#424245]">&bull;</span>
                <span className="text-xs font-mono text-[#86868b]">{p.date}</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-tight group-hover:text-white transition-colors">
                {p.title}
              </h3>
              
              <p className="text-sm text-[#86868b] leading-relaxed">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 sm:gap-10 justify-between md:justify-end shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="text-left md:text-right">
                <div className="text-lg sm:text-xl font-semibold tracking-tight text-[#f5f5f7]">
                  {p.highlight}
                </div>
                <div className="text-[11px] text-[#86868b] font-medium">Architecture Pillar</div>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
