import { Button } from "@/components/ui/button";
import heroImage from "@/assets/ClassroomPic.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <img
          src={heroImage}
          alt="Consent education workshop with engaged young adults learning about healthy relationships"
          className="absolute inset-0 w-full h-full object-cover object-top mix-blend-overlay opacity-40"
        />
      </div>

      {/* Green accent triangle */}
      <div 
        className="absolute top-0 left-0 w-1/3 h-full gradient-green-overlay"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-wide mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="max-w-3xl ml-auto lg:ml-[20%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6">
            Helping young men play safe AND have fun
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl leading-relaxed">
            Trauma-informed consent education that empowers young athletes to build 
            healthy relationships, understand boundaries, and thrive on and off the field.
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
