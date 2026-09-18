"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Filter
} from "lucide-react";
import SectionBanner from "./SectionBanner";

export type ProjectCategory = "all" | "fintech" | "banking" | "auth" | "logistics";

export type ProjectType = {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  date: string;
  description: string;
  humor: string;
  metrics: string[];
  featured?: boolean;
  highlightColor: string;
  tech: string[];
  details: {
    frontend?: string[];
    mobile?: string[];
    backend?: string[];
    database?: string[];
  };
};

export const allProjects: ProjectType[] = [
  {
    id: "amagi",
    title: "Amagi Payment System",
    category: "fintech",
    categoryLabel: "Fintech & WebSockets",
    date: "Oct 2025 – Present",
    featured: true,
    highlightColor: "#f59e0b",
    metrics: ["Sub-second settlement", "Live WebSocket chat", "Real-time ledger"],
    description: "Architected a high-throughput, sub-second payment settlement platform featuring live customer communications, fraud monitoring, and automated transaction reconciliation.",
    humor: "All transactions are strictly ACID compliant. Developer sanity during launch: undetermined.",
    tech: ["Spring Boot", "React.js", "WebSockets", "Redis", "MySQL"],
    details: { frontend: ["React.js", "TailwindCSS"], backend: ["Spring Boot", "WebSockets"], database: ["MySQL", "Redis"] }
  },
  {
    id: "bank",
    title: "NT Nation Trust Bank",
    category: "banking",
    categoryLabel: "Enterprise Banking",
    date: "Oct 2025 – Present",
    featured: true,
    highlightColor: "#3b82f6",
    metrics: ["Multi-tier approvals", "Strict RBAC governance", "Fault-tolerant architecture"],
    description: "Developed core banking modules with strict multi-tier approval workflows, role-based access control, and distributed microservices, modernizing legacy systems into reliable architectures.",
    humor: "Rigid approval chains: Even accidental typos require two senior vice presidents to sign off.",
    tech: ["Java", "Spring Boot", "Microservices", "Oracle DB"],
    details: { frontend: ["Internal Dashboards"], backend: ["Java", "Spring Boot", "Microservices"], database: ["Oracle DB"] }
  },
  {
    id: "konnects",
    title: "Coach Konnects Platform",
    category: "auth",
    categoryLabel: "Full Stack & WebAuthn",
    date: "Independent",
    featured: true,
    highlightColor: "#06b6d4",
    metrics: ["Passwordless biometric auth", "Real-time scheduling", "Sub-100ms API response"],
    description: "Built an independent, full-stack coaching platform. Designed and developed the complete architecture encompassing passwordless WebAuthn biometric security and interactive scheduling.",
    humor: "Passwordless WebAuthn: Because users forget passwords 10 minutes after sign-up anyway.",
    tech: ["Spring Boot", "React", "WebAuthn", "PostgreSQL"],
    details: { frontend: ["React (Web)"], backend: ["Spring Boot", "WebAuthn API"], database: ["PostgreSQL"] }
  },
  {
    id: "logistics-dhl",
    title: "DHL (AMS / SIMS)",
    category: "logistics",
    categoryLabel: "Global Logistics",
    date: "Full Stack",
    featured: true,
    highlightColor: "#10b981",
    metrics: ["4 continents tracked", "Zero packet drops", "Automated asset dispatch"],
    description: "Enhanced asset management systems and resolved critical bottlenecks to streamline worldwide parcel tracking and warehouse fleet operations for DHL.",
    humor: "Tracks packages moving across 4 continents. Still cannot track where my weekends go.",
    tech: ["Spring Boot", "Java", "React", "Oracle DB"],
    details: { frontend: ["React"], backend: ["Java", "Spring Boot"], database: ["Oracle DB"] }
  },
  {
    id: "zomato",
    title: "Zomato Hyperpure",
    category: "logistics",
    categoryLabel: "Supply Chain",
    date: "Full Stack",
    highlightColor: "#ef4444",
    metrics: ["High-volume procurement", "Automated inventory", "B2B order dispatch"],
    description: "Built and optimized procurement features for the B2B restaurant supply platform, handling high-volume daily orders and supplier catalogs.",
    humor: "Successfully routed millions of potato and onion orders without a single stack trace.",
    tech: ["Spring Boot", "React", "PostgreSQL"],
    details: { frontend: ["React"], backend: ["Spring Boot"], database: ["PostgreSQL"] }
  },
  {
    id: "hotel",
    title: "Hotel Management App",
    category: "auth",
    categoryLabel: "Cross-Platform",
    date: "Full Stack",
    highlightColor: "#8b5cf6",
    metrics: ["Web + iOS + Android", "Real-time room status", "Unified REST backend"],
    description: "Developed a comprehensive hotel management application supporting cross-platform usage across Web, Android, and iOS devices with unified inventory synchronization.",
    humor: "Tri-platform sync: Room double-booking officially dropped from 'daily riot' to zero.",
    tech: ["Node.js", "Swift", "Kotlin", "MongoDB"],
    details: { frontend: ["React"], mobile: ["Swift (iOS)", "Kotlin (Android)"], backend: ["Node.js", "Express.js"], database: ["MongoDB"] }
  },
  {
    id: "warehouse",
    title: "Warehouse Software",
    category: "logistics",
    categoryLabel: "Fleet & Transit",
    date: "Logistics",
    highlightColor: "#eab308",
    metrics: ["Route optimization", "Driver dispatch", "Barcode scanning integration"],
    description: "Built an application for managing drivers and tracking assets efficiently across regional warehouses and transit routes.",
    humor: "Optimized route algorithms so aggressively that trucks arrive before the boxes are packed.",
    tech: ["Spring Boot", "MySQL", "React"],
    details: { frontend: ["React.js"], backend: ["Spring Boot"], database: ["MySQL"] }
  },
  {
    id: "ig-tool",
    title: "IG Tool (Multi-Module)",
    category: "banking",
    categoryLabel: "Enterprise Workflow",
    date: "Team Lead",
    highlightColor: "#6366f1",
    metrics: ["Led development team", "Automated invoicing", "GRN reconciliation"],
    description: "Developed invoice, asset, and GRN modules. Led the development team and significantly improved operational turnaround times.",
    humor: "Decommissioned 47 fragile Excel spreadsheets that had been secretly running the company.",
    tech: ["Node.js", "React", "MySQL"],
    details: { frontend: ["React"], backend: ["Node.js"], database: ["MySQL"] }
  },
  {
    id: "expense",
    title: "Corporate Expense Module",
    category: "fintech",
    categoryLabel: "Financial Tracking",
    date: "Mar 2025 – Present",
    highlightColor: "#ec4899",
    metrics: ["Audit trail", "Multi-currency support", "Real-time approvals"],
    description: "Developing an internal financial tracking module to monitor corporate expenses, automated budget thresholds, and ledger audits.",
    humor: "Tracks corporate expenses with extreme precision. No, late-night Red Bull is not tax-deductible.",
    tech: ["Java", "Spring Boot", "React", "MySQL"],
    details: { frontend: ["React"], backend: ["Java", "Spring Boot"], database: ["MySQL"] }
  }
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: allProjects.length },
    { id: "fintech", label: "Fintech & WebSockets", count: allProjects.filter(p => p.category === "fintech").length },
    { id: "banking", label: "Enterprise Banking", count: allProjects.filter(p => p.category === "banking").length },
    { id: "auth", label: "Full Stack & Auth", count: allProjects.filter(p => p.category === "auth").length },
    { id: "logistics", label: "Logistics & Supply", count: allProjects.filter(p => p.category === "logistics").length },
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 bg-[var(--color-background)] relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionBanner
            eyebrow="production.deployments"
            title="FEATURED"
            highlight="SYSTEMS"
            gradient="from-blue-600 via-cyan-500 to-emerald-500"
            description="Real architectures shipped across Fintech, Core Banking, Biometric Auth, and Global Logistics."
          />

          {/* Direct Link to Dedicated Project Showcase Deck */}
          <Link
            href="/work"
            className="neu-raised self-start md:self-end px-5 py-3 rounded-2xl text-xs font-mono text-[var(--color-primary)] hover:text-white flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] group"
          >
            <span>Open Dedicated Project Deck (9)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Category Filter Tabs ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-[0_0_18px_rgba(37,99,235,0.4)] scale-105"
                    : "neu-inset text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/5 text-[var(--color-muted)]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── High-Visibility Projects Matrix ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProjectId === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`w-full rounded-3xl p-7 md:p-8 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
                  project.featured ? "border border-[var(--color-primary)]/30" : "border border-black/5 dark:border-white/5"
                }`}
                style={{
                  background: "var(--color-surface)",
                  boxShadow: isExpanded
                    ? `12px 12px 28px var(--color-shadow-dark), -12px -12px 28px var(--color-shadow-light), 0 0 30px rgba(37,99,235,0.15)`
                    : `8px 8px 20px var(--color-shadow-dark), -8px -8px 20px var(--color-shadow-light)`,
                }}
                onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
              >
                {/* Subtle colored accent glow in corner */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-10 blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity"
                  style={{ background: project.highlightColor }}
                />

                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: project.highlightColor, boxShadow: `0 0 8px ${project.highlightColor}` }}
                    />
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                      {project.categoryLabel}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold border border-amber-500/30">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[var(--color-muted)]">
                    {project.date}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Metrics / Wins */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((metric, mIdx) => (
                    <span
                      key={mIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-black/5 dark:bg-white/5 text-[var(--color-foreground)] border border-black/5 dark:border-white/5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{metric}</span>
                    </span>
                  ))}
                </div>

                {/* Witty Developer Takeaway */}
                <div className="p-3 rounded-2xl neu-inset mb-5 text-xs font-mono text-[var(--color-muted)] flex items-start gap-2 border border-black/5 dark:border-white/5">
                  <span className="text-amber-500 shrink-0">💬</span>
                  <span className="italic leading-relaxed">{project.humor}</span>
                </div>

                {/* Direct Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-[var(--color-muted)] bg-[var(--color-background)] border border-black/5 dark:border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expandable Architecture Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-5 border-t border-[var(--color-primary)]/20 overflow-hidden"
                    >
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)] mb-3 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Architecture Breakdown</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                        {project.details.backend && (
                          <div className="p-3 rounded-xl neu-inset">
                            <span className="text-[10px] text-[var(--color-primary)] block mb-1">SERVICE / BACKEND</span>
                            {project.details.backend.map(b => (
                              <span key={b} className="block text-[var(--color-foreground)] font-semibold">{b}</span>
                            ))}
                          </div>
                        )}

                        {(project.details.frontend || project.details.mobile) && (
                          <div className="p-3 rounded-xl neu-inset">
                            <span className="text-[10px] text-violet-500 block mb-1">CLIENT / INTERFACE</span>
                            {[...(project.details.frontend ?? []), ...(project.details.mobile ?? [])].map(f => (
                              <span key={f} className="block text-[var(--color-foreground)] font-semibold">{f}</span>
                            ))}
                          </div>
                        )}

                        {project.details.database && (
                          <div className="p-3 rounded-xl neu-inset">
                            <span className="text-[10px] text-cyan-500 block mb-1">DATABASE / PERSISTENCE</span>
                            {project.details.database.map(d => (
                              <span key={d} className="block text-[var(--color-foreground)] font-semibold">{d}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tap to Inspect Toggle Hint */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                  <span className="text-[11px]">
                    {isExpanded ? "▲ Hide architecture" : "▼ Tap to inspect architecture"}
                  </span>
                  <Link
                    href="/work"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[var(--color-primary)] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Full Case Study</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
