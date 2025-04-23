import { useQuery } from "@tanstack/react-query";

export const useWikipediaSummary = (title?: string) => {
  return useQuery({
    queryKey: ["wikipedia-summary", title],
    queryFn: async () => {
      if (!title) return null;

      const formattedTitle = title.replace(/\s+/g, "_");

      // Fetch summary
      const summaryResp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formattedTitle)}`);
      if (!summaryResp.ok) throw new Error("Could not fetch Wikipedia summary");
      const summaryData = await summaryResp.json();

      // Fetch full page content for sections
      const contentResp = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&format=json&origin=*&titles=${encodeURIComponent(formattedTitle)}`
      );
      if (!contentResp.ok) throw new Error("Could not fetch Wikipedia content");
      const contentData = await contentResp.json();

      // Grab page content
      const pages = contentData.query?.pages;
      const firstPage = pages ? Object.values(pages)[0] : null;
      const fullContent = (firstPage as any)?.extract || "";

      // Extract the "History" section
      const historyRegex = /==\s*History\s*==([\s\S]*?)(?=^==\s*\w|\Z)/im;
      const historyMatch = fullContent.match(historyRegex);
      const history = historyMatch ? historyMatch[1].trim() : null;

      return {
        summary: summaryData.extract,
        url: summaryData.content_urls?.desktop?.page,
        history,
      };
    },
    enabled: !!title,
    staleTime: 1000 * 60 * 60,
  });
};
