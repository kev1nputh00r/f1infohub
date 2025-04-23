
import { createContext, useState, useContext, ReactNode } from 'react';

export interface FantasyTeam {
  id: string;
  name: string;
  manager: string;
  points: number;
  rank: number;
  previousRank?: number;
  projection: number;
  teamValue: string;
}

interface DriverFantasyPoints {
  driverId: string;
  name: string;
  team: string;
  points: number;
  value: string;
}

interface FantasyLeagueData {
  myTeams: FantasyTeam[];
  leagueInfo: {
    name: string;
    totalTeams: number;
    leagueCode: string;
  };
  loading: boolean;
  driverPoints?: DriverFantasyPoints[];
}

const initialFantasyData: FantasyLeagueData = {
  myTeams: [
    {
      id: '1',
      name: 'Speed Demons',
      manager: 'You',
      points: 1876,
      rank: 3,
      previousRank: 5,
      projection: 2100,
      teamValue: '$103.5M'
    },
    {
      id: '2',
      name: 'Racing Bulls',
      manager: 'You',
      points: 1654,
      rank: 8,
      previousRank: 7,
      projection: 1950,
      teamValue: '$98.2M'
    }
  ],
  leagueInfo: {
    name: 'F1 Global Champions',
    totalTeams: 24,
    leagueCode: 'F1GC2024'
  },
  loading: false,
  // Sample driver points based on the 10-9-8... points system
  driverPoints: [
    { driverId: 'max_verstappen', name: 'Max Verstappen', team: 'Red Bull', points: 87, value: '$32.5M' },
    { driverId: 'charles_leclerc', name: 'Charles Leclerc', team: 'Ferrari', points: 73, value: '$28.2M' },
    { driverId: 'lando_norris', name: 'Lando Norris', team: 'McLaren', points: 69, value: '$26.8M' },
    { driverId: 'carlos_sainz', name: 'Carlos Sainz', team: 'Ferrari', points: 54, value: '$24.5M' },
    { driverId: 'lewis_hamilton', name: 'Lewis Hamilton', team: 'Mercedes', points: 48, value: '$27.0M' }
  ]
};

const FantasyLeagueContext = createContext<FantasyLeagueData>(initialFantasyData);

export const FantasyLeagueProvider = ({ children }: { children: ReactNode }) => {
  const [fantasyData] = useState<FantasyLeagueData>(initialFantasyData);

  return (
    <FantasyLeagueContext.Provider value={fantasyData}>
      {children}
    </FantasyLeagueContext.Provider>
  );
};

export const useFantasyLeague = () => useContext(FantasyLeagueContext);
