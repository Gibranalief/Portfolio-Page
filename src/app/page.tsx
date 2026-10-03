import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/about/AboutSection";
import SkillsSection from "@/components/sections/skills/SkillsSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      
      <AboutSection />
      
      <SkillsSection />
      
      <section id="projects" className="min-h-screen flex items-center justify-center bg-zinc-950 border-t border-zinc-900">
        <h2 className="text-3xl font-bold text-zinc-700">Projects Section (Placeholder)</h2>
      </section>
    </div>
  );
}
