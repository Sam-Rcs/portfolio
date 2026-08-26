"use client";

import { useReveal } from "@/hooks/useReveal";

const EXPERIENCE = [
  {
    company: "[COMPANY NAME]",
    role: "[YOUR TITLE — e.g., Senior Full-Stack Engineer]",
    duration: "[START DATE] — Present",
    current: true,
    companyDesc: "[What does this company do? — 1 line]",
    scope: "[Your scope — e.g., Led full-stack development for the enterprise platform team]",
    responsibilities: [
      "[KEY RESPONSIBILITY — e.g., Owned end-to-end development of the approval workflow system]",
      "[KEY RESPONSIBILITY — e.g., Designed and implemented RESTful APIs serving 50+ endpoints]",
      "[KEY RESPONSIBILITY — e.g., Collaborated with product and business stakeholders on requirements]",
      "[KEY RESPONSIBILITY]",
    ],
    impact: [
      "[IMPACT — e.g., Reduced manual processing time by X%]",
      "[IMPACT — e.g., Improved system reliability from X% to Y% uptime]",
    ],
    systems: ["[SYSTEM/FEATURE OWNED]", "[SYSTEM/FEATURE OWNED]"],
  },
  {
    company: "[COMPANY NAME]",
    role: "[YOUR TITLE — e.g., Full-Stack Developer]",
    duration: "[START DATE] — [END DATE]",
    current: false,
    companyDesc: "[What does this company do?]",
    scope: "[Your scope]",
    responsibilities: [
      "[KEY RESPONSIBILITY]",
      "[KEY RESPONSIBILITY]",
      "[KEY RESPONSIBILITY]",
    ],
    impact: ["[IMPACT]", "[IMPACT]"],
    systems: ["[SYSTEM/FEATURE OWNED]"],
  },
  {
    company: "[COMPANY NAME]",
    role: "[YOUR TITLE — e.g., Software Engineer]",
    duration: "[START DATE] — [END DATE]",
    current: false,
    companyDesc: "[What does this company do?]",
    scope: "[Your scope]",
    responsibilities: [
      "[KEY RESPONSIBILITY]",
      "[KEY RESPONSIBILITY]",
    ],
    impact: ["[IMPACT]"],
    systems: ["[SYSTEM/FEATURE OWNED]"],
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
