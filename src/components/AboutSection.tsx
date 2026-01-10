import handsImage from "@/assets/hands-connection.jpg";
import coachImage from "@/assets/FounderImage.png";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            About
          </h2>
          <p className="text-muted-foreground text-lg">Empowering Young Male Athletes</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <img
              src={handsImage}
              alt="Hands clasped together representing trust, connection, and consent in relationships"
              className="w-full rounded-lg shadow-card"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-lg -z-10" />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              We are coaches dedicated to teaching young people. We are committed to
              providing a safe and supportive environment in which they can develop 
              practical embodied skills in consent, boundaries, and power dynamics, 
              and nurture a culture of respect.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through our coaching, athletes gain the tools to stay safe and have fun,
              empowering them to navigate challenging situations and build capacity 
              for decision-making in heightened states of intensity.
            </p>
          </div>
        </div>

        {/* Founder Card */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-soft">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={coachImage}
                alt="Corinne Diachuk, Certified Somatic Sex and Consent Educator"
                className="w-48 h-48 object-cover rounded-full shadow-card"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-sm text-accent font-medium uppercase tracking-wide mb-1">
                  Somatic Sex and Consent Educator
                </p>
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Corinne Diachuk RYT 800, SSE
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I am a Certified Somatic Sex and Consent Educator, a Yoga Therapist, and a mother 
                to a young adult son. I have been teaching the teachers, facilitating group consent 
                workshops, and offering 1 to 1 private sessions for individuals and couples in my 
                private practice for over 10 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
