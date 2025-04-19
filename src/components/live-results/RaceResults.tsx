
import React from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Driver {
  position: number;
  name: string;
  team: string;
  teamColor: string;
  gap: string;
  lapTime: string;
  sector1: number;
  sector2: number;
  sector3: number;
  pitStops: number;
  status: 'racing' | 'pitted' | 'out';
  fastestLap: boolean;
}

interface RaceResultsProps {
  drivers: Driver[];
  loading: boolean;
  sortConfig: {
    key: keyof Driver;
    direction: 'ascending' | 'descending';
  };
  onSort: (key: keyof Driver) => void;
}

const RaceResults = ({ drivers, loading, sortConfig, onSort }: RaceResultsProps) => {
  const getSortIconForColumn = (columnName: keyof Driver) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="relative overflow-x-auto">
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-f1-black/80 z-10 transition-opacity duration-300",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin mb-4" />
          <p className="text-white font-medium">Updating results...</p>
        </div>
      </div>
      
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-f1-gray/10 sticky top-0">
          <tr>
            <th 
              scope="col" 
              className="px-4 py-3 cursor-pointer"
              onClick={() => onSort('position')}
            >
              <div className="flex items-center">
                Pos
                {getSortIconForColumn('position')}
              </div>
            </th>
            <th scope="col" className="px-4 py-3">Driver</th>
            <th scope="col" className="px-4 py-3 hidden md:table-cell">Team</th>
            <th 
              scope="col" 
              className="px-4 py-3"
              onClick={() => onSort('gap')}
            >
              <div className="flex items-center cursor-pointer">
                Gap
                {getSortIconForColumn('gap')}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-4 py-3 hidden lg:table-cell cursor-pointer"
              onClick={() => onSort('lapTime')}
            >
              <div className="flex items-center">
                Last Lap
                {getSortIconForColumn('lapTime')}
              </div>
            </th>
            <th scope="col" className="px-4 py-3 hidden xl:table-cell">Sectors</th>
            <th 
              scope="col" 
              className="px-4 py-3 hidden sm:table-cell cursor-pointer"
              onClick={() => onSort('pitStops')}
            >
              <div className="flex items-center">
                Pit
                {getSortIconForColumn('pitStops')}
              </div>
            </th>
            <th scope="col" className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr 
              key={index} 
              className={cn(
                "border-b border-f1-gray/10 hover:bg-f1-gray/5 transition-colors duration-150",
                driver.status === 'pitted' && "bg-f1-gray/20",
                driver.status === 'out' && "bg-f1-gray/30 opacity-60"
              )}
            >
              <td className="px-4 py-4 font-formula text-lg text-white">
                {driver.position}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div 
                    className="w-1 h-8 mr-3 rounded-sm"
                    style={{ backgroundColor: driver.teamColor }}
                  />
                  <div>
                    <div className="font-medium text-white">
                      {driver.name}
                      {driver.fastestLap && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-purple-500/30 px-2 py-0.5 text-xs font-medium text-purple-200">
                          <Award className="h-3 w-3 mr-1" />
                          Fastest
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-gray-300 hidden md:table-cell">
                {driver.team}
              </td>
              <td className="px-4 py-4 font-medium text-white">
                {driver.gap}
              </td>
              <td className="px-4 py-4 text-gray-300 hidden lg:table-cell">
                {driver.lapTime}
              </td>
              <td className="px-4 py-4 hidden xl:table-cell">
                <div className="flex space-x-1">
                  <div className="text-xs px-2 py-1 rounded bg-f1-gray/20 text-gray-300">
                    S1: <span className={driver.sector1 < 28.5 ? "text-purple-400" : driver.sector1 < 29 ? "text-green-400" : "text-white"}>
                      {driver.sector1}
                    </span>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-f1-gray/20 text-gray-300">
                    S2: <span className={driver.sector2 < 24.2 ? "text-purple-400" : driver.sector2 < 24.3 ? "text-green-400" : "text-white"}>
                      {driver.sector2}
                    </span>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-f1-gray/20 text-gray-300">
                    S3: <span className={driver.sector3 < 29.6 ? "text-purple-400" : driver.sector3 < 29.65 ? "text-green-400" : "text-white"}>
                      {driver.sector3}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-gray-300 hidden sm:table-cell">
                {driver.pitStops}
              </td>
              <td className="px-4 py-4">
                <span className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  driver.status === 'racing' && "bg-green-500/20 text-green-400",
                  driver.status === 'pitted' && "bg-yellow-500/20 text-yellow-400",
                  driver.status === 'out' && "bg-red-500/20 text-red-400",
                )}>
                  {driver.status === 'racing' ? 'Racing' : driver.status === 'pitted' ? 'Pit Stop' : 'Retired'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceResults;

