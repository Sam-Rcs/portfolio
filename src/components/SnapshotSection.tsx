"use client";

import { useReveal } from "@/hooks/useReveal";

export default function SnapshotSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="snapshot" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">01 — Professional Snapshot</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mt-8">
          {/* Left — Statement */}
          <div className={`md:col-span-5 reveal ${visible ? "visible" : ""} reveal-delay-1`}>
            <h2 className="text-[var(--color-foreground)] mb-6">
              Engineering systems that solve{" "}
              <span className="text-[var(--color-accent)]">
                business problems.
              </span>
            </h2>
            <div className="w-12 h-px bg-[var(--color-accent)] mb-6" />
            <p className="text-[var(--color-foreground-secondary)] text-lg leading-relaxed">
              I&apos;m a senior full-stack engineer who operates at the
              intersection of software engineering and business strategy.
              I don&apos;t just build features — I analyze problems, architect
              solutions, and deliver systems that drive operational outcomes.
            </p>
          </div>

          {/* Right — Key Dimensions */}
          <div className={`md:col-span-7 reveal ${visible ? "visible" : ""} reveal-delay-2`}>
            <div className="grid gap-6">
              {[
                {
                  marker: "01",
                  title: "Technical Depth",
                  desc: "Full-stack engineering across frontend architectures, backend services, databases, APIs, and cloud infrastructure. I build production systems, not prototypes.",
                },
                {
                  marker: "02",
                  title: "System Thinking",
                  desc: "Every component exists within a larger system. I design with dependencies, scalability, security, and maintainability in mind — not in isolation.",
                },
                {
                  marker: "03",
                  title: "Business Acumen",
                  desc: "I translate stakeholder requirements into technical specifications, map business processes to software workflows, and measure engineering decisions by their business impact.",
                },
              ].map((item) => (
                <div key={item.marker} className="card p-6 group">
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-[var(--color-accent)] mt-1 shrink-0">
                      {item.marker}
                    </span>
                    <div>
                      <h3 className="text-[var(--color-foreground)] text-lg font-medium mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--color-foreground-secondary)] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
