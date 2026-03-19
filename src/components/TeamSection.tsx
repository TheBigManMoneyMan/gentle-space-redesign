import { Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import founderImage from "@/assets/FounderImage.png";
import teamJay from "@/assets/jaypic.png";
import teamOliver from "@/assets/team-oliver.jpeg";

const defaultMembers = [
  {
    nameKey: "member_1_name", roleKey: "member_1_role", bioKey: "member_1_bio",
    landKey: "member_1_land", websiteKey: "member_1_website", image: founderImage,
    defaults: { name: "Corinne Diachuk RYT 800, SSE", role: "Somatic Sex and Consent Educator", bio: "", land: "", website: "https://www.corinnediachuk.com" },
  },
  {
    nameKey: "member_2_name", roleKey: "member_2_role", bioKey: "member_2_bio",
    landKey: "member_2_land", websiteKey: "member_2_website", image: teamJay,
    defaults: { name: "Jay Wade", role: "Group Facilitator and Counsellor", bio: "", land: "", website: "https://www.jaywade.ca" },
  },
  {
    nameKey: "member_3_name", roleKey: "member_3_role", bioKey: "member_3_bio",
    landKey: "member_3_land", websiteKey: "member_3_website", image: teamOliver,
    defaults: { name: "Oliver Griffin", role: "Athlete Consultant and Tech Support", bio: "", land: "", website: "https://griffindesigns.io/" },
  },
];

const TeamSection = () => {
  const { data: content } = useSiteContent("team");

  const title = content?.title || "Meet the Team";

  const teamMembers = defaultMembers.map((m) => ({
    name: content?.[m.nameKey] || m.defaults.name,
    role: content?.[m.roleKey] || m.defaults.role,
    bio: content?.[m.bioKey] || m.defaults.bio,
    landAcknowledgment: content?.[m.landKey] || m.defaults.land,
    website: content?.[m.websiteKey] || m.defaults.website,
    image: m.image,
  }));

  return (
    <section id="team" className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-2">{title}</h2>
          <div className="w-12 h-1 bg-foreground mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-primary rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 ${
                teamMembers.length % 2 !== 0 && index === teamMembers.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto" : ""
              }`}
            >
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

              <div className="p-6 text-primary-foreground">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide mb-1">{member.role}</p>
                <h3 className="text-xl sans-serif font-bold mb-4">{member.name}</h3>
                <p className="text-sm leading-relaxed opacity-90 mb-4">{member.bio}</p>
                {member.landAcknowledgment && (
                  <p className="text-sm leading-relaxed opacity-75 italic mb-6">{member.landAcknowledgment}</p>
                )}
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
