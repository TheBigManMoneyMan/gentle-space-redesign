import { Facebook, Twitter, Linkedin } from "lucide-react";
import founderImage from "@/assets/FounderImage.png";
import teamJay from "@/assets/Jay.png";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Corinne Diachuk RYT 800, SSE",
      role: "Somatic Sex and Consent Educator",
      bio: "I am a Certified Somatic Sex and Consent Educator, a Yoga Therapist, and a mother to a young adult son. I have been teaching the teachers, facilitating group consent workshops, and offering 1 to 1 private sessions for individuals and couples in my private practice for over 10 years.",
      landAcknowledgment:
        "I am a settler of French and Ukrainian descent, and currently live on the unceded land of the Lekwungen speaking first nations peoples, colonially known as Victoria, BC. Canada.",
      image: founderImage,
      socials: { facebook: "#", twitter: "#", linkedin: "#" },
    },
    {
      name: "Jay Wade",
      role: "Group Facilitator and Counsellor",
      bio: "I am currently completing a Master of Counselling Psychology degree, and I am also a Certified Sexual Health Educator and Somatic Coach, with over 20 years of experience supporting youth and adults as a Counsellor, Facilitator, youth and family worker, and Educator.",
      landAcknowledgment:
        "I live and work on the stolen land of the Quw’utsun Nation, located on what’s colonially known as Vancouver Island, BC. I am a settler of Italian, Irish, and English ancestry and grew up in the Great Lakes region on Treaty 19 lands.",
      image: teamJay,
      socials: { facebook: "#", twitter: "#", linkedin: "#" },
    },
  ];

  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">Meet the Team</h2>
          <div className="w-12 h-1 bg-foreground mx-auto mt-4" />
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-primary rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              {/* Image */}
              <div className="p-6 pb-0">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className={`w-full h-72 object-cover rounded-lg ${
                    member.name.includes("Jay") ? "object-[center_35%]" : "object-top"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="p-6 text-primary-foreground">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide mb-1">{member.role}</p>
                <h3 className="text-xl font-serif font-bold mb-4">{member.name}</h3>
                <p className="text-sm leading-relaxed opacity-90 mb-4">{member.bio}</p>
                {member.landAcknowledgment && (
                  <p className="text-sm leading-relaxed opacity-75 italic mb-6">{member.landAcknowledgment}</p>
                )}

                {/* Social Links */}
                <div className="flex gap-3">
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                      aria-label={`${member.name} on Facebook`}
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                      aria-label={`${member.name} on Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
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

export default TeamSection;
