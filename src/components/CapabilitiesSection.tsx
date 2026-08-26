"use client";

import { useReveal } from "@/hooks/useReveal";

const CAPABILITIES = [
  {
    title: "Full-Stack Web Development",
    outcome: "End-to-end web product delivery from UI to database",
    items: [
      "Responsive frontend architecture with React & Next.js",
      "Scalable backend APIs using Spring Boot & Node.js",
      "Relational & document databases (MySQL & MongoDB)",
      "Real-time WebSocket chat & live dashboard features",
    ],
    techs: ["React", "Spring Boot", "Node.js", "MySQL", "WebSockets"],
  },
  {
    title: "Cross-Platform Mobile Apps",
    outcome: "Native mobile solutions for iOS and Android",
    items: [
      "Cross-platform mobile apps with React Native",
      "Warehouse barcode camera scanning integration",
      "Real-time data sync with backend web services",
      "Responsive UX for mobile warehouse & field staff",
    ],
    techs: ["React Native", "iOS", "Android", "REST APIs"],
  },
  {
    title: "Enterprise Banking & Security",
    outcome: "Applications built with banking-grade security defaults",
    items: [
      "Multi-tier approval workflows & state machines",
      "Fine-grained Role-Based Access Control (RBAC)",
      "Secure payment processing gateway integration",
      "Immutable transaction audit logging",
    ],
    techs: ["Spring Security", "RBAC", "JWT", "Audit Trail"],
  },
  {
    title: "Multi-Module Enterprise Systems",
    outcome: "Modular software suites for operational scale",
    items: [
      "Invoicing & GRN stock module development",
      "Asset lifecycle management systems",
      "Domain-driven multi-module architecture",
      "Dynamic PDF generation & export engines",
    ],
    techs: ["Multi-Module Architecture", "Spring Boot", "React"],
  },
  {
    title: "Live Production SaaS Solutions",
    outcome: "Software that runs reliably in production environments",
    items: [
      "Full-fledged solo web app delivery (CoachKonnets)",
      "Live Hotel Management System with instant billing",
      "High concurrency database locks for inventory",
      "Zero-downtime microservice deployments",
    ],
    techs: ["CoachKonnets", "Hotel SaaS", "Godown Software"],
  },
  {
    title: "Team Leadership & Quality",
    outcome: "Engineering delivery managed with high technical standards",
    items: [
      "Leading developer teams at RCS Tec",
      "Conducting code reviews & technical mentoring",
      "Enforcing clean code & security standards",
      "Agile sprint execution using Git and Jira",
    ],
    techs: ["Team Leadership", "Code Reviews", "Jira", "Git"],
  },
];

export default function CapabilitiesSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="capabilities" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">05 — Engineering Capabilities</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4 max-w-2xl">
            Capabilities organized by{" "}
            <span className="text-[var(--color-accent)]">outcomes.</span>
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            Not a list of buzzwords. Each capability maps to a category of
            problems I can solve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              className={`reveal ${visible ? "visible" : ""} reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="card p-6 h-full flex flex-col group">
                <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs text-[var(--color-accent)] font-mono mb-4">
                  {cap.outcome}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--color-foreground-secondary)] flex items-start gap-2"
                    >
                      <span className="text-[var(--color-foreground-muted)] mt-1 shrink-0 text-[10px]">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {cap.techs.map((tech, j) => (
                      <span key={j} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
