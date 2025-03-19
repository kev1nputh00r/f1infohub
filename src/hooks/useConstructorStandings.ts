
import { useState, useEffect } from 'react';
import { getConstructorStandings, ConstructorStanding, getTeamColor, getTeamLogoUrl } from '@/services/ergastApi';
import { toast } from '@/components/ui/use-toast';

interface FormattedConstructorStanding {
  position: number;
  name: string;
  nationality: string;
  points: number;
  wins: number;
  color: string;
  logo: string;
  previousPosition?: number; // This would be fetched from another API or database in a real app
}

export const useConstructorStandings = (season: string) => {
  const [constructorStandings, setConstructorStandings] = useState<FormattedConstructorStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConstructorStandings = async () => {
      try {
        setLoading(true);
        const data = await getConstructorStandings(season);
        
        // Transform the API data to match our application's format
        const formattedData: FormattedConstructorStanding[] = data.map((constructor: ConstructorStanding) => {
          return {
            position: parseInt(constructor.position),
            name: constructor.Constructor.name,
            nationality: constructor.Constructor.nationality,
            points: parseFloat(constructor.points),
            wins: parseInt(constructor.wins),
            color: getTeamColor(constructor.Constructor.name),
            logo: getTeamLogoUrl(constructor.Constructor.constructorId),
            // For demo purposes, we'll leave previousPosition undefined or set it to a random value
            previousPosition: Math.random() > 0.5 ? parseInt(constructor.position) + (Math.random() > 0.5 ? 1 : -1) : undefined,
          };
        });
        
        setConstructorStandings(formattedData);
      } catch (err) {
        console.error('Error fetching constructor standings:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch constructor standings'));
        toast({
          title: "Error",
          description: "Failed to load constructor standings. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConstructorStandings();
  }, [season]);

  return { constructorStandings, loading, error };
};
