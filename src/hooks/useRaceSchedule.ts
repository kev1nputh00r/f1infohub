
import { useQuery } from '@tanstack/react-query';
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
  round: string; // Added round for race identification
}

export const useRaceSchedule = (season: string) => {
  const { data: races = [], isLoading: loading, error } = useQuery({
    queryKey: ['raceSchedule', season],
    queryFn: async () => {
      try {
        const data = await getRaceSchedule(season);
        
        const today = new Date();
        
        // Transform the API data to match our application's format
        const formattedData: FormattedRace[] = data.map((race: Race, index) => {
          const raceTime = race.time || '00:00:00Z';
          const raceDate = parseISO(`${race.date}T${raceTime}`);
          const isPast = raceDate < today;
          
          // Check if this race is happening soon (within 2 days)
          const timeDiff = raceDate.getTime() - today.getTime();
          const dayDiff = timeDiff / (1000 * 3600 * 24);
          const isCurrent = dayDiff >= 0 && dayDiff <= 2;
          
          return {
            id: index + 1,
            round: race.round, // Add the round from the API
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
        
        return formattedData;
      } catch (err) {
        console.error('Error fetching race schedule:', err);
        toast({
          title: "Error",
          description: "Failed to load race schedule. Please try again later.",
          variant: "destructive",
        });
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  return { races, loading, error };
};
