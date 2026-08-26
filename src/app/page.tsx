import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SnapshotSection from "@/components/SnapshotSection";
import IntersectionSection from "@/components/IntersectionSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navigation />
      <HeroSection />
      <SnapshotSection />
      <IntersectionSection />
      <CaseStudiesSection />
      <ArchitectureSection />
      <CapabilitiesSection />
      <TechStackSection />
      <ExperienceSection />
      <PhilosophySection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
