import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  title: "How It Works",
  step_1_title: "Exploration",
  step_1_description: "We begin by exploring the fundamental concepts of receiving and giving, negotiating boundaries, desires, and limits, power dynamics, and basic nervous system theory, to provide for a solid foundation for the journey ahead.",
  step_2_title: "Training Sessions",
  step_2_description: "Our training sessions provide the opportunity for young  people to slow down and trust in their own sensations and values, notice the complex social dynamics, and practice communication.",
  step_3_title: "Progress Tracking",
  step_3_description: "Following the training seminar, participants complete an online, self-paced assessment designed to support integration and ensure comprehension of the material. The assessment may be taken multiple times, allowing students to learn at their own pace and demonstrate full understanding by achieving a 100% score.",
};

const HowItWorksSection = () => {
  const { data: content } = useSiteContent("how_it_works");
  const c = { ...defaults, ...content };

  const steps = [
    { title: c.step_1_title, description: c.step_1_description },
    { title: c.step_2_title, description: c.step_2_description },
    { title: c.step_3_title, description: c.step_3_description },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground">{c.title}</h2>
        </div>

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
