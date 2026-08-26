"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface CaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  context: string;
  challenge: string;
  role: string;
  approach: string;
  architecture: string;
  engineering: string;
  businessImpact: string[];
  technicalImpact: string[];
  keyDecisions: string[];
  stack: Record<string, string[]>;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    number: "01",
    title: "[PROJECT NAME]",
    subtitle: "[One-line description of the business system]",
    context:
      "[Describe the business/product problem. What was the organization trying to solve? Why did it matter?]",
    challenge:
      "[What made this technically or operationally difficult? Legacy systems? Scale? Complex requirements? Tight deadlines?]",
    role: "[What did you personally own? Architecture? Full-stack development? Stakeholder communication? Team leadership?]",
    approach:
      "[How did you analyze the problem? What trade-offs did you evaluate? What research or discovery was involved?]",
    architecture:
      "[How was the system designed? Microservices? Monolith? Event-driven? What were the key architectural patterns?]",
    engineering:
      "[What did you actually build? Key features, integrations, workflows, APIs, data models, etc.]",
    businessImpact: [
      "[ADD BUSINESS IMPACT — e.g., Reduced manual processing time by X%]",
      "[ADD BUSINESS IMPACT — e.g., Enabled N new business workflows]",
      "[ADD BUSINESS IMPACT]",
    ],
    technicalImpact: [
      "[ADD TECHNICAL IMPACT — e.g., Improved API response time from Xms to Yms]",
      "[ADD TECHNICAL IMPACT — e.g., Reduced deployment time from X to Y]",
      "[ADD TECHNICAL IMPACT]",
    ],
    keyDecisions: [
      "[ADD KEY DECISION — e.g., Chose PostgreSQL over MongoDB for X reason]",
      "[ADD KEY DECISION — e.g., Implemented CQRS pattern because...]",
    ],
    stack: {
      Frontend: ["[ADD TECHNOLOGY]", "[ADD TECHNOLOGY]"],
      Backend: ["[ADD TECHNOLOGY]", "[ADD TECHNOLOGY]"],
      Database: ["[ADD TECHNOLOGY]"],
      Cloud: ["[ADD TECHNOLOGY]"],
      DevOps: ["[ADD TECHNOLOGY]"],
    },
  },
  {
    id: "cs-2",
    number: "02",
    title: "[PROJECT NAME]",
    subtitle: "[One-line description of the business system]",
    context:
      "[Describe the business/product problem. What was the organization trying to solve?]",
    challenge:
      "[What made this technically or operationally difficult?]",
    role: "[What did you personally own?]",
    approach:
      "[How did you analyze and solve the problem?]",
    architecture:
      "[How was the system designed?]",
    engineering:
      "[What did you build?]",
    businessImpact: [
      "[ADD BUSINESS IMPACT]",
      "[ADD BUSINESS IMPACT]",
    ],
    technicalImpact: [
      "[ADD TECHNICAL IMPACT]",
      "[ADD TECHNICAL IMPACT]",
    ],
    keyDecisions: [
      "[ADD KEY DECISION]",
      "[ADD KEY DECISION]",
    ],
    stack: {
      Frontend: ["[ADD TECHNOLOGY]"],
      Backend: ["[ADD TECHNOLOGY]"],
      Database: ["[ADD TECHNOLOGY]"],
      Cloud: ["[ADD TECHNOLOGY]"],
    },
  },
  {
    id: "cs-3",
    number: "03",
    title: "[PROJECT NAME]",
    subtitle: "[One-line description of the business system]",
    context: "[Describe the business/product problem.]",
    challenge: "[What made this difficult?]",
    role: "[What did you own?]",
    approach: "[How did you solve it?]",
    architecture: "[System design overview.]",
    engineering: "[What was built?]",
    businessImpact: ["[ADD BUSINESS IMPACT]", "[ADD BUSINESS IMPACT]"],
    technicalImpact: ["[ADD TECHNICAL IMPACT]", "[ADD TECHNICAL IMPACT]"],
    keyDecisions: ["[ADD KEY DECISION]"],
    stack: {
      Frontend: ["[ADD TECHNOLOGY]"],
      Backend: ["[ADD TECHNOLOGY]"],
      Database: ["[ADD TECHNOLOGY]"],
    },
  },
];

export default function CaseStudiesSection() {
  const [ref, visible] = useReveal();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleCase = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section id="case-studies" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <span className="section-number">03 — Selected Work</span>
          <h2 className="text-[var(--color-foreground)] mt-4 mb-4">
            Case Studies
          </h2>
          <p className="text-[var(--color-foreground-secondary)] max-w-xl text-lg mb-16">
            Projects structured as business and engineering narratives — not
            just code demos.
          </p>
        </div>

        <div className="space-y-4">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className={`reveal ${visible ? "visible" : ""} reveal-delay-1`}
            >
              <div
                className={`card overflow-hidden transition-all duration-500 ${
                  expanded === cs.id
                    ? "border-[var(--color-accent-dark)]"
                    : ""
                }`}
              >
                {/* Header — always visible */}
                <button
                  onClick={() => toggleCase(cs.id)}
                  className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4"
                  aria-expanded={expanded === cs.id}
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <span className="font-mono text-sm text-[var(--color-accent)] mt-1 shrink-0">
                      {cs.number}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl text-[var(--color-foreground)] font-medium">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-[var(--color-foreground-secondary)] mt-1">
                        {cs.subtitle}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-transform duration-300 ${
                      expanded === cs.id ? "rotate-45" : ""
                    }`}
                  >
                    <span className="text-[var(--color-foreground-secondary)] text-lg leading-none">
                      +
                    </span>
                  </div>
                </button>

                {/* Expanded content */}
                {expanded === cs.id && (
                  <div className="px-6 md:px-8 pb-8 animate-fade-in">
                    <div className="border-t border-[var(--color-border)] pt-8">
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Context */}
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Context
                          </h4>
                          <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                            {cs.context}
                          </p>
                        </div>
                        {/* Challenge */}
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Challenge
                          </h4>
                          <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                            {cs.challenge}
                          </p>
                        </div>
                        {/* My Role */}
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            My Role
                          </h4>
                          <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                            {cs.role}
                          </p>
                        </div>
                        {/* Approach */}
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Approach
                          </h4>
                          <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                            {cs.approach}
                          </p>
                        </div>
                      </div>

                      {/* Architecture & Engineering */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Architecture
                          </h4>
                          <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                            {cs.architecture}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Engineering
                          </h4>
                          <p className="text-sm text-[var(--color-foreground-secondary)] leading-relaxed">
                            {cs.engineering}
                          </p>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Business Impact
                          </h4>
                          <ul className="space-y-2">
                            {cs.businessImpact.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-[var(--color-foreground-secondary)] flex items-start gap-2"
                              >
                                <span className="text-[var(--color-accent)] mt-0.5 shrink-0">
                                  ↗
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                            Technical Impact
                          </h4>
                          <ul className="space-y-2">
                            {cs.technicalImpact.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-[var(--color-foreground-secondary)] flex items-start gap-2"
                              >
                                <span className="text-[var(--color-accent)] mt-0.5 shrink-0">
                                  ⚡
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Key Decisions */}
                      <div className="mb-8">
                        <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                          Key Decisions
                        </h4>
                        <ul className="space-y-2">
                          {cs.keyDecisions.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-[var(--color-foreground-secondary)] flex items-start gap-2"
                            >
                              <span className="text-[var(--color-foreground-muted)] shrink-0">
                                →
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stack */}
                      <div>
                        <h4 className="font-mono text-xs tracking-widest text-[var(--color-accent)] uppercase mb-3">
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                          {Object.entries(cs.stack).map(([category, techs]) => (
                            <div key={category}>
                              <p className="font-mono text-xs text-[var(--color-foreground-muted)] mb-1.5">
                                {category}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {techs.map((tech, i) => (
                                  <span key={i} className="tag">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
