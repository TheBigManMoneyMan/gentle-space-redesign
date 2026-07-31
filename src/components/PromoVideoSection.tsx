import { useState } from "react";
import { Play, X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import promoThumbnail from "@/assets/promo-thumbnail.jpg";

const defaults = {
  title: "See Consent Coaching in Action",
  subline: "Watch a 3-minute preview of how we train teams and classrooms to build healthy boundaries, communication, and culture.",
  video_url: "",
  thumbnail_url: "",
};

const PromoVideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: content } = useSiteContent("promo");
  const c = { ...defaults, ...content };

  const hasVideo = c.video_url && c.video_url.trim().length > 0;
  const isEmbed =
    hasVideo &&
    (c.video_url.includes("youtube.com/embed") ||
      c.video_url.includes("player.vimeo.com") ||
      c.video_url.includes("youtube-nocookie.com/embed"));

  const ytId = hasVideo ? c.video_url.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1] : undefined;
  const thumbnailSrc =
    c.thumbnail_url ||
    (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : promoThumbnail);


  return (
    <section id="promo" className="section-padding bg-secondary/50">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl sans-serif font-bold text-foreground mb-6">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {c.subline}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Play promo video"
          >
            <img
              src={thumbnailSrc}
              alt="Promo video thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/90 text-accent-foreground flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
              </div>
            </div>

            {/* Optional duration badge */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm font-medium px-3 py-1 rounded-full">
              Watch promo
            </div>
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 border-none bg-black overflow-hidden">
          <DialogTitle className="sr-only">Promo video</DialogTitle>
          <div className="relative aspect-video w-full">
            {isOpen && hasVideo && isEmbed && (
              <iframe
                src={c.video_url}
                title="Promo video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {isOpen && hasVideo && !isEmbed && (
              <video
                src={c.video_url}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full"
                playsInline
              />
            )}
            {isOpen && !hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground/80 p-8 text-center">
                <p>Video URL not configured. Add a video URL in the admin CMS.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PromoVideoSection;
