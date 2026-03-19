import { CheckCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  title: "Our Approach",
  description: "We treat consent as a trainable skill — not a theory, not a checkbox, and not a one-time conversation. Like any training camp, we focus on fundamentals, mental reps, real-time drills, and skill-building under pressure. This is relational conditioning. The goal isn't just knowledge. It's muscle memory. Participants practice reading cues, communicating clearly, navigating power dynamics, and peer accountability.\nParticipants leave not just informed, but trained.",
  key_message: 'In the wake of the #metoo movement, we have discovered that "getting permission" or "she didn\'t say no" is not good enough. Now more than ever, we need this new language around the nuances of consent that includes awareness of systemic and embodied oppression, is trauma-informed, includes pleasure, and is simple enough to teach to our youth.',
  benefits_header: "Through experiential education grounded in the Wheel of Consent, we support teams and classrooms full of young adults to discover how to:",
  benefit_1: "Understand how power and influence operate in athletic, academic, and mentoring environments",
  benefit_2: "Support young people in developing self-awareness, agency, and effective communication skills",
  benefit_3: "Reduce harm, confusion, and misunderstandings by creating clear agreements",
  benefit_4: "Encourage cultures of leadership, accountability, and curiosity rooted in respect",
  closing_1: "Using experiential and somatic practices, participants learn to distinguish between receiving and giving, recognize what is genuinely wanted versus expected, and communicate boundaries and desires in ways that are clear, embodied, and respectful.",
  closing_2: "Ultimately, this work is about harm prevention, empowerment, and culture change — equipping the next generation with the tools they need to navigate power, pressure, and relationships with clarity, confidence, and care.",
};

const ApproachSection = () => {
  const { data: content } = useSiteContent("approach");
  const c = { ...defaults, ...content };

  const benefits = [c.benefit_1, c.benefit_2, c.benefit_3, c.benefit_4];

  return (
    <section id="approach" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-6">{c.title}</h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "22px" }}>
            {c.description.split("\n").map((line, i) => (
              <span key={i}>{line}{i < c.description.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
        </div>

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

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "22px" }}>{c.closing_1}</p>
          <p className="text-foreground font-medium" style={{ fontSize: "22px" }}>{c.closing_2}</p>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
