import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sameer Khan — Senior Full-Stack Engineer × IT Business Strategist",
  description:
    "Engineering scalable systems where business strategy meets software. Full-stack engineer specializing in enterprise applications, system architecture, and business-driven technology solutions.",
  keywords: [
    "Senior Full-Stack Engineer",
    "IT Business Strategist",
    "Solution Architect",
    "Enterprise Software",
    "System Architecture",
    "Full-Stack Developer",
    "Technical Consultant",
  ],
  authors: [{ name: "Sameer Khan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sameer Khan — Senior Full-Stack Engineer × IT Business Strategist",
    description:
      "Engineering scalable systems where business strategy meets software.",
    siteName: "Sameer Khan — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Khan — Senior Full-Stack Engineer × IT Business Strategist",
    description:
      "Engineering scalable systems where business strategy meets software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
