import { useState } from "react";
import { useSiteSections } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUp, ArrowDown, GripVertical, Eye, EyeOff } from "lucide-react";

const AdminSectionManager = () => {
  const { data: sections, isLoading } = useSiteSections();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const moveSection = async (index: number, direction: "up" | "down") => {
    if (!sections) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sections.length) return;

    setSaving(true);
    try {
      const a = sections[index];
      const b = sections[swapIndex];
      await supabase
        .from("site_sections")
        .update({ sort_order: b.sort_order, updated_at: new Date().toISOString() })
        .eq("id", a.id);
      await supabase
        .from("site_sections")
        .update({ sort_order: a.sort_order, updated_at: new Date().toISOString() })
        .eq("id", b.id);
      queryClient.invalidateQueries({ queryKey: ["site-sections"] });
      toast({ title: "Reordered", description: `Moved "${a.title}" ${direction}.` });
    } catch {
      toast({ title: "Error", description: "Failed to reorder.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (id: string, currentlyVisible: boolean, title: string) => {
    setSaving(true);
    try {
      await supabase
        .from("site_sections")
        .update({ is_visible: !currentlyVisible, updated_at: new Date().toISOString() })
        .eq("id", id);
      queryClient.invalidateQueries({ queryKey: ["site-sections"] });
      toast({ title: currentlyVisible ? "Hidden" : "Visible", description: `"${title}" is now ${currentlyVisible ? "hidden" : "visible"}.` });
    } catch {
      toast({ title: "Error", description: "Failed to update visibility.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <Card><CardContent className="p-6">Loading sections...</CardContent></Card>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Section Order & Visibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sections?.map((section, index) => (
          <div
            key={section.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="font-medium text-foreground flex-1">{section.title}</span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={index === 0 || saving}
                onClick={() => moveSection(index, "up")}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={index === (sections?.length ?? 0) - 1 || saving}
                onClick={() => moveSection(index, "down")}
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {section.is_visible ? (
                <Eye className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <Switch
                checked={section.is_visible}
                onCheckedChange={() => toggleVisibility(section.id, section.is_visible, section.title)}
                disabled={saving}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminSectionManager;
