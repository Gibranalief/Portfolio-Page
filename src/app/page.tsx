import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      
      {/* Placeholders to simulate scrolling flow */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-zinc-950 border-t border-zinc-900">
        <h2 className="text-3xl font-bold text-zinc-700">About Section (Placeholder)</h2>
      </section>
      
      <section id="skills" className="min-h-screen flex items-center justify-center bg-black border-t border-zinc-900">
        <h2 className="text-3xl font-bold text-zinc-700">Skills Section (Placeholder)</h2>
      </section>
      
      <section id="projects" className="min-h-screen flex items-center justify-center bg-zinc-950 border-t border-zinc-900">
        <h2 className="text-3xl font-bold text-zinc-700">Projects Section (Placeholder)</h2>
      </section>
    </div>
  );
}
