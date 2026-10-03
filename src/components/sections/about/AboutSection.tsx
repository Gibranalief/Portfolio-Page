import AnimatedIntro from "./AnimatedIntro";
import InteractiveTimeline from "./InteractiveTimeline";
import InterestCards from "./InterestCards";

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="w-full relative bg-zinc-950 flex flex-col justify-start isolate"
    >
      {/* Subtle noisy background texture overlay (optional if available globally, but we'll use a generic overlay here) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} 
      />

      <AnimatedIntro />
      <InteractiveTimeline />
      <InterestCards />
    </section>
  );
}
