import { useSiteSections } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ComponentType } from "react";

const sectionComponents: Record<string, ComponentType> = {
  hero: HeroSection,
  about: AboutSection,
  approach: ApproachSection,
  how_it_works: HowItWorksSection,
  team: TeamSection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  cta: CTASection,
  contact: ContactSection,
};

const defaultOrder = ["hero", "about", "approach", "how_it_works", "team", "services", "testimonials", "cta", "contact"];

const Index = () => {
  const { data: sections } = useSiteSections();

  const orderedSections = sections
    ? sections.filter((s) => s.is_visible).map((s) => s.section_key)
    : defaultOrder;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {orderedSections.map((key) => {
          const Component = sectionComponents[key];
          return Component ? <Component key={key} /> : null;
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
