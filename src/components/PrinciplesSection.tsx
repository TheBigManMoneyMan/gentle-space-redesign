import { CheckCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  key_message: 'In the wake of the #metoo movement, we have discovered that "getting permission" or "she didn\'t say no" is not good enough. Now more than ever, we need this new language around the nuances of consent that includes awareness of systemic and embodied oppression, is trauma-informed, includes pleasure, and is simple enough to teach to our youth.',
  benefits_header: "Through experiential education grounded in the Wheel of Consent, we support teams and classrooms full of young adults to discover how to:",
  benefit_1: "Understand how power and influence operate in athletic, academic, and mentoring environments",
  benefit_2: "Support young people in developing self-awareness, agency, and effective communication skills",
  benefit_3: "Reduce harm, confusion, and misunderstandings by creating clear agreements",
  benefit_4: "Encourage cultures of leadership, accountability, and curiosity rooted in respect",
};

const PrinciplesSection = () => {
  const { data: content } = useSiteContent("principles");
  const c = { ...defaults, ...content };

  const benefits = [c.benefit_1, c.benefit_2, c.benefit_3, c.benefit_4];

  return (
    <section id="principles" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12 mb-16">
          <p className="leading-relaxed text-center max-w-3xl mx-auto" style={{ fontSize: "22px" }}>
            {c.key_message}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sans-serif font-semibold text-foreground mb-8 text-center">{c.benefits_header}</h3>
          <div className="grid gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-soft">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
