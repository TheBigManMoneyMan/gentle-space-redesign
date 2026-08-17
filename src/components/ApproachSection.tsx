import { useSiteContent } from "@/hooks/useSiteContent";

const defaults = {
  title: "Our Approach",
  description: "We treat consent as a trainable skill — not a theory, not a checkbox, and not a one-time conversation. Like any training camp, we focus on fundamentals, mental reps, real-time drills, and skill-building under pressure. This is relational conditioning. The goal isn't just knowledge. It's muscle memory. Participants practice reading cues, communicating clearly, navigating power dynamics, and peer accountability.\nParticipants leave not just informed, but trained.",
};

const ApproachSection = () => {
  const { data: content } = useSiteContent("approach");
  const c = { ...defaults, ...content };

  return (
    <section id="approach" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-6">{c.title}</h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "22px" }}>
            {c.description.split("\n").map((line, i) => (
              <span key={i}>{line}{i < c.description.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
