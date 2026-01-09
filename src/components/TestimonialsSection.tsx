import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Jared's experience with the program was transformative. He learned valuable skills that not only improved his game but also his overall approach to relationships and personal boundaries.",
      name: "Jared T.",
      role: "Program Participant",
    },
    {
      quote:
        "Alex found immense value in the program's focus on power dynamics and respectful relating. It positively impacted his interactions both on and off the field.",
      name: "Alex R.",
      role: "Student Athlete",
    },
    {
      quote:
        "Noah's journey with the program was truly impactful. He gained a deeper understanding of consent and healthy boundaries, which significantly contributed to his sense of safety and well-being.",
      name: "Noah K.",
      role: "Team Member",
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Student Testimonials
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-xl p-8 shadow-soft border-t-4 border-accent"
            >
              <Quote className="w-10 h-10 text-accent/30 mb-4" />
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
