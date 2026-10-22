import AnimatedIntro from "./AnimatedIntro";
import InteractiveTimeline from "./InteractiveTimeline";
import InterestCards from "./InterestCards";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full relative bg-zinc-950 flex flex-col justify-start isolate"
    >
      <AnimatedIntro />
      <InteractiveTimeline />
      <InterestCards />
    </section>
  );
}
