"use client";

import { useReveal } from "@/hooks/useReveal";

const FLOW_STEPS = [
  {
    label: "Business Problem",
    desc: "Identify pain points, inefficiencies, and objectives",
    icon: "◇",
  },
  {
    label: "Requirement Analysis",
    desc: "Define scope, constraints, and success criteria",
    icon: "◈",
  },
  {
    label: "Solution Architecture",
    desc: "Design scalable, maintainable system blueprints",
    icon: "⬡",
  },
  {
    label: "Engineering",
    desc: "Build robust, production-grade software",
    icon: "⬢",
  },
  {
    label: "Automation & Optimization",
    desc: "Eliminate manual work, improve performance",
    icon: "◉",
  },
  {
    label: "Business Outcome",
    desc: "Deliver measurable impact and continuous improvement",
    icon: "✦",
  },
];

const DOMAINS = [
  {
    title: "Business Strategy",
    items: [
      "Requirement analysis",
      "Process mapping",
      "Stakeholder alignment",
      "Feasibility assessment",
    ],
  },
  {
    title: "Product Thinking",
    items: [
      "User workflows",
      "Feature prioritization",
      "MVP definition",
      "Outcome-driven design",
    ],
  },
  {
    title: "Software Engineering",
    items: [
      "Full-stack development",
      "API design",
      "Database architecture",
      "Testing strategy",
    ],
  },
  {
    title: "System Architecture",
    items: [
      "Scalable design",
      "Integration patterns",
      "Security architecture",
      "Performance optimization",
    ],
  },
  {
    title: "Process Optimization",
    items: [
      "Workflow automation",
      "Operational efficiency",
      "CI/CD pipelines",
      "Cost reduction",
    ],
  },
];

export default function IntersectionSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="intersection" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">
            02 — Business × Technology
          </span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4 max-w-2xl">
            Where strategy meets{" "}
            <span className="text-[var(--color-accent)]">engineering.</span>
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            I operate across the full spectrum from business problem to
            deployed solution — owning the journey, not just a segment.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className={`reveal ${visible ? "visible" : ""} reveal-delay-1`}>
          <div className="relative">
            {/* Desktop: Horizontal flow */}
            <div className="hidden lg:grid grid-cols-6 gap-0">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.label} className="relative">
                  <div className="flow-node text-center mx-1">
                    <span className="text-2xl mb-3 block text-[var(--color-accent)]">
                      {step.icon}
                    </span>
                    <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-1">
                      {step.label}
                    </h4>
                    <p className="text-xs text-[var(--color-foreground-muted)] leading-snug">
                      {step.desc}
                    </p>
                  </div>
                  {/* Connector arrow */}
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="absolute top-1/2 -right-0.5 w-2 h-px bg-[var(--color-accent)] z-10">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-[var(--color-accent)]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile/Tablet: Vertical flow */}
            <div className="lg:hidden flex flex-col items-center gap-0">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.label} className="w-full max-w-md">
                  <div className="flow-node text-center">
                    <span className="text-xl mb-2 block text-[var(--color-accent)]">
                      {step.icon}
                    </span>
                    <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-1">
                      {step.label}
                    </h4>
                    <p className="text-xs text-[var(--color-foreground-muted)]">
                      {step.desc}
                    </p>
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="flow-connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Domains */}
        <div className={`mt-20 reveal ${visible ? "visible" : ""} reveal-delay-2`}>
          <h3 className="font-mono text-xs tracking-widest text-[var(--color-foreground-muted)] uppercase mb-8">
            Operating across five domains
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DOMAINS.map((domain) => (
              <div key={domain.title} className="card p-5 group">
                <h4 className="text-sm font-medium text-[var(--color-accent)] mb-3">
                  {domain.title}
                </h4>
                <ul className="space-y-1.5">
                  {domain.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-[var(--color-foreground-secondary)] flex items-start gap-2"
                    >
                      <span className="text-[var(--color-foreground-muted)] mt-0.5 shrink-0">
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
