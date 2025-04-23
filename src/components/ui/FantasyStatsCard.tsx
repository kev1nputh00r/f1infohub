
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface FantasyStatsCardProps {
  team: FantasyTeam;
  className?: string;
}

const FantasyStatsCard = ({ team, className }: FantasyStatsCardProps) => {
  // Calculate rank change
  const rankChange = team.previousRank ? team.previousRank - team.rank : 0;
  
  return (
    <div className={cn(
      "bg-f1-gray/10 border border-f1-gray/20 rounded-lg p-5 transition-all duration-300 hover:bg-f1-gray/20",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-f1-red/20 flex items-center justify-center rounded-full">
            <Trophy className="h-6 w-6 text-f1-red" />
          </div>
          <div className="ml-4">
            <h3 className="font-formula text-lg text-white">{team.name}</h3>
            <p className="text-gray-400 text-sm">Managed by {team.manager}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-formula text-white">{team.points}</div>
          <div className="text-sm text-gray-400">Total Points</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-f1-gray/20 p-3 rounded">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Rank</p>
            {rankChange !== 0 && (
              <span className={cn(
                "text-xs rounded-full px-2 py-0.5 flex items-center",
                rankChange > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              )}>
                {rankChange > 0 ? '+' : ''}{rankChange}
              </span>
            )}
          </div>
          <p className="text-xl font-formula text-white mt-1">{team.rank}</p>
        </div>
        <div className="bg-f1-gray/20 p-3 rounded">
          <p className="text-gray-400 text-sm">Projection</p>
          <div className="flex items-center mt-1">
            <p className="text-xl font-formula text-white">{team.projection}</p>
            <TrendingUp className="h-4 w-4 text-green-400 ml-2" />
          </div>
        </div>
        <div className="bg-f1-gray/20 p-3 rounded">
          <p className="text-gray-400 text-sm">Team Value</p>
          <p className="text-xl font-formula text-white mt-1">{team.teamValue}</p>
        </div>
      </div>
    </div>
  );
};

export default FantasyStatsCard;
