import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[var(--color-primary)] selection:text-black">
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
