import AnimatedIntro from "./AnimatedIntro";
import InteractiveTimeline from "./InteractiveTimeline";
import InterestCards from "./InterestCards";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex w-full flex-col justify-start border-t border-line bg-bg isolate"
    >
      <AnimatedIntro />
      <InteractiveTimeline />
      <InterestCards />
    </section>
  );
}
