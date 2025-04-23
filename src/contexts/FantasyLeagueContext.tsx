
import { createContext, useState, useContext, ReactNode } from 'react';
import { FantasyTeam } from '@/components/ui/FantasyStatsCard';

interface FantasyLeagueData {
  myTeams: FantasyTeam[];
  leagueInfo: {
    name: string;
    totalTeams: number;
    leagueCode: string;
  };
  loading: boolean;
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
  loading: false
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
