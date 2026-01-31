import { Button } from "@/components/ui/button";
import { Users, User, GraduationCap, Building } from "lucide-react";
import groupImage from "@/assets/group-discussion.jpg";
import workshopImage from "@/assets/workshop-classroom.jpg";

const ServicesSection = () => {
  const services = [
    {
      icon: User,
      title: "One-on-One Coaching",
      forWho:
        "Young adults, athletes, seeking personal growth. Coaches, Teachers, Mentors, Managers and parents seeking skills to support their young people.",
      helpsWidth:
        "Building confidence in boundaries, consent communication, healthy relating, understanding harm, support for accountability processes and learning how to be in repair when harm has happened.",
      expect: "Private, confidential sessions tailored to your specific needs and goals",
    },
    {
      icon: Users,
      title: "Group Workshops",
      forWho: "Sports teams, school groups, and youth organizations",
      helpsWidth: "Team culture, mutual respect, collective understanding of consent, and accountability",
      expect: "Interactive, engaging sessions with practical exercises and group discussions",
    },
    {
      icon: GraduationCap,
      title: "Educational Programs",
      forWho: "Schools, universities, and educational institutions",
      helpsWidth: "Curriculum integration, staff training, and student empowerment",
      expect: "Comprehensive programs designed to create lasting cultural change",
    },
    {
      icon: Building,
      title: "Organizational Training",
      forWho: "Athletic programs, clubs, and community organizations",
      helpsWidth: "Policy development, coach education, and prevention strategies",
      expect: "Tailored solutions that address your organization's unique needs",
    },
  ];

  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Services & Offerings</h2>
          <p className="text-muted-foreground text-lg">Flexible programs designed to meet you where you are</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-soft hover:shadow-card transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground">{service.title}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-accent uppercase tracking-wide mb-1">Who It's For</p>
                    <p className="text-muted-foreground">{service.forWho}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-accent uppercase tracking-wide mb-1">What It Helps With</p>
                    <p className="text-muted-foreground">{service.helpsWidth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-accent uppercase tracking-wide mb-1">What to Expect</p>
                    <p className="text-muted-foreground">{service.expect}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <a href="#contact">Discuss Your Needs</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
