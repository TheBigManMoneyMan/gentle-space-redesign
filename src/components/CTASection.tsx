import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding gradient-hero relative overflow-hidden">
      {/* Green accent */}
      <div 
        className="absolute top-0 right-0 w-1/4 h-full gradient-green-overlay"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />

      <div className="container-wide mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Ready to Create Positive Change?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you're an individual seeking personal growth or an organization looking 
            to transform your culture, we're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Book a Session</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="mailto:info@consentcoach.com">Email Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
