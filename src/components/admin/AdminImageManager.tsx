import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";

const useSiteImages = (sectionKey: string) => {
  return useQuery({
    queryKey: ["site-images", sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .eq("section_key", sectionKey)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

interface AdminImageManagerProps {
  sectionKey: string;
  title: string;
}

const AdminImageManager = ({ sectionKey, title }: AdminImageManagerProps) => {
  const { data: images, isLoading } = useSiteImages(sectionKey);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${sectionKey}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(fileName);

      const nextOrder = (images?.length ?? 0) + 1;
      const { error: dbError } = await supabase.from("site_images").insert({
        section_key: sectionKey,
        image_key: `${sectionKey}_${Date.now()}`,
        url: urlData.publicUrl,
        alt_text: altText || file.name,
        sort_order: nextOrder,
      });
      if (dbError) throw dbError;

      queryClient.invalidateQueries({ queryKey: ["site-images", sectionKey] });
      setAltText("");
      toast({ title: "Uploaded!", description: "Image added successfully." });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string, url: string) => {
    try {
      // Extract path from URL for storage deletion
      const path = url.split("/site-images/")[1];
      if (path) {
        await supabase.storage.from("site-images").remove([path]);
      }
      await supabase.from("site_images").delete().eq("id", id);
      queryClient.invalidateQueries({ queryKey: ["site-images", sectionKey] });
      toast({ title: "Deleted", description: "Image removed." });
    } catch {
      toast({ title: "Error", description: "Failed to delete image.", variant: "destructive" });
    }
  };

  const handleAltUpdate = async (id: string, newAlt: string) => {
    await supabase
      .from("site_images")
      .update({ alt_text: newAlt, updated_at: new Date().toISOString() })
      .eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["site-images", sectionKey] });
  };

  if (isLoading) return null;

  return (
    <Card>
      <CardHeader className="cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ImageIcon className="w-5 h-5" /> {title} Images
          </CardTitle>
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4">
          {/* Existing images */}
          {images && images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group rounded-lg overflow-hidden border border-border">
                  <img
                    src={img.url}
                    alt={img.alt_text}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 space-y-1">
                    <Input
                      value={img.alt_text}
                      onChange={(e) => handleAltUpdate(img.id, e.target.value)}
                      placeholder="Alt text"
                      className="text-xs h-7"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(img.id, img.url)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Upload new */}
          <div className="border-2 border-dashed border-border rounded-lg p-4 space-y-3">
            <div className="space-y-2">
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Alt text for new image (optional)"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full"
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AdminImageManager;
