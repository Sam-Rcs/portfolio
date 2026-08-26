"use client";

import { useReveal } from "@/hooks/useReveal";

const EXPERIENCE = [
  {
    company: "RCS Tec",
    role: "Full Stack Developer & Team Lead",
    duration: "Apr 2024 — Present",
    current: true,
    companyDesc: "Enterprise software development and digital transformation solutions.",
    scope: "Leading developer team, handling architecture, code reviews, and production deployments for banking, payments, and multi-module enterprise tools.",
    responsibilities: [
      "Led developer team in building the IG Tool multi-module enterprise platform (Invoicing, Asset Tracking, GRN)",
      "Engineered high-security payment processing platform (Amagi Payment System) with real-time WebSocket chat and live analytics",
      "Developed core banking approval workflows and RBAC security for NT Nation Trust Bank, Sri Lanka",
      "Built B2B procurement features for Zomato Hyperpure using Spring Boot and React",
      "Enhanced logistics asset tracking systems (AMS / SIMS) for DHL, fixing critical runtime bugs and performance bottlenecks",
      "Architected internal financial tracking and corporate expense approval module",
    ],
    impact: [
      "Delivered 6+ major enterprise systems with zero high-severity production defects",
      "Accelerated approval processing and workflow turnarounds across client organizations",
    ],
    systems: ["Amagi Payment System", "NT Nation Trust Bank", "IG Tool (Multi-Module)", "DHL (AMS/SIMS)", "Zomato Hyperpure", "Expense Module"],
  },
  {
    company: "Independent & Solo Developer",
    role: "Full-Stack & Mobile Software Engineer",
    duration: "2023 — Present",
    current: false,
    companyDesc: "Full-cycle independent software design, web development, and mobile application engineering.",
    scope: "100% single-handed ownership of full-fledged web and cross-platform mobile applications from DB design to live production deployment.",
    responsibilities: [
      "Single-handedly architected and developed CoachKonnets — a full-fledged web platform for coaching management, client scheduling, and interaction",
      "Built and deployed Live Hotel Management System software for real-time room reservations, front-desk check-in, and automated billing",
      "Architected multi-platform Warehouse & Godown Management Software available on Web, iOS, and Android mobile apps with barcode scanning",
    ],
    impact: [
      "100% solo execution from initial schema design to final server deployment",
      "Successfully launched live production applications operating on Web, iOS, and Android",
    ],
    systems: ["CoachKonnets Web App", "Live Hotel Management Software", "Godown Software (Web, iOS & Android)"],
  },
];

export default function ExperienceSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="experience" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">07 — Experience</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4">
            Career Progression
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            From implementation to ownership — each role expanding scope,
            responsibility, and business impact.
          </p>
        </div>

        <div className="relative pl-6 md:pl-8">
          {/* Timeline line */}
          <div className="timeline-line" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className={`relative reveal ${visible ? "visible" : ""} reveal-delay-${Math.min(i + 1, 4)}`}
              >
                {/* Timeline dot */}
                <div className={`timeline-dot ${!exp.current ? "!bg-[var(--color-border)]" : ""}`} />

                <div className="card p-6 md:p-8 ml-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-medium text-[var(--color-foreground)]">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[var(--color-status-green-muted)] rounded text-xs text-[var(--color-status-green)] font-mono">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-green)]" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--color-accent)] text-sm font-medium">
                        {exp.company}
                      </p>
                      <p className="text-xs text-[var(--color-foreground-muted)] mt-1">
                        {exp.companyDesc}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[var(--color-foreground-muted)] shrink-0">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Scope */}
                  <p className="text-sm text-[var(--color-foreground-secondary)] mb-4 italic">
                    {exp.scope}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-4">
                    <h4 className="font-mono text-[10px] tracking-widest text-[var(--color-foreground-muted)] uppercase mb-2">
                      Key Contributions
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((item, j) => (
                        <li
                          key={j}
                          className="text-sm text-[var(--color-foreground-secondary)] flex items-start gap-2"
                        >
                          <span className="text-[var(--color-foreground-muted)] shrink-0 mt-1 text-[10px]">
                            ▸
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact & Systems */}
                  <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-[var(--color-border)]">
                    <div className="flex-1">
                      <h4 className="font-mono text-[10px] tracking-widest text-[var(--color-accent)] uppercase mb-2">
                        Impact
                      </h4>
                      <ul className="space-y-1">
                        {exp.impact.map((item, j) => (
                          <li
                            key={j}
                            className="text-xs text-[var(--color-foreground-secondary)] flex items-start gap-1.5"
                          >
                            <span className="text-[var(--color-accent)] shrink-0">↗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono text-[10px] tracking-widest text-[var(--color-accent)] uppercase mb-2">
                        Systems Owned
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.systems.map((sys, j) => (
                          <span key={j} className="tag">
                            {sys}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
