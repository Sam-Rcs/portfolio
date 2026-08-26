"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "snapshot", label: "About" },
  { id: "intersection", label: "Approach" },
  { id: "case-studies", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0B0B0A]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="section-container flex items-center justify-between h-16 md:h-18">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
            aria-label="Scroll to top"
          >
            <div className="w-8 h-8 border border-[var(--color-accent)] rounded flex items-center justify-center">
              <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                SK
              </span>
            </div>
            <span
              className={`font-mono text-xs tracking-widest text-[var(--color-foreground-secondary)] transition-colors group-hover:text-[var(--color-foreground)] hidden sm:inline ${
                scrolled ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            >
              Sameer Khan
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 text-xs tracking-wide transition-colors duration-200 rounded ${
                  activeSection === item.id
                    ? "text-[var(--color-accent)] bg-[var(--color-surface)]"
                    : "text-[var(--color-foreground-secondary)] hover:text-[var(--color-foreground)]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-4 bg-[var(--color-border)] mx-2" />
            <a href="#contact" className="btn-primary !py-1.5 !px-4 !text-xs">
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-px bg-[var(--color-foreground)] transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-[var(--color-foreground)] transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-[var(--color-foreground)] transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay md:hidden flex flex-col items-center justify-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-lg tracking-wide transition-colors ${
                activeSection === item.id
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-foreground-secondary)]"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4"
          >
            Let&apos;s Talk
          </a>
        </div>
      )}
    </>
  );
}
