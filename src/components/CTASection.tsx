import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  title: "Ready to Create Positive Change?",
  description: "Whether you're an individual seeking personal growth or an organization looking to transform your culture, we're here to support you every step of the way.",
  cta_primary_text: "Book a Session",
  cta_primary_link: "#contact",
  cta_secondary_text: "Email Us",
  cta_secondary_link: "mailto:info@consentcoach.com",
};

const CTASection = () => {
  const { data: content } = useSiteContent("cta");
  const c = { ...defaults, ...content };

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/4 h-full gradient-green-overlay"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="container-wide mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl sans-serif font-bold text-primary-foreground mb-6">
            {c.title}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {c.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href={c.cta_primary_link}>{c.cta_primary_text}</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={c.cta_secondary_link}>{c.cta_secondary_text}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
