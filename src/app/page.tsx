import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/about/AboutSection";
import SkillsSection from "@/components/sections/skills/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <CustomCursor />
      
      <HeroSection />
      
      <AboutSection />
      
      <SkillsSection />
      
      <ProjectsSection />
    </div>
  );
}
