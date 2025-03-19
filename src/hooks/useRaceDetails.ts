
import { useQuery } from '@tanstack/react-query';
import { getRaceResults, getDriverImageUrl, getTeamColor, getTeamLogoUrl } from '@/services/ergastApi';
import { toast } from '@/components/ui/use-toast';

export const useRaceDetails = (season: string, round: string) => {
  const { data: raceDetails, isLoading, error } = useQuery({
    queryKey: ['raceDetails', season, round],
    queryFn: async () => {
      try {
        const data = await getRaceResults(season, round);
        
        if (!data) {
          return null;
        }

        // Find the winner (position 1)
        const winner = data.Results.find(result => result.position === '1');
        
        // Find the fastest lap
        let fastestLap = null;
        data.Results.forEach(result => {
          if (result.FastestLap && result.FastestLap.rank === '1') {
            fastestLap = {
              driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
              driverId: result.Driver.driverId,
              team: result.Constructor.name,
              lapNumber: result.FastestLap.lap,
              time: result.FastestLap.Time.time,
              speed: `${result.FastestLap.AverageSpeed.speed} ${result.FastestLap.AverageSpeed.units}`,
              driverImg: getDriverImageUrl(result.Driver.driverId),
              teamColor: getTeamColor(result.Constructor.name),
              teamLogo: getTeamLogoUrl(result.Constructor.constructorId)
            };
          }
        });
        
        // Format race details
        return {
          raceName: data.raceName,
          circuit: data.Circuit.circuitName,
          location: `${data.Circuit.Location.locality}, ${data.Circuit.Location.country}`,
          date: data.date,
          time: data.time,
          results: data.Results.map(result => ({
            position: result.position,
            driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
            driverId: result.Driver.driverId,
            team: result.Constructor.name,
            teamId: result.Constructor.constructorId,
            points: result.points,
            status: result.status,
            grid: result.grid,
            laps: result.laps,
            time: result.Time?.time || null,
            driverImg: getDriverImageUrl(result.Driver.driverId),
            teamColor: getTeamColor(result.Constructor.name),
            teamLogo: getTeamLogoUrl(result.Constructor.constructorId)
          })),
          winner: winner ? {
            driver: `${winner.Driver.givenName} ${winner.Driver.familyName}`,
            driverId: winner.Driver.driverId,
            team: winner.Constructor.name,
            teamId: winner.Constructor.constructorId,
            driverImg: getDriverImageUrl(winner.Driver.driverId),
            teamColor: getTeamColor(winner.Constructor.name),
            teamLogo: getTeamLogoUrl(winner.Constructor.constructorId)
          } : null,
          fastestLap
        };
      } catch (err) {
        console.error('Error fetching race details:', err);
        toast({
          title: "Error",
          description: `Failed to load race details for Round ${round} of ${season} season. Please try again later.`,
          variant: "destructive",
        });
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  return { raceDetails, loading: isLoading, error };
};
