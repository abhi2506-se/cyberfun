import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { TestimonialsSection } from "@/components/home/testimonials";
import { TechStack } from "@/components/home/tech-stack";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <FeaturedProjects />
      <TechStack />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
