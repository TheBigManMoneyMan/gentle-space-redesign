import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RECAPTCHA_SITE_KEY = "6LedfHIsAAAAAIu4k6_-2fgz6FNVWtPEnVs3Xd4B";

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.enterprise.ready(() => {
          window.grecaptcha.enterprise
            .execute(RECAPTCHA_SITE_KEY, { action: "contact" })
            .then(resolve)
            .catch(reject);
        });
      });

      const { data, error } = await supabase.functions.invoke("verify-recaptcha", {
        body: { token },
      });

      if (error || !data?.success) {
        throw new Error("Verification failed. Please try again.");
      }

      const { data: emailData, error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: { name: formData.name, email: formData.email, message: formData.message, subscribe: formData.subscribe },
      });

      if (emailError || !emailData?.success) {
        throw new Error("Failed to send message. Please try again.");
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "", subscribe: false });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-secondary-dark">
      <div className="container-wide mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-lg">
            We'd love to hear from you. Reach out to start a conversation about how we can support your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl p-8 shadow-soft">
            <h3 className="text-xl sans-serif font-semibold text-foreground mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input id="name" type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea id="message" placeholder="Tell us about your needs..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="subscribe" className="w-4 h-4 rounded border-border text-accent focus:ring-accent" checked={formData.subscribe} onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })} />
                <label htmlFor="subscribe" className="text-sm text-muted-foreground">Yes, subscribe me to your newsletter</label>
              </div>
              <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">Privacy Policy</a> and{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">Terms of Service</a> apply.
              </p>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl sans-serif font-semibold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:info@consentcoach.com" className="text-muted-foreground hover:text-accent transition-colors">info@consentcoach.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft border-l-4 border-accent">
              <p className="text-foreground font-medium mb-2">Safe & Confidential</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All consultations are conducted in a safe, confidential environment. We practice trauma-informed approaches and prioritize your comfort and autonomy at every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
