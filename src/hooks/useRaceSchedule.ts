
import { useState, useEffect } from 'react';
import { getRaceSchedule, Race, getCircuitImageUrl } from '@/services/ergastApi';
import { toast } from '@/components/ui/use-toast';
import { format, parseISO } from 'date-fns';

interface FormattedRace {
  id: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  time: string;
  imageUrl: string;
  isUpcoming: boolean;
  isPastRace: boolean;
  isCurrentRace?: boolean;
}

export const useRaceSchedule = (season: string) => {
  const [races, setRaces] = useState<FormattedRace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRaceSchedule = async () => {
      try {
        setLoading(true);
        const data = await getRaceSchedule(season);
        
        const today = new Date();
        
        // Transform the API data to match our application's format
        const formattedData: FormattedRace[] = data.map((race: Race, index) => {
          const raceDate = parseISO(`${race.date}T${race.time || '00:00:00'}`);
          const isPast = raceDate < today;
          
          // Check if this race is happening soon (within 2 days)
          const timeDiff = raceDate.getTime() - today.getTime();
          const dayDiff = timeDiff / (1000 * 3600 * 24);
          const isCurrent = dayDiff >= 0 && dayDiff <= 2;
          
          return {
            id: index + 1,
            name: race.raceName,
            circuit: race.Circuit.circuitName,
            country: race.Circuit.Location.country,
            date: format(raceDate, 'MMMM d, yyyy'),
            time: race.time ? format(raceDate, 'h:mm a') : 'TBA',
            imageUrl: getCircuitImageUrl(race.Circuit.circuitId),
            isUpcoming: !isPast,
            isPastRace: isPast,
            isCurrentRace: isCurrent,
          };
        });
        
        setRaces(formattedData);
      } catch (err) {
        console.error('Error fetching race schedule:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch race schedule'));
        toast({
          title: "Error",
          description: "Failed to load race schedule. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRaceSchedule();
  }, [season]);

  return { races, loading, error };
};
