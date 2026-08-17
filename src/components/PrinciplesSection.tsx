import { CheckCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import approachImage from "@/assets/jay-corinne-consent.png";

const defaults = {
  key_message: 'In the wake of the #metoo movement, we have discovered that "getting permission" or "she didn\'t say no" is not good enough. Now more than ever, we need this new language around the nuances of consent that includes awareness of systemic and embodied oppression, is trauma-informed, includes pleasure, and is simple enough to teach to our youth.',
  benefits_header: "Through experiential education grounded in the Wheel of Consent, we support teams and classrooms full of young adults to discover how to:",
  benefit_1: "Understand how power and influence operate in athletic, academic, and mentoring environments",
  benefit_2: "Support young people in developing self-awareness, agency, and effective communication skills",
  benefit_3: "Reduce harm, confusion, and misunderstandings by creating clear agreements",
  benefit_4: "Encourage cultures of leadership, accountability, and curiosity rooted in respect",
  closing_1: "Using experiential and somatic practices, participants learn to distinguish between receiving and giving, recognize what is genuinely wanted versus expected, and communicate boundaries and desires in ways that are clear, embodied, and respectful.",
  closing_2: "Ultimately, this work is about harm prevention, empowerment, and culture change — equipping the next generation with the tools they need to navigate power, pressure, and relationships with clarity, confidence, and care.",
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

        <div className="max-w-4xl mx-auto mb-16">
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

        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="min-w-0">
            <img
              src={approachImage}
              alt="Two people smiling in front of a whiteboard with CONSENT written on it"
              className="w-full rounded-2xl shadow-soft object-cover aspect-[3/4]"
            />
          </div>
          <div className="text-right space-y-6 min-w-0">
            <p className="text-muted-foreground leading-relaxed break-words" style={{ fontSize: "22px" }}>{c.closing_1}</p>
            <p className="text-foreground font-medium break-words" style={{ fontSize: "22px" }}>{c.closing_2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
