"use client";

import { useReveal } from "@/hooks/useReveal";

const ARCH_CONCEPTS = [
  {
    label: "API Design",
    desc: "RESTful and GraphQL APIs with versioning, rate limiting, and documentation",
  },
  {
    label: "Database Architecture",
    desc: "Schema design, query optimization, migrations, and data modeling",
  },
  {
    label: "Auth & Authorization",
    desc: "RBAC, JWT, OAuth, session management, and security hardening",
  },
  {
    label: "Enterprise Integrations",
    desc: "Third-party APIs, webhooks, ERP/CRM connectors, and data sync",
  },
  {
    label: "Workflow Systems",
    desc: "Approval flows, state machines, notification engines, and task queues",
  },
  {
    label: "Performance",
    desc: "Caching strategies, lazy loading, CDN, query optimization, and profiling",
  },
  {
    label: "Scalability",
    desc: "Horizontal scaling, load balancing, database sharding, and microservices",
  },
  {
    label: "Observability",
    desc: "Logging, monitoring, alerting, tracing, and error tracking",
  },
  {
    label: "Security",
    desc: "Input validation, CORS, CSP, vulnerability scanning, and encryption",
  },
  {
    label: "CI/CD",
    desc: "Automated testing, staging environments, blue-green deployments, and rollbacks",
  },
];

export default function ArchitectureSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="architecture" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">04 — Architecture & System Thinking</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4 max-w-2xl">
            I understand{" "}
            <span className="text-[var(--color-accent)]">systems</span>, not
            just components.
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            Senior engineering means thinking about the full picture —
            how components interact, where failure points exist, and what
            scales.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className={`reveal ${visible ? "visible" : ""} reveal-delay-1 mb-16`}>
          <div className="relative p-6 md:p-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            {/* Layer: Client */}
            <div className="arch-layer mb-4">
              <span className="arch-layer-label">Client Layer</span>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Web App", "Mobile App", "Admin Dashboard", "Third-Party"].map((item) => (
                  <div key={item} className="px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded text-xs text-[var(--color-foreground-secondary)] font-mono">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center my-2">
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-[var(--color-accent)]" />
                <div className="font-mono text-[10px] text-[var(--color-accent)] px-2 py-0.5 border border-[var(--color-accent)] rounded bg-[var(--color-background)]">
                  API Gateway / Load Balancer
                </div>
                <div className="w-px h-4 bg-[var(--color-accent)]" />
              </div>
            </div>

            {/* Layer: Services */}
            <div className="arch-layer mb-4">
              <span className="arch-layer-label">Service Layer</span>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Auth Service", "Business Logic", "Workflow Engine", "Notification Service", "Integration Hub"].map((item) => (
                  <div key={item} className="px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded text-xs text-[var(--color-foreground-secondary)] font-mono">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center my-2">
              <div className="w-px h-6 bg-[var(--color-border)]" />
            </div>

            {/* Layer: Data */}
            <div className="arch-layer">
              <span className="arch-layer-label">Data Layer</span>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Primary DB", "Cache Layer", "File Storage", "Message Queue", "Search Index"].map((item) => (
                  <div key={item} className="px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded text-xs text-[var(--color-foreground-secondary)] font-mono">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Concepts Grid */}
        <div className={`reveal ${visible ? "visible" : ""} reveal-delay-2`}>
          <h3 className="font-mono text-xs tracking-widest text-[var(--color-foreground-muted)] uppercase mb-6">
            System-level competencies
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ARCH_CONCEPTS.map((concept) => (
              <div
                key={concept.label}
                className="card p-4 group"
              >
                <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors">
                  {concept.label}
                </h4>
                <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                  {concept.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
