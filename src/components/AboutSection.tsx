import { useSiteContent } from "@/hooks/useSiteContent";
import handsImage from "@/assets/hands-connection.jpg";

const defaults = {
  title: "About",
  subtitle: "Empowering The Next Generation",
  paragraph_1: "We are coaches dedicated to teaching young people. We are committed to providing a safe and supportive environment in which they can develop practical embodied skills in consent, boundaries, and power dynamics, and nurture a culture of respect.",
  paragraph_2: "Through our coaching, athletes gain the tools to stay safe and have fun, empowering them to navigate challenging situations and build capacity for decision-making in heightened states of intensity.",
};

const AboutSection = () => {
  const { data: content } = useSiteContent("about");
  const c = { ...defaults, ...content };

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-4">{c.title}</h2>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="relative">
            <img
              src={handsImage}
              alt="Hands clasped together representing trust, connection, and consent in relationships"
              className="w-full rounded-lg shadow-card"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-lg -z-10" />
          </div>

          <div className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">{c.paragraph_1}</p>
            <p className="text-muted-foreground leading-relaxed">{c.paragraph_2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
