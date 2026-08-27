"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, Smartphone } from "lucide-react";
import SectionBanner from "./SectionBanner";

type ProjectType = {
  title: string;
  date: string;
  description: string;
  tech: string[];
  details: {
    frontend?: string[];
    mobile?: string[];
    backend?: string[];
    database?: string[];
  };
};

const projects: ProjectType[] = [
  {
    title: "Coach Konnects",
    date: "Independent",
    description: "Built an independent, full-stack coaching platform. Designed and developed the complete architecture encompassing Web applications.",
    tech: ["Spring Boot", "React", "WebAuthn"],
    details: { frontend: ["React (Web)"], backend: ["Spring Boot", "WebAuthn API"], database: ["PostgreSQL"] }
  },
  {
    title: "Amagi Payment System",
    date: "Oct 2025 – Present",
    description: "Built payment platform with secure transactions and API integrations. Implemented real-time chat using WebSockets and created analytics dashboards.",
    tech: ["Spring Boot", "React", "WebSockets"],
    details: { frontend: ["React.js", "TailwindCSS"], backend: ["Spring Boot", "WebSockets"], database: ["MySQL", "Redis"] }
  },
  {
    title: "NT Nation Trust Bank",
    date: "Oct 2025 – Present",
    description: "Developed banking modules with approval workflows. Implemented RBAC and secure APIs, improving legacy systems with modern architecture.",
    tech: ["Java", "Spring Boot", "Microservices"],
    details: { frontend: ["Internal Dashboards"], backend: ["Java", "Spring Boot", "Microservices"], database: ["Oracle DB"] }
  },
  {
    title: "Hotel Management App",
    date: "Full Stack",
    description: "Developed a comprehensive hotel management application supporting cross-platform usage across Web, Android, and iOS devices.",
    tech: ["Node.js", "Swift", "Kotlin"],
    details: { frontend: ["React"], mobile: ["Swift (iOS)", "Kotlin (Android)"], backend: ["Node.js", "Express.js"], database: ["MongoDB"] }
  },
  {
    title: "Warehouse Software",
    date: "Logistics",
    description: "Built an application for managing drivers and tracking assets efficiently across warehouses and transit routes.",
    tech: ["Spring Boot", "MySQL", "React"],
    details: { frontend: ["React.js"], backend: ["Spring Boot"], database: ["MySQL"] }
  },
  {
    title: "IG Tool (Multi-Module)",
    date: "Team Lead",
    description: "Developed invoice, asset, and GRN modules. Led the development team and significantly improved operational efficiency.",
    tech: ["Node.js", "React", "MySQL"],
    details: { frontend: ["React"], backend: ["Node.js"], database: ["MySQL"] }
  },
  {
    title: "DHL (AMS / SIMS)",
    date: "Full Stack",
    description: "Enhanced asset management systems and fixed critical issues to streamline operations for DHL.",
    tech: ["Spring Boot", "Java", "React"],
    details: { frontend: ["React"], backend: ["Java", "Spring Boot"], database: ["Oracle DB"] }
  },
  {
    title: "Zomato Hyperpure",
    date: "Full Stack",
    description: "Built and optimized procurement features for the B2B restaurant supply platform.",
    tech: ["Spring Boot", "React"],
    details: { frontend: ["React"], backend: ["Spring Boot"], database: ["PostgreSQL"] }
  },
  {
    title: "Expense Module",
    date: "Mar 2025 – Present",
    description: "Developing an internal financial tracking module to monitor corporate expenses.",
    tech: ["Java", "Spring Boot", "React"],
    details: { frontend: ["React"], backend: ["Java", "Spring Boot"], database: ["MySQL"] }
  }
];

const NodeChip = ({
  label, items, color, icon
}: {
  label: string;
  items: string[];
  color: string;
  icon: React.ReactNode;
}) => (
  <div
    className="absolute z-50 rounded-2xl flex items-center gap-2 px-3 py-2 min-w-[130px] whitespace-nowrap"
    style={{
      background: "#ffffff",
      boxShadow: `4px 4px 12px rgba(0,0,0,0.12), -2px -2px 8px rgba(255,255,255,0.9), 0 0 0 1px ${color}22`,
      border: `1px solid ${color}33`,
    }}
  >
    <div style={{ color }}>{icon}</div>
    <div className="flex flex-col">
      <span className="text-[8px] font-mono uppercase tracking-[0.2em]" style={{ color }}>{label}</span>
      {items.map((t) => <span key={t} className="text-[10px] text-slate-700 font-semibold leading-tight">{t}</span>)}
    </div>
  </div>
);

export default function ProjectsSection() {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 bg-[var(--color-background)] relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">

        <SectionBanner
          eyebrow="deployed.systems"
          title="SYSTEM"
          highlight="PROJECTS"
          gradient="from-blue-600 to-cyan-500"
          description="Tap a project to inspect its architecture details."
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start pb-24 pt-16">
          {projects.map((project, index) => {
            const isExpanded = expandedProjectId === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative flex justify-center overflow-visible"
              >
                {/* Pop-out Architecture Nodes */}
                <AnimatePresence>
                  {isExpanded && (
                    <>
                      {/* Backend — Pops UP */}
                      {project.details.backend && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.8 }}
                          transition={{ type: "spring", damping: 15 }}
                          className="absolute -top-14 left-1/2 -translate-x-1/2 z-50"
                        >
                          <NodeChip
                            label="Service"
                            items={project.details.backend}
                            color="#2563eb"
                            icon={<Server className="w-4 h-4" />}
                          />
                        </motion.div>
                      )}

                      {/* Frontend/Mobile — Pops Bottom-Left */}
                      {(project.details.frontend || project.details.mobile) && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.8 }}
                          transition={{ type: "spring", damping: 15, delay: 0.05 }}
                          className="absolute -bottom-14 left-4 z-50"
                        >
                          <NodeChip
                            label="Client"
                            items={[...(project.details.frontend ?? []), ...(project.details.mobile ?? [])]}
                            color="#7c3aed"
                            icon={project.details.mobile ? <Smartphone className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                          />
                        </motion.div>
                      )}

                      {/* Database — Pops Bottom-Right */}
                      {project.details.database && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.8 }}
                          transition={{ type: "spring", damping: 15, delay: 0.1 }}
                          className="absolute -bottom-14 right-4 z-50"
                        >
                          <NodeChip
                            label="Database"
                            items={project.details.database}
                            color="#0891b2"
                            icon={<Database className="w-4 h-4" />}
                          />
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>

                {/* Main Card */}
                <motion.div
                  onClick={() => setExpandedProjectId(isExpanded ? null : index)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl p-7 cursor-pointer relative overflow-hidden group z-30"
                  style={{
                    background: "var(--color-background)",
                    boxShadow: isExpanded
                      ? `8px 8px 20px var(--color-shadow-dark), -8px -8px 20px var(--color-shadow-light), 0 0 28px rgba(37,99,235,0.12)`
                      : `6px 6px 16px var(--color-shadow-dark), -6px -6px 16px var(--color-shadow-light)`,
                    border: isExpanded ? "1px solid rgba(37,99,235,0.2)" : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Hover gradient sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] text-[var(--color-muted)] hidden sm:block shrink-0 ml-4 mt-1">
                        {project.date}
                      </span>
                    </div>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isExpanded ? "bg-[var(--color-primary)]" : "bg-[var(--color-muted)]"}`}
                        style={{ boxShadow: isExpanded ? "0 0 8px rgba(0,212,255,0.8)" : "none" }}
                      />
                      <span className="text-[10px] font-mono text-[var(--color-muted)] tracking-widest uppercase">
                        {isExpanded ? "architecture revealed" : "tap to inspect"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full rounded-2xl p-7 cursor-pointer relative overflow-hidden group flex flex-col items-center justify-center min-h-[200px]"
            style={{
              background: "var(--color-background)",
              boxShadow: "inset 4px 4px 12px var(--color-shadow-dark), inset -4px -4px 12px var(--color-shadow-light)",
              border: "1px dashed rgba(37,99,235,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <div className="w-12 h-12 neu-raised rounded-2xl flex items-center justify-center mb-4 group-hover:neu-glow-cyan transition-all text-[var(--color-muted)] group-hover:text-[var(--color-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <h3 className="text-base font-bold text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors mb-2">
              Waiting for your project...
            </h3>
            <p className="text-xs font-mono text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; Let&apos;s build something _
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
