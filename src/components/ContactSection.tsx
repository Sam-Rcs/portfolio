"use client";

import { useReveal } from "@/hooks/useReveal";

export default function ContactSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container" ref={ref}>
        <div className="max-w-2xl mx-auto text-center">
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <span className="section-number">11 — Contact</span>
            <h2 className="text-[var(--color-foreground)] mt-4 mb-6">
              Let&apos;s solve a{" "}
              <span className="text-[var(--color-accent)]">
                complex problem
              </span>{" "}
              together.
            </h2>
            <p className="text-[var(--color-foreground-secondary)] text-lg mb-12 max-w-lg mx-auto">
              If you&apos;re building enterprise systems, scaling engineering
              teams, or solving business-critical technical challenges —
              I&apos;d like to hear about it.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 reveal ${visible ? "visible" : ""} reveal-delay-1`}>
            <a
              href="mailto:[YOUR EMAIL]"
              className="btn-primary justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Send an Email
            </a>
            <a
              href="[YOUR RESUME/CV LINK]"
              className="btn-secondary justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              Download Resume
            </a>
          </div>

          {/* Links */}
          <div className={`reveal ${visible ? "visible" : ""} reveal-delay-2`}>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  label: "Email",
                  value: "[YOUR EMAIL]",
                  href: "mailto:[YOUR EMAIL]",
                  icon: "✉",
                },
                {
                  label: "LinkedIn",
                  value: "[YOUR LINKEDIN]",
                  href: "[YOUR LINKEDIN URL]",
                  icon: "in",
                },
                {
                  label: "GitHub",
                  value: "[YOUR GITHUB]",
                  href: "[YOUR GITHUB URL]",
                  icon: "</>",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-center"
                >
                  <span className="block font-mono text-xs text-[var(--color-foreground-muted)] mb-1">
                    {link.label}
                  </span>
                  <span className="text-sm text-[var(--color-foreground-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className={`mt-12 reveal ${visible ? "visible" : ""} reveal-delay-3`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="status-dot" />
              <span className="font-mono text-xs text-[var(--color-foreground-secondary)]">
                Open to senior engineering & consulting roles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
