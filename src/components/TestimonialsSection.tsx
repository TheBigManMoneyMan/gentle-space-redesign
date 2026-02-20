import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const TestimonialsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Jason Goode",
      role: "Somatic Performance Coach",
      website: "https://somasport.ca",
      shortQuote:
        "Learning the Wheel of Consent with Corinne was one of the most practical and impactful pieces of training I've done. It gave me a clear, embodied way to understand boundaries, agency, and communication—skills I now use every day in my work with athletes. I truly believe this work helps build safer teams, stronger leaders, and a culture of respect, and Corinne has a gift for teaching it in a way that really lands.",
      expandedQuote:
        "Learning the Wheel of Consent with Corinne fundamentally changed how I understand power, choice, and responsibility in human interaction. What struck me most was how practical and embodied the work is—it's not just theory or policy, but something you feel and practice in your body.\n\nAs a coach working with athletes at both the club and national level, I see how essential this kind of learning is. So many conflicts, misunderstandings, and harms don't come from bad intentions, but from a lack of clarity around boundaries, agency, and communication. The Wheel gives a simple, experiential framework for how to navigate these pitfalls.\n\nI believe this training should be foundational in athletic and post-secondary environments. It supports safer teams, stronger leadership, and young men and women who can move through the world with integrity and respect. Corinne teaches this work with skill, warmth, and depth.",
    },
    {
      name: 'Dr. Liam "Captain" Snowdon',
      role: "Founder, Sex Positive Art and Resource Centre (SPARC), Victoria, BC\nAssistant Professor, Institute for Sexuality Education and Enlightenment",
      website: "https://captainsnowdon.ca",
      shortQuote:
        "I have had the immense pleasure of attending, co-creating and evaluating workshops that Corinne has taken part in. Corinne is doing radical consent education in a way and at a time in history that we need pleasure-focused, trauma-informed, and social justice-oriented experiential teaching. In sex education and anti-violence circles up and down the West Coast, Corinne is one of the most qualified, professional, and frankly engaging facilitators. It is with immense delight that I think of folks of diverse allegiances, identities, and knowledge bases at your conference learning with Corinne.",
      expandedQuote: null,
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-2">Testimonials</h2>
          <div className="w-12 h-1 bg-foreground mx-auto mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              {/* Avatar */}
              <div className="p-6 pb-0 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-primary-foreground">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide mb-1">{testimonial.role.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < testimonial.role.split("\n").length - 1 && <br />}
                  </span>
                ))}</p>
                <h3 className="text-xl sans-serif font-bold mb-4">{testimonial.name}</h3>

                <blockquote className="text-sm leading-relaxed opacity-90 mb-4 italic">
                  "{expandedIndex === index && testimonial.expandedQuote
                    ? testimonial.expandedQuote.split("\n\n").map((para, i) => (
                        <span key={i}>
                          {i > 0 && <><br /><br /></>}
                          {para}
                        </span>
                      ))
                    : testimonial.shortQuote}"
                </blockquote>

                {/* Expand Arrow */}
                {testimonial.expandedQuote && (
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mx-auto"
                    aria-label={expandedIndex === index ? "Show less" : "Read more"}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {/* Website Link */}
                {testimonial.website && (
                  <a
                    href={testimonial.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors mt-4"
                    aria-label={`Visit ${testimonial.name}'s website`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>{testimonial.website.replace("https://", "").replace("www.", "")}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
