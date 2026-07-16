import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type AllContent = Record<string, Record<string, string>>;

export const useAllSiteContent = () => {
  return useQuery({
    queryKey: ["site-content-all"],
    queryFn: async (): Promise<AllContent> => {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) throw error;
      const grouped: AllContent = {};
      data?.forEach((item) => {
        if (!grouped[item.section_key]) grouped[item.section_key] = {};
        grouped[item.section_key][item.content_key] = item.value;
      });
      return grouped;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSiteContent = (sectionKey: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["site-content", sectionKey],
    queryFn: async () => {
      const cached = queryClient.getQueryData<AllContent>(["site-content-all"]);
      if (cached && cached[sectionKey]) return cached[sectionKey];

      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section_key", sectionKey);
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((item) => {
        map[item.content_key] = item.value;
      });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { section_key: string; content_key: string; value: string }[]) => {
      for (const item of items) {
        const { error } = await supabase
          .from("site_content")
          .upsert(
            { section_key: item.section_key, content_key: item.content_key, value: item.value, updated_at: new Date().toISOString() },
            { onConflict: "section_key,content_key" }
          );
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content-all"] });
    },
  });
};

export const useSiteSections = () => {
  return useQuery({
    queryKey: ["site-sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_sections")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
