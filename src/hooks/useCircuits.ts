
import { useQuery } from "@tanstack/react-query";
import { getRaceSchedule } from "@/services/ergastApi";

export interface CircuitInfo {
  circuitId: string;
  circuitName: string;
  country: string;
  locality: string;
}

export const useCircuits = (season: string) => {
  return useQuery({
    queryKey: ["circuits", season],
    queryFn: async () => {
      const races = await getRaceSchedule(season);
      // Deduplicate circuits by circuitId
      const circuits = races.reduce((acc: Record<string, CircuitInfo>, race: any) => {
        const c = race.Circuit;
        if (!acc[c.circuitId]) {
          acc[c.circuitId] = {
            circuitId: c.circuitId,
            circuitName: c.circuitName,
            country: c.Location.country,
            locality: c.Location.locality,
          };
        }
        return acc;
      }, {});
      return Object.values(circuits);
    },
    refetchOnWindowFocus: false,
  });
};
