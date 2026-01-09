const HowItWorksSection = () => {
  const steps = [
    {
      title: "Exploration",
      description:
        "We begin by exploring the fundamental concepts of consent, boundaries, and power dynamics, providing a solid foundation for the journey ahead.",
    },
    {
      title: "Training Sessions",
      description:
        "Our training sessions are designed to impart practical, embodied skills that empower young athletes to navigate complex social dynamics and build respectful relationships.",
    },
    {
      title: "Progress Tracking",
      description:
        "We believe in tracking progress to ensure that each athlete is equipped with the tools and knowledge necessary to stay safe, have fun, and thrive both on and off the field.",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-6 md:gap-12 py-8 border-t border-border"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-serif font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
