
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRaceResults } from '@/hooks/useRaceResults';

interface DriverPoints {
  driverId: string;
  name: string;
  teamName: string;
  teamColor: string;
  driverImg: string;
  points: number;
  finishes: Record<number, number>; // position -> number of times finished in that position
}

const calculateFantasyPoints = (position: number): number => {
  // Points for positions 1-10: 10 points for 1st, 9 for 2nd, etc.
  if (position >= 1 && position <= 10) {
    return 11 - position;
  }
  return 0;
};

const DriverPerformanceTable = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedSeason, setSelectedSeason] = useState(currentYear);
  
  const { raceResults, loading, error } = useRaceResults(selectedSeason);

  // Transform race results into driver points
  const driverPoints = raceResults?.reduce<Record<string, DriverPoints>>((acc, race) => {
    if (!race.results) return acc;

    race.results.forEach(result => {
      const position = parseInt(result.position);
      const points = calculateFantasyPoints(position);

      if (!acc[result.driverId]) {
        acc[result.driverId] = {
          driverId: result.driverId,
          name: result.driver,
          teamName: result.team,
          teamColor: result.teamColor,
          driverImg: result.driverImg,
          points: 0,
          finishes: {}
        };
      }

      // Add points for this position
      acc[result.driverId].points += points;
      
      // Record the finish position
      if (!acc[result.driverId].finishes[position]) {
        acc[result.driverId].finishes[position] = 0;
      }
      acc[result.driverId].finishes[position]++;
    });

    return acc;
  }, {}) || {};

  // Convert to array and sort by points
  const sortedDrivers = Object.values(driverPoints).sort((a, b) => b.points - a.points);

  const availableSeasons = ['2024', '2023', '2022', '2021', '2020'];

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900/20 rounded-lg border border-red-900/30">
        <h2 className="text-xl font-formula text-red-500 mb-2">Error Loading Data</h2>
        <p className="text-gray-400">Unable to load driver statistics. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-formula text-white">Driver Fantasy Points</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Season:</span>
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              {availableSeasons.map(season => (
                <SelectItem key={season} value={season}>{season}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-f1-gray/10 p-5 rounded-lg border border-f1-gray/20">
        <h3 className="text-white mb-4">Fantasy Points System</h3>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-center p-2 bg-f1-gray/20 rounded">
              <div className="font-bold">{i + 1}{getOrdinal(i + 1)}</div>
              <div className="text-xl font-formula text-f1-red">{10 - i}</div>
              <div className="text-xs text-gray-400">points</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-f1-gray/10 p-1 rounded-lg border border-f1-gray/20 overflow-hidden">
        <Table>
          <TableCaption>Driver fantasy points based on race finishes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Pos</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">Fantasy Points</TableHead>
              <TableHead className="text-center">Podiums</TableHead>
              <TableHead className="text-center">Top 10 Finishes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-6" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-4 w-10 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                </TableRow>
              ))
            ) : sortedDrivers.length > 0 ? (
              sortedDrivers.map((driver, index) => {
                // Calculate podiums and top 10s
                const podiums = (driver.finishes[1] || 0) + (driver.finishes[2] || 0) + (driver.finishes[3] || 0);
                const top10s = Object.entries(driver.finishes)
                  .filter(([pos]) => parseInt(pos) <= 10)
                  .reduce((sum, [_, count]) => sum + count, 0);
                
                return (
                  <TableRow key={driver.driverId}>
                    <TableCell className="font-bold">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img 
                          src={driver.driverImg} 
                          alt={driver.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span>{driver.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: driver.teamColor }}
                        />
                        {driver.teamName}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-formula text-lg">{driver.points}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-f1-gray/30">
                        {podiums}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-f1-gray/30">
                        {top10s}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                  No race data available for the {selectedSeason} season
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper function to get ordinal suffix for numbers
function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default DriverPerformanceTable;
