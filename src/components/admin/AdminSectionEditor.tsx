import { useState, useEffect } from "react";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, ChevronDown, ChevronUp } from "lucide-react";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea";
}

interface AdminSectionEditorProps {
  sectionKey: string;
  title: string;
  fields: FieldConfig[];
}

const AdminSectionEditor = ({ sectionKey, title, fields }: AdminSectionEditorProps) => {
  const { data: content, isLoading } = useSiteContent(sectionKey);
  const updateContent = useUpdateSiteContent();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (content) {
      const initial: Record<string, string> = {};
      fields.forEach((f) => {
        initial[f.key] = content[f.key] || "";
      });
      setValues(initial);
    }
  }, [content]);

  const handleSave = async () => {
    const items = Object.entries(values).map(([key, value]) => ({
      section_key: sectionKey,
      content_key: key,
      value,
    }));
    try {
      await updateContent.mutateAsync(items);
      toast({ title: "Saved!", description: `${title} content updated.` });
    } catch {
      toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" });
    }
  };

  if (isLoading) return <Card><CardContent className="p-6">Loading {title}...</CardContent></Card>;

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <Textarea
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  rows={4}
                />
              ) : (
                <Input
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                />
              )}
            </div>
          ))}
          <Button onClick={handleSave} disabled={updateContent.isPending} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {updateContent.isPending ? "Saving..." : `Save ${title}`}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default AdminSectionEditor;
