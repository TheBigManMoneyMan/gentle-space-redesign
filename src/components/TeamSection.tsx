import { Globe } from "lucide-react";
import founderImage from "@/assets/FounderImage.png";
import teamJay from "@/assets/jaypic.png";
import teamOliver from "@/assets/team-oliver.jpeg";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Corinne Diachuk RYT 800, SSE",
      role: "Somatic Sex and Consent Educator",
      bio: "I am a Certified Somatic Sex and Consent Educator, a Yoga Therapist, and a mother to a young adult son. I have been teaching the teachers, facilitating group consent workshops, and offering 1 to 1 private sessions for individuals and couples in my private practice for over 10 years.",
      landAcknowledgment:
        "I am a settler of French and Ukrainian descent, and currently live on the unceded land of the Lekwungen speaking first nations peoples, colonially known as Victoria, BC. Canada.",
      image: founderImage,
      website: "https://www.corinnediachuk.com",
    },
    {
      name: "Jay Wade",
      role: "Group Facilitator and Counsellor",
      bio: "I am currently completing a Master of Counselling Psychology degree, and I am also a Certified Sexual Health Educator and Somatic Coach, with over 20 years of experience supporting youth and adults as a Counsellor, Facilitator, youth and family worker, and Educator.",
      landAcknowledgment:
        "I live and work on the stolen land of the Quw'utsun Nation, located on what's colonially known as Vancouver Island, BC. I am a settler of Italian, Irish, and English ancestry and grew up in the Great Lakes region on Treaty 19 lands.",
      image: teamJay,
      website: "https://www.jaywade.ca",
    },
    {
      name: "Oliver Griffin",
      role: "Athlete Consultant and Tech Support",
      bio: "I am a web developer with 5 years of experience currently running Griffin Designs, while pursuing sports at the collegiate level. I specialize in providing fast, on demand service, and clean, cost effective results. My athletic experience consists of wrestling, volleyball, gymnastics, and kickboxing.",
      landAcknowledgment: "",
      image: teamOliver,
      website: "https://griffindesigns.io/",
    },
  ];

  return (
    <section id="team" className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-2">Meet the Team</h2>
          <div className="w-12 h-1 bg-foreground mx-auto mt-4" />
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-primary rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 ${
                teamMembers.length % 2 !== 0 && index === teamMembers.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto" : ""
              }`}
            >
              {/* Image */}
              <div className="p-6 pb-0">
                <div className={`rounded-lg overflow-hidden ${member.name.includes("Oliver") ? "bg-muted w-fit mx-auto" : "h-72"}`}>
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className={`w-full h-full ${
                      member.name.includes("Oliver") ? "object-contain" : "object-cover"
                    } ${
                      member.name.includes("Jay") ? "object-[center_45%]" : "object-top"
                    }`}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-primary-foreground">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide mb-1">{member.role}</p>
                <h3 className="text-xl sans-serif font-bold mb-4">{member.name}</h3>
                <p className="text-sm leading-relaxed opacity-90 mb-4">{member.bio}</p>
                {member.landAcknowledgment && (
                  <p className="text-sm leading-relaxed opacity-75 italic mb-6">{member.landAcknowledgment}</p>
                )}

                {/* Website Link */}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    aria-label={`Visit ${member.name}'s website`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>{member.website.replace("https://www.", "")}</span>
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

export default TeamSection;
