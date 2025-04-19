
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface SessionDriver {
  position: number;
  name: string;
  team: string;
  teamColor: string;
  bestLapTime: string;
  gap: string;
  laps: number;
}

interface SessionResultsProps {
  title: string;
  sessionType: 'practice' | 'qualifying' | 'race';
  drivers: SessionDriver[];
}

const SessionResults = ({ title, sessionType, drivers }: SessionResultsProps) => {
  return (
    <div className="bg-f1-gray/10 rounded-lg p-4 mb-6">
      <h3 className="text-xl font-formula text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Pos</TableHead>
              <TableHead className="text-white">Driver</TableHead>
              <TableHead className="text-white hidden md:table-cell">Team</TableHead>
              <TableHead className="text-white">Best Time</TableHead>
              <TableHead className="text-white">Gap</TableHead>
              <TableHead className="text-white hidden sm:table-cell">Laps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.position}>
                <TableCell className="font-formula text-lg text-white">
                  {driver.position}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div 
                      className="w-1 h-8 mr-3 rounded-sm"
                      style={{ backgroundColor: driver.teamColor }}
                    />
                    <span className="text-white">{driver.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300 hidden md:table-cell">
                  {driver.team}
                </TableCell>
                <TableCell className="text-white font-mono">
                  {driver.bestLapTime}
                </TableCell>
                <TableCell className="text-gray-300">
                  {driver.gap}
                </TableCell>
                <TableCell className="text-gray-300 hidden sm:table-cell">
                  {driver.laps}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SessionResults;
