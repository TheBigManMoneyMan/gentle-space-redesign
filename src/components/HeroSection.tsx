import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroBasketball from "@/assets/hero-basketball.jpg";
import heroFootball from "@/assets/hero-football-new.jpg";
import heroFootballTeam from "@/assets/hero-football-team.jpg";
import heroHockey from "@/assets/hero-hockey-new.jpg";
import heroAudience from "@/assets/hero-audience.jpg";
import heroLectureHall from "@/assets/hero-lecture-hall.jpg";

const heroImages = [
  {
    src: heroHockey,
    alt: "Hockey players in action on the ice rink",
  },
  {
    src: heroFootball,
    alt: "Football players during a game, demonstrating teamwork",
  },
  {
    src: heroAudience,
    alt: "Audience attentively listening during a presentation",
  },
  {
    src: heroBasketball,
    alt: "Basketball players during an indoor game",
  },
  {
    src: heroLectureHall,
    alt: "Students in a modern lecture hall during an educational session",
  },
  {
    src: heroFootballTeam,
    alt: "Football team running together on the field",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background slideshow */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/35 to-primary/20 z-10" />

        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-opacity duration-1000 ${
              index === 2 ? "object-[center_70%]" : "object-center"
            } ${index === currentSlide ? "opacity-80" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-foreground w-8"
                : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Green accent triangle */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full gradient-green-overlay z-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 container-wide mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="max-w-3xl ml-auto lg:ml-[20%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl sans-serif font-bold text-primary-foreground leading-tight mb-6">
            Helping you to play <br /> safe AND have fun
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl leading-relaxed">
            Trauma- informed consent education to empower young people to understand boundaries and power dynamics, and
            thrive in healthy relationships!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Book a Session</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
