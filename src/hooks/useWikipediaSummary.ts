
import { useQuery } from "@tanstack/react-query";

export const useWikipediaSummary = (title?: string) => {
  return useQuery({
    queryKey: ["wikipedia-summary", title],
    queryFn: async () => {
      if (!title) return null;
      // Replace spaces with underscores for Wikipedia API
      const formattedTitle = title.replace(/\s+/g, "_");
      
      // First get the summary
      const summaryResp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formattedTitle)}`);
      if (!summaryResp.ok) throw new Error("Could not fetch Wikipedia summary");
      const summaryData = await summaryResp.json();
      
      // Then get the full page content to extract history section
      const sectionsResp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/segments/${encodeURIComponent(formattedTitle)}`);
      if (!sectionsResp.ok) throw new Error("Could not fetch Wikipedia sections");
      const sectionsData = await sectionsResp.json();
      
      // Find the history section
      const historySection = sectionsData.segments?.find((segment: any) => 
        segment.heading?.toLowerCase().includes('history')
      );

      return {
        summary: summaryData.extract,
        history: historySection?.text || null,
        url: summaryData.content_urls?.desktop?.page,
      };
    },
    enabled: !!title,
    staleTime: 1000 * 60 * 60, // 1 hour (to avoid spamming Wikipedia)
  });
};
