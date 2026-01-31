const HowItWorksSection = () => {
  const steps = [
    {
      title: "Exploration",
      description:
        "We begin by exploring the fundamental concepts of receiving and giving, negotiating boundaries, desires, and limits, power dynamics, and basic nervous system theory, to provide for a solid foundation for the journey ahead.",
    },
    {
      title: "Training Sessions",
      description:
        "Our training sessions provide the opportunity for young  people to slow down and trust in their own sensations and values, notice the complex social dynamics, and practice communication.",
    },
    {
      title: "Progress Tracking",
      description:
        "We believe that the skills we have to offer wil equip the participants with the tools and knowledge necessary to stay safe,  have fun, and thrive; not only in the dating field, but also in the classroom, and on the team.",
    },
  ];

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground">How It Works</h2>
        </div>

        {/* Steps Grid */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-6 md:gap-12 py-8 border-t border-border">
              <div className="flex items-start gap-4">
                <span className="text-3xl sans-serif font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-xl sans-serif font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
