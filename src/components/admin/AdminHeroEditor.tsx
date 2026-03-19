import { useState, useEffect } from "react";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminHeroEditor = () => {
  const { data: content, isLoading } = useSiteContent("hero");
  const updateContent = useUpdateSiteContent();
  const { toast } = useToast();

  const [fields, setFields] = useState({
    title: "",
    subtitle: "",
    cta_primary_text: "",
    cta_primary_link: "",
    cta_secondary_text: "",
    cta_secondary_link: "",
  });

  useEffect(() => {
    if (content) {
      setFields({
        title: content.title || "",
        subtitle: content.subtitle || "",
        cta_primary_text: content.cta_primary_text || "",
        cta_primary_link: content.cta_primary_link || "",
        cta_secondary_text: content.cta_secondary_text || "",
        cta_secondary_link: content.cta_secondary_link || "",
      });
    }
  }, [content]);

  const handleSave = async () => {
    const items = Object.entries(fields).map(([key, value]) => ({
      section_key: "hero",
      content_key: key,
      value,
    }));

    try {
      await updateContent.mutateAsync(items);
      toast({ title: "Saved!", description: "Hero section content updated." });
    } catch {
      toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" });
    }
  };

  if (isLoading) return <Card><CardContent className="p-6">Loading hero content...</CardContent></Card>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Title</label>
          <Input value={fields.title} onChange={(e) => setFields({ ...fields, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Subtitle</label>
          <Textarea value={fields.subtitle} onChange={(e) => setFields({ ...fields, subtitle: e.target.value })} rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Primary Button Text</label>
            <Input value={fields.cta_primary_text} onChange={(e) => setFields({ ...fields, cta_primary_text: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Primary Button Link</label>
            <Input value={fields.cta_primary_link} onChange={(e) => setFields({ ...fields, cta_primary_link: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Secondary Button Text</label>
            <Input value={fields.cta_secondary_text} onChange={(e) => setFields({ ...fields, cta_secondary_text: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Secondary Button Link</label>
            <Input value={fields.cta_secondary_link} onChange={(e) => setFields({ ...fields, cta_secondary_link: e.target.value })} />
          </div>
        </div>
        <Button onClick={handleSave} disabled={updateContent.isPending} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {updateContent.isPending ? "Saving..." : "Save Hero Content"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminHeroEditor;
