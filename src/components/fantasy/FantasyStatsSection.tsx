
import { Link } from 'react-router-dom';
import { ChevronRight, Users } from 'lucide-react';
import { useFantasyLeague } from '@/contexts/FantasyLeagueContext';
import FantasyStatsCard from '@/components/ui/FantasyStatsCard';
import { cn } from '@/lib/utils';

const FantasyStatsSection = () => {
  const { myTeams, leagueInfo, loading } = useFantasyLeague();

  if (loading) {
    return (
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-formula font-bold text-white">Fantasy F1 Stats</h2>
            <p className="text-gray-400 mt-2">Loading your fantasy teams...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2].map((item) => (
            <div key={item} className="h-64 bg-f1-gray/10 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-formula font-bold text-white">Fantasy F1 Stats</h2>
          <p className="text-gray-400 mt-2">
            Your teams in <span className="text-white">{leagueInfo.name}</span> ({leagueInfo.totalTeams} teams)
          </p>
        </div>
        <Link to="/fantasy" className="text-f1-red hover:text-f1-red/80 font-medium inline-flex items-center transition-colors duration-300">
          Fantasy Dashboard
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-on-scroll">
        {myTeams.map((team) => (
          <FantasyStatsCard key={team.id} team={team} />
        ))}
        
        <div className={cn(
          "bg-f1-red/10 border border-f1-red/30 rounded-lg p-5 flex flex-col items-center justify-center text-center",
          "min-h-[264px] cursor-pointer transition-all duration-300 hover:bg-f1-red/20"
        )}>
          <div className="h-16 w-16 bg-f1-red/20 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-f1-red" />
          </div>
          <h3 className="text-xl font-formula text-white mb-2">Create New Team</h3>
          <p className="text-gray-400 mb-4 max-w-xs">
            Join a league or create your own fantasy F1 team
          </p>
          <Link 
            to="/fantasy/create"
            className="inline-flex items-center bg-f1-red hover:bg-f1-red/90 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FantasyStatsSection;
