import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import EasterEggs from "@/components/EasterEggs";
import FloatingNav from "@/components/FloatingNav";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sameer Khan | Full Stack Developer",
  description: "Portfolio of Sameer Khan — Full Stack Developer specializing in scalable systems, real-time architecture, and modern web applications.",
  openGraph: {
    title: "Sameer Khan | Full Stack Developer",
    description: "Full Stack Developer specializing in scalable systems and modern architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased cursor-none`}>
        <CustomCursor />
        <EasterEggs />
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
