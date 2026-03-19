import { Button } from "@/components/ui/button";
import { Users, User, GraduationCap, Building } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const icons = [User, Users, GraduationCap, Building];

const defaults = {
  title: "Services & Offerings",
  subtitle: "Flexible programs designed to meet you where you are",
  service_1_title: "One-on-One Coaching",
  service_1_for_who: "", service_1_helps_with: "", service_1_expect: "",
  service_2_title: "Training Camps",
  service_2_for_who: "", service_2_helps_with: "", service_2_expect: "",
  service_3_title: "Educational Programs",
  service_3_for_who: "", service_3_helps_with: "", service_3_expect: "",
  service_4_title: "Organizational Training",
  service_4_for_who: "", service_4_helps_with: "", service_4_expect: "",
};

const ServicesSection = () => {
  const { data: content } = useSiteContent("services");
  const c = { ...defaults, ...content };

  const services = [1, 2, 3, 4].map((i) => ({
    icon: icons[i - 1],
    title: c[`service_${i}_title` as keyof typeof c],
    forWho: c[`service_${i}_for_who` as keyof typeof c],
    helpsWith: c[`service_${i}_helps_with` as keyof typeof c],
    expect: c[`service_${i}_expect` as keyof typeof c],
  }));

  return (
    <section id="services" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-4">{c.title}</h2>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-card rounded-xl p-8 shadow-soft hover:shadow-card transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl sans-serif font-semibold text-foreground">{service.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-accent uppercase tracking-wide mb-1">Who It's For</p>
                    <p className="text-muted-foreground">{service.forWho}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-accent uppercase tracking-wide mb-1">What It Helps With</p>
                    <p className="text-muted-foreground">{service.helpsWith}</p>
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
