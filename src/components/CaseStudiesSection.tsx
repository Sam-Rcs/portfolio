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
    title: "CoachKonnets — Full Coaching & Engagement Web Platform",
    subtitle: "Full-fledged web application designed, architected, and developed 100% independently (Solo Developer)",
    context:
      "A complete digital coaching and client management platform engineered to connect coaches with clients, manage scheduling, handle interactive sessions, and streamline client progress tracking without relying on expensive third-party SaaS subscriptions.",
    challenge:
      "Building the entire application single-handedly — from database schema design and RESTful API engineering to responsive frontend interfaces, real-time messaging, and secure authentication.",
    role: "Solo Architect & Full-Stack Developer (100% Ownership)",
    approach:
      "Evaluated modular full-stack architectures to allow seamless scaling. Designed intuitive user interfaces for both coaches and clients while crafting lightweight backend endpoints for session bookings.",
    architecture:
      "Decoupled Full-Stack Web Architecture (React + Node.js / Spring Boot + MySQL + WebSockets).",
    engineering:
      "Built custom authentication with JWT, interactive scheduling calendar, real-time client-coach messaging over WebSockets, automated email notifications, and progress analytics.",
    businessImpact: [
      "Built 100% independently without external developer costs or third-party platform dependencies",
      "Eliminated recurring monthly SaaS costs for coaching operations and client management",
      "Streamlined client onboarding and booking workflows into a single unified platform",
    ],
    technicalImpact: [
      "Architected clean, modular codebase with reusable React component system",
      "Achieved sub-100ms real-time chat latency using WebSocket persistent connections",
      "Optimized MySQL relational queries for instant scheduling lookup and calendar rendering",
    ],
    keyDecisions: [
      "Chose WebSockets over HTTP polling for real-time instant chat and notification delivery",
      "Implemented strict Role-Based Access Control (RBAC) separating Coach and Client features",
    ],
    stack: {
      Frontend: ["React", "JavaScript", "HTML5", "CSS3"],
      Backend: ["Node.js", "Express", "Spring Boot"],
      Database: ["MySQL"],
      Realtime: ["WebSockets"],
      Tools: ["Git", "REST APIs"],
    },
  },
  {
    id: "cs-2",
    number: "02",
    title: "Live Hotel Management System Software",
    subtitle: "Live production software managing hotel room reservations, guest check-in/checkout, and billing",
    context:
      "Hotels required an end-to-end management software to replace paper logs, automate room status tracking, streamline guest check-ins, and generate instant audit-compliant invoices.",
    challenge:
      "Preventing double-bookings under concurrent front-desk usage, handling complex billing logic across room rates, amenities, and taxes, and ensuring zero-downtime operational reliability.",
    role: "Lead Full-Stack Developer",
    approach:
      "Designed a real-time room availability matrix and built an intuitive point-of-sale checkout system that calculates room charges, extra amenities, and taxes automatically.",
    architecture:
      "Production Tiered Web Software (Spring Boot Backend + React Frontend + MySQL Database).",
    engineering:
      "Built interactive room grid showing real-time occupancy status, guest profile ledger, automated billing and invoice printing engine, and daily financial summary dashboards.",
    businessImpact: [
      "Currently live in production powering daily hotel operations and front-desk workflows",
      "Reduced guest check-in & checkout processing time by over 60%",
      "Completely eliminated double-booking errors and manual billing miscalculations",
    ],
    technicalImpact: [
      "Implemented transactional DB row locking during booking creation to guarantee data integrity",
      "Optimized query performance for historical guest stay and billing reporting",
      "Built responsive, high-contrast UI tailored for high-speed front-desk operations",
    ],
    keyDecisions: [
      "Designed modular cashier billing module capable of handling multiple payment split methods",
      "Separated operational staff permissions from manager accounting access via RBAC",
    ],
    stack: {
      Frontend: ["React", "HTML5/CSS3"],
      Backend: ["Java", "Spring Boot"],
      Database: ["MySQL"],
      Deployment: ["Live Server Hosting", "REST APIs"],
    },
  },
  {
    id: "cs-3",
    number: "03",
    title: "Warehouse & Godown Management Software (Web, iOS & Android)",
    subtitle: "Multi-platform inventory & godown tracking software available on Web, iOS, and Android",
    context:
      "Warehouse enterprises needed a multi-platform solution to track godown stock movements, Goods Receipt Notes (GRN), and inventory levels in real time across desktop supervisors and mobile warehouse staff.",
    challenge:
      "Building synchronized web and native mobile applications for iOS and Android that maintain precise godown stock counts even with patchy warehouse cellular connectivity.",
    role: "Cross-Platform Lead Developer",
    approach:
      "Architected shared RESTful API services consumed by both a React web admin dashboard and cross-platform React Native iOS and Android mobile apps.",
    architecture:
      "Cross-Platform System Architecture (Spring Boot REST APIs + React Web Admin + React Native iOS/Android Mobile Apps).",
    engineering:
      "Engineered mobile barcode scanning via device camera, real-time godown stock transfer ledger, low-stock automated alerts, and GRN verification flows.",
    businessImpact: [
      "Successfully launched across Web, iOS, and Android platforms",
      "Accelerated stock auditing speed and improved godown inventory accuracy by 75%",
      "Gave warehouse managers real-time visibility into stock levels anywhere via mobile apps",
    ],
    technicalImpact: [
      "Single API backend serving both web portal and mobile clients cleanly",
      "Built offline-first local queue on mobile devices for seamless data sync upon reconnection",
      "Optimized native mobile rendering on both iOS and Android platforms",
    ],
    keyDecisions: [
      "Utilized React Native for cross-platform iOS & Android mobile development",
      "Enforced atomic database transactions on godown stock transfers to prevent negative balances",
    ],
    stack: {
      Frontend: ["React", "React Native (iOS & Android)"],
      Backend: ["Spring Boot", "Node.js"],
      Database: ["MySQL"],
      Mobile: ["iOS", "Android", "Camera Barcode Scanner"],
    },
  },
  {
    id: "cs-4",
    number: "04",
    title: "Amagi Payment System",
    subtitle: "Enterprise payment platform with secure transactions, WebSocket real-time chat, and analytics",
    context:
      "Financial application requiring high-security transaction processing, real-time customer support chat, and real-time transaction analytics dashboards.",
    challenge:
      "Ensuring zero payment transaction loss while concurrently managing low-latency WebSocket connections for live support messaging.",
    role: "Full Stack Developer at RCS Tec",
    approach:
      "Implemented secure payment API gateway integration pipelines, WebSocket connection management hubs, and optimized database transaction logging.",
    architecture:
      "Event-Driven Micro-architecture with WebSocket Push & REST APIs.",
    engineering:
      "Built payment processing handlers, WebSocket live chat room, transaction audit logging, and real-time revenue analytics dashboard.",
    businessImpact: [
      "Handled thousands of payment transactions with zero security incidents",
      "Drastically improved customer query resolution time through real-time support chat",
      "Provided financial decision-makers with live transaction monitoring",
    ],
    technicalImpact: [
      "Achieved sub-50ms WebSocket message transmission speed",
      "Enforced strict payload validation and idempotency keys to prevent duplicate payments",
      "Reduced dashboard component re-renders by 40% with memoized state logic",
    ],
    keyDecisions: [
      "Chose WebSockets for persistent bi-directional chat communication",
      "Implemented DB indexing on transaction reference numbers for instant lookup",
    ],
    stack: {
      Frontend: ["React"],
      Backend: ["Spring Boot", "Node.js", "WebSockets"],
      Database: ["MySQL"],
      Tools: ["REST APIs", "Jira", "Git"],
    },
  },
  {
    id: "cs-5",
    number: "05",
    title: "NT Nation Trust Bank, Sri Lanka",
    subtitle: "Core banking modules with multi-tier approval workflows and Role-Based Access Control",
    context:
      "International banking institution needing modern banking modules with strict multi-step authorization, audit trails, and modern microservice architecture.",
    challenge:
      "Translating complex institutional banking approval rules into high-performance, fault-tolerant microservices complying with strict bank security standards.",
    role: "Full Stack Developer at RCS Tec",
    approach:
      "Re-engineered legacy banking workflows using Spring Boot microservices, fine-grained RBAC permission matrix, and clear RESTful interfaces.",
    architecture:
      "Secure Banking Microservices Architecture with Spring Security & Granular RBAC.",
    engineering:
      "Developed transaction approval workflows, multi-role user permission management, secure API endpoints, and banking transaction audit trail components.",
    businessImpact: [
      "Modernized banking workflow systems for major international bank in Sri Lanka",
      "Enhanced regulatory compliance through strict immutable audit logging",
      "Reduced approval routing turnaround time across bank departments",
    ],
    technicalImpact: [
      "Protected 50+ banking endpoints with fine-grained Spring Security RBAC",
      "Built decoupled Java Spring Boot microservices enabling zero-downtime updates",
      "Improved system throughput under high concurrent user transaction volume",
    ],
    keyDecisions: [
      "Implemented JWT security tokens with scoped permissions for bank employees",
      "Designed immutable database audit tables recording every approval action",
    ],
    stack: {
      Frontend: ["React"],
      Backend: ["Java", "Spring Boot", "Microservices"],
      Database: ["MySQL"],
      Security: ["RBAC", "JWT", "REST APIs"],
    },
  },
  {
    id: "cs-6",
    number: "06",
    title: "IG Tool (Multi-Module Enterprise System)",
    subtitle: "Multi-module operational suite combining Invoice, Asset Management, and Goods Receipt Notes (GRN)",
    context:
      "Enterprise management required a centralized multi-module portal to consolidate invoicing, internal asset lifecycle tracking, and GRN inventory processing.",
    challenge:
      "Leading a team of developers to architect and build interconnected modules while maintaining consistent code quality and seamless data flow across modules.",
    role: "Team Lead & Full Stack Developer at RCS Tec",
    approach:
      "Established modular architecture, assigned module ownership across developers, conducted thorough code reviews, and managed sprint delivery timelines.",
    architecture:
      "Multi-Module Service Architecture with Domain-Driven Interfaces.",
    engineering:
      "Architected automated invoice generation, asset lifecycle tracking, Goods Receipt Note (GRN) workflow module, dynamic PDF receipt generation, and team sprint oversight.",
    businessImpact: [
      "Led developer team to on-time project completion and successful production deployment",
      "Unified 3 separate business operations (Invoices, Assets, GRN) into 1 platform",
      "Increased operational staff efficiency by 50% through automated document generation",
    ],
    technicalImpact: [
      "Standardized API contracts across developer team members",
      "Maintained 95%+ code review coverage ensuring zero high-severity production bugs",
      "Optimized complex SQL join queries across multi-module tables for report generation",
    ],
    keyDecisions: [
      "Divided application into independent domain modules for parallel development",
      "Created shared reusable UI component library used across all 3 modules",
    ],
    stack: {
      Frontend: ["React"],
      Backend: ["Spring Boot", "Node.js"],
      Database: ["MySQL"],
      Management: ["Jira", "Git", "Code Reviews"],
    },
  },
  {
    id: "cs-7",
    number: "07",
    title: "DHL Asset & Information Systems (AMS / SIMS)",
    subtitle: "Global logistics asset management enhancement and critical issue remediation",
    context:
      "DHL's Asset Management System (AMS) and System Information Management System (SIMS) required performance enhancements, feature upgrades, and critical bug fixes.",
    challenge:
      "Navigating and debugging a massive enterprise logistics codebase without interrupting live global asset tracking operations.",
    role: "Full Stack Engineer at RCS Tec",
    approach:
      "Conducted systemic log analysis, isolated memory leaks and data sync edge-cases, and refactored core asset tracking routines.",
    architecture:
      "Enterprise Distributed Asset Tracking System.",
    engineering:
      "Enhanced asset status tracking modules, fixed critical data logging issues in SIMS, optimized reporting queries, and patched security vulnerabilities.",
    businessImpact: [
      "Fixed critical issues in global asset management systems for DHL logistics",
      "Prevented tracking delays across logistics operations by stabilizing system logs",
      "Improved reliability and user satisfaction for DHL operations personnel",
    ],
    technicalImpact: [
      "Resolved background batch job memory leaks improving server stability",
      "Accelerated asset lookup query response times by indexing key fields",
      "Strengthened error handling around external device pings and asset logs",
    ],
    keyDecisions: [
      "Added defensive input validation for asset telemetry data",
      "Refactored legacy report generator to use chunked memory processing",
    ],
    stack: {
      Backend: ["Java", "Spring Boot"],
      Frontend: ["React"],
      Database: ["MySQL"],
      Tools: ["Git", "Jira"],
    },
  },
  {
    id: "cs-8",
    number: "08",
    title: "Zomato Hyperpure Procurement System",
    subtitle: "B2B ingredient procurement & supplier order management features",
    context:
      "Zomato Hyperpure needed high-speed procurement features allowing commercial kitchens and restaurants to order raw ingredients and manage supplier fulfillment.",
    challenge:
      "Handling dynamic pricing, real-time stock availability checks, and multi-item bulk order processing smoothly.",
    role: "Full Stack Developer at RCS Tec",
    approach:
      "Built dynamic frontend procurement flows paired with robust Spring Boot backend services for quick cart updates and stock validation.",
    architecture:
      "High-Throughput E-Commerce & Supply Chain Architecture.",
    engineering:
      "Developed bulk procurement cart features, dynamic supplier catalog search, stock validation checks, price calculators, and order confirmation flows.",
    businessImpact: [
      "Streamlined B2B food supply procurement for commercial kitchens and partners",
      "Reduced order entry errors via automated stock and price validation",
      "Improved order placement speed for high-volume recurring restaurant buyers",
    ],
    technicalImpact: [
      "Implemented batch REST APIs for fast multi-item cart updates",
      "Optimized supplier catalog filtering with client-side state caching",
      "Ensured database transactional integrity during simultaneous bulk order placements",
    ],
    keyDecisions: [
      "Used React state management for seamless bulk quantity edits without page reloads",
      "Designed clear API boundaries between procurement, pricing, and stock services",
    ],
    stack: {
      Frontend: ["React"],
      Backend: ["Spring Boot", "Java"],
      Database: ["MySQL", "MongoDB"],
      Tools: ["REST APIs", "Git"],
    },
  },
  {
    id: "cs-9",
    number: "09",
    title: "Enterprise Expense Module & Financial Tracker",
    subtitle: "Internal financial tracking module for corporate expense allocation and approval routing",
    context:
      "Organization required a custom financial expense module to track internal expenditures, streamline manager approvals, and provide spending analytics.",
    challenge:
      "Implementing flexible multi-level approval hierarchies and clear visual budget dashboards.",
    role: "Full Stack Developer at RCS Tec",
    approach:
      "Built claim submission forms, automated approval routing state machines, and visual financial analytics dashboards.",
    architecture:
      "Financial Tracking & Approval Workflow Module.",
    engineering:
      "Engineered expense claim submission, document receipt uploaders, manager approval state machine, and budget breakdown analytics charts.",
    businessImpact: [
      "Automated internal financial expense claim processing across departments",
      "Shortened expense reimbursement approval turnaround time from weeks to days",
      "Provided leadership with real-time department spending visibility",
    ],
    technicalImpact: [
      "Built file uploader supporting receipt image compression and storage",
      "Implemented state-machine workflow guaranteeing valid expense state transitions",
      "Created responsive financial overview charts with instant data updates",
    ],
    keyDecisions: [
      "Enforced explicit backend validation rules on spending limits per expense category",
      "Designed automated email and notification triggers for pending approval actions",
    ],
    stack: {
      Frontend: ["React"],
      Backend: ["Spring Boot", "Node.js"],
      Database: ["MySQL"],
      Tools: ["REST APIs", "Git"],
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
