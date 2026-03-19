import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import testimonialGoode from "@/assets/testimonial-goode.png";
import testimonialCaptain from "@/assets/testimonial-captain.png";

const testimonialImages = [testimonialGoode, testimonialCaptain];

const TestimonialsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { data: content } = useSiteContent("testimonials");

  const title = content?.title || "Testimonials";

  const testimonials = [1, 2].map((i) => ({
    name: content?.[`testimonial_${i}_name`] || "",
    role: content?.[`testimonial_${i}_role`] || "",
    website: content?.[`testimonial_${i}_website`] || "",
    image: testimonialImages[i - 1],
    shortQuote: content?.[`testimonial_${i}_short`] || "",
    expandedQuote: content?.[`testimonial_${i}_expanded`] || null,
  }));

  return (
    <section id="testimonials" className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-2">{title}</h2>
          <div className="w-12 h-1 bg-foreground mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="p-6 pb-0 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-6 text-primary-foreground">
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

                {testimonial.expandedQuote && (
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mx-auto"
                    aria-label={expandedIndex === index ? "Show less" : "Read more"}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                <div className="mt-6 pt-4 border-t border-primary-foreground/20">
                  <h3 className="text-xl sans-serif font-bold">{testimonial.name}</h3>
                  <p className="text-sm font-medium opacity-80 uppercase tracking-wide mt-1">
                    {testimonial.role.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < testimonial.role.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  {testimonial.website && (
                    <a
                      href={testimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors mt-2"
                      aria-label={`Visit ${testimonial.name}'s website`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>{testimonial.website.replace("https://", "").replace("www.", "")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
