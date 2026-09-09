"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import AppleScrollShowcase from "@/components/other-side/AppleScrollShowcase";
import AppleBento from "@/components/other-side/AppleBento";
import AppleShowcase from "@/components/other-side/AppleShowcase";

export default function OtherSidePage() {
  return (
    <div
      className="min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Apple Frosted Glass Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-3.5 flex items-center justify-between border-b border-white/[0.08] bg-[#000000]/85 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#f5f5f7] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Standard Portfolio</span>
          </Link>
          <span className="text-[#424245]">|</span>
          <span className="text-xs font-semibold text-[#f5f5f7] tracking-tight">
            Sameer Khan &bull; ProMotion 3D Experience
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full bg-[#1d1d1f] hover:bg-[#2d2d2f] text-xs font-medium text-[#f5f5f7] transition-all border border-white/10"
          >
            Exit to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Instant Scroll-Driven 3D Device Hero Experience */}
        <AppleScrollShowcase />

        {/* Apple Interactive Bento Grid */}
        <AppleBento />

        {/* Selected Works Showcase */}
        <AppleShowcase />
      </main>

      {/* Apple-Style Minimal Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-[#000000] text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7]">
            Return to standard portfolio.
          </h4>
          <p className="text-sm text-[#86868b] leading-relaxed">
            Clean, structured, and easy to review for recruiters.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f5f5f7] text-[#000000] font-medium text-sm hover:bg-white transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Return to Main Portfolio</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
