import { CheckCircle } from "lucide-react";

const ApproachSection = () => {
  const benefits = [
    "Understand how power and influence operate in athletic, academic, and mentoring environments",
    "Support young people in developing self-awareness, agency, and effective communication skills",
    "Reduce harm, confusion, and misunderstandings by creating clear agreements",
    "Encourage cultures of leadership, accountability, and curiosity rooted in respect",
  ];

  return (
    <section id="approach" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-6">Our Approach</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At the heart of our work is a deep commitment to transforming how people understand and practice consent —
            not just as a checklist, but as an embodied, relational skill that opens the door to clarity, connection,
            agency, and pleasure.
          </p>
        </div>

        {/* Key Message */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12 mb-16">
          <p className="text-lg lg:text-xl leading-relaxed text-center max-w-3xl mx-auto">
            In the wake of the #metoo movement, we have discovered that "getting permission" or "she didn't say no" is
            not good enough. Now more than ever, we need a new language around the nuances of consent that includes
            awareness of embodied and systemic oppression, is trauma-sensitive, and simple enough to teach to youth.
          </p>
        </div>

        {/* What We Help With */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl sans-serif font-semibold text-foreground mb-8 text-center">
            Through experiential education grounded in the Wheel of Consent, we support teams and classrooms full of
            young adults to discover how to:
          </h3>

          <div className="grid gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-soft">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Using experiential and somatic practices, participants learn to distinguish between receiving and giving,
            recognize what is genuinely wanted versus expected, and communicate boundaries and desires in ways that are
            clear, embodied, and respectful.
          </p>
          <p className="text-foreground font-medium">
            Ultimately, this work is about harm prevention, empowerment, and culture change — equipping the next
            generation with the tools they need to navigate power, pressure, and relationships with clarity, confidence,
            and care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
