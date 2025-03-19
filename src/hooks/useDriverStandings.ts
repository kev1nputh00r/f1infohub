
import { useState, useEffect } from 'react';
import { getDriverStandings, DriverStanding, getTeamColor, getDriverImageUrl } from '@/services/ergastApi';
import { toast } from '@/components/ui/use-toast';

interface FormattedDriverStanding {
  position: number;
  name: string;
  team: string;
  nationality: string;
  points: number;
  wins: number;
  imageUrl: string;
  teamColor: string;
  previousPosition?: number; // This would be fetched from another API or database in a real app
}

export const useDriverStandings = (season: string) => {
  const [driverStandings, setDriverStandings] = useState<FormattedDriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDriverStandings = async () => {
      try {
        setLoading(true);
        const data = await getDriverStandings(season);
        
        // Transform the API data to match our application's format
        const formattedData: FormattedDriverStanding[] = data.map((driver: DriverStanding) => {
          const teamName = driver.Constructors[0]?.name || 'Unknown Team';
          
          return {
            position: parseInt(driver.position),
            name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            team: teamName,
            nationality: driver.Driver.nationality,
            points: parseFloat(driver.points),
            wins: parseInt(driver.wins),
            imageUrl: getDriverImageUrl(driver.Driver.driverId),
            teamColor: getTeamColor(teamName),
            // For demo purposes, we'll leave previousPosition undefined or set it to a random value
            previousPosition: Math.random() > 0.5 ? parseInt(driver.position) + (Math.random() > 0.5 ? 1 : -1) : undefined,
          };
        });
        
        setDriverStandings(formattedData);
      } catch (err) {
        console.error('Error fetching driver standings:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch driver standings'));
        toast({
          title: "Error",
          description: "Failed to load driver standings. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDriverStandings();
  }, [season]);

  return { driverStandings, loading, error };
};
