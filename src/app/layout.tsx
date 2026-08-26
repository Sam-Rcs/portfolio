import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import EasterEggs from "@/components/EasterEggs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sameer Khan | Full Stack Developer",
  description: "Futuristic portfolio of Sameer Khan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased cursor-none`}>
        <CustomCursor />
        <EasterEggs />
        {children}
      </body>
    </html>
  );
}
