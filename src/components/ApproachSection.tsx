import { useSiteContent } from "@/hooks/useSiteContent";
import approachImage from "@/assets/jay-corinne-consent.png";

const defaults = {
  title: "Our Approach",
  description: "We treat consent as a trainable skill — not a theory, not a checkbox, and not a one-time conversation. Like any training camp, we focus on fundamentals, mental reps, real-time drills, and skill-building under pressure. This is relational conditioning. The goal isn't just knowledge. It's muscle memory. Participants practice reading cues, communicating clearly, navigating power dynamics, and peer accountability.\nParticipants leave not just informed, but trained.",
  closing_1: "Using experiential and somatic practices, participants learn to distinguish between receiving and giving, recognize what is genuinely wanted versus expected, and communicate boundaries and desires in ways that are clear, embodied, and respectful.",
  closing_2: "Ultimately, this work is about harm prevention, empowerment, and culture change — equipping the next generation with the tools they need to navigate power, pressure, and relationships with clarity, confidence, and care.",
};

const ApproachSection = () => {
  const { data: content } = useSiteContent("approach");
  const c = { ...defaults, ...content };

  return (
    <section id="approach" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-6">{c.title}</h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "22px" }}>
            {c.description.split("\n").map((line, i) => (
              <span key={i}>{line}{i < c.description.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="min-w-0">
            <img
              src={approachImage}
              alt="Two people smiling in front of a whiteboard with CONSENT written on it"
              className="w-full rounded-2xl shadow-soft object-cover aspect-[3/4]"
            />
          </div>
          <div className="text-right space-y-6 min-w-0">
            <p className="text-muted-foreground leading-relaxed break-words" style={{ fontSize: "22px" }}>{c.closing_1}</p>
            <p className="text-foreground font-medium break-words" style={{ fontSize: "22px" }}>{c.closing_2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
