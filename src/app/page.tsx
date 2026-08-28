import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen font-sans transition-colors duration-500">
      <HeroSection />
      <AboutSection />
      <ArchitectureSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
    </main>
  );
}
