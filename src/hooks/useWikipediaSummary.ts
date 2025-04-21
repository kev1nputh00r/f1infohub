
import { useQuery } from "@tanstack/react-query";

export const useWikipediaSummary = (title?: string) => {
  return useQuery({
    queryKey: ["wikipedia-summary", title],
    queryFn: async () => {
      if (!title) return null;
      // Replace spaces with underscores for Wikipedia API
      const formattedTitle = title.replace(/\s+/g, "_");
      const resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/history/${encodeURIComponent(formattedTitle)}`);
      if (!resp.ok) throw new Error("Could not fetch Wikipedia summary");
      const data = await resp.json();
      return {
        summary: data.extract,
        url: data.content_urls?.desktop?.page,
      };
    },
    enabled: !!title,
    staleTime: 1000 * 60 * 60, // 1 hour (to avoid spamming Wikipedia)
  });
};
