import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container-wide mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="sans-serif text-2xl font-bold mb-4">Consent Coach</h3>
            <p className="text-background/70 leading-relaxed mb-6">
              Empowering young people with the tools they need to navigate relationships with clarity, confidence, and
              care.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-3">
              <a href="#about" className="block text-background/70 hover:text-accent transition-colors">
                About
              </a>
              <a href="#approach" className="block text-background/70 hover:text-accent transition-colors">
                Our Approach
              </a>
              <a href="#services" className="block text-background/70 hover:text-accent transition-colors">
                Services
              </a>
              <a href="#testimonials" className="block text-background/70 hover:text-accent transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="block text-background/70 hover:text-accent transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <nav className="space-y-3">
              <a href="#" className="block text-background/70 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-background/70 hover:text-accent transition-colors">
                Accessibility Statement
              </a>
              <a href="#" className="block text-background/70 hover:text-accent transition-colors">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">© {new Date().getFullYear()} Consent Coach. All rights reserved.</p>
          <p className="text-background/60 text-sm">Trauma-informed • Consent-centered • Empowerment-focused</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
