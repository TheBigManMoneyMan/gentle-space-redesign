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
        "Following the training seminar, participants complete an online, self-paced assessment designed to support integration and ensure comprehension of the material. The assessment may be taken multiple times, allowing students to learn at their own pace and demonstrate full understanding by achieving a 100% score.",
    },
  ];

  return (
    <section className="section-padding bg-secondary">
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
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "22px" }}>
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
