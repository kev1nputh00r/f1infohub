
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { getRaceSchedule, getRaceResults, getTeamColor, getDriverImageUrl } from '@/services/ergastApi';

interface RaceResult {
  round: string;
  raceName: string;
  date: string;
  results: Array<{
    position: string;
    driver: string;
    driverId: string;
    team: string;
    teamId: string;
    teamColor: string;
    driverImg: string;
  }>;
}

export const useRaceResults = (season: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['raceResults', season],
    queryFn: async () => {
      try {
        // First get the race schedule to know which races are available
        const raceSchedule = await getRaceSchedule(season);
        
        // For each race that has already happened, fetch results
        const races = await Promise.all(
          raceSchedule
            .filter(race => new Date(race.date) < new Date()) // Only past races
            .map(async (race) => {
              try {
                const raceData = await getRaceResults(season, race.round);
                
                if (!raceData) return null;
                
                return {
                  round: race.round,
                  raceName: raceData.raceName,
                  date: raceData.date,
                  results: raceData.results.map(result => ({
                    position: result.position,
                    driver: `${result.driver}`,
                    driverId: result.driverId,
                    team: result.team,
                    teamId: result.teamId,
                    teamColor: result.teamColor,
                    driverImg: result.driverImg,
                  })),
                };
              } catch (err) {
                console.error(`Error fetching results for race ${race.round}:`, err);
                return null;
              }
            })
        );
        
        // Filter out any null results (races with errors)
        return races.filter(Boolean) as RaceResult[];
      } catch (err) {
        console.error('Error fetching race results:', err);
        toast({
          title: "Error",
          description: `Failed to load race results for ${season} season. Please try again later.`,
          variant: "destructive",
        });
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  return {
    raceResults: data,
    loading: isLoading,
    error,
  };
};
