
import { useState, useEffect } from 'react';
import { Trophy, Users, Filter, ChevronDown, Award, Car } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DriverCard from '@/components/ui/DriverCard';
import { useDriverStandings } from '@/hooks/useDriverStandings';
import { useConstructorStandings } from '@/hooks/useConstructorStandings';
import { cn } from '@/lib/utils';
import { initScrollAnimations } from '@/lib/animation';

// Define seasons
const SEASONS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

const Standings = () => {
  const [activeTab, setActiveTab] = useState('drivers'); // 'drivers' or 'teams'
  const [selectedSeason, setSelectedSeason] = useState('2024');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Fetch data using our custom hooks
  const { driverStandings, loading: driversLoading } = useDriverStandings(selectedSeason);
  const { constructorStandings, loading: constructorsLoading } = useConstructorStandings(selectedSeason);

  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-f1-black to-f1-black/90 border-b border-f1-gray/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-fade-in">
              <div>
                <h1 className="text-3xl md:text-4xl font-formula font-bold text-white flex items-center mb-2">
                  <Trophy className="h-8 w-8 mr-3 text-f1-red" />
                  {activeTab === 'drivers' ? 'Driver Standings' : 'Constructor Standings'}
                </h1>
                <p className="text-gray-400">
                  Formula 1 {selectedSeason} season championship standings
                </p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0">
                <button 
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="inline-flex items-center bg-f1-gray/30 hover:bg-f1-gray/50 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform duration-200", isFiltersOpen && "transform rotate-180")} />
                </button>
              </div>
            </div>
            
            {/* Filters Panel */}
            <div className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden bg-f1-gray/10 rounded-md border border-f1-gray/20",
              isFiltersOpen ? "max-h-40 opacity-100 p-4 mb-6" : "max-h-0 opacity-0 p-0 border-transparent"
            )}>
              <div>
                <label className="block text-white text-sm mb-2">Season</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full sm:w-auto bg-f1-gray/20 border border-f1-gray/30 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-f1-red/50 transition-all duration-200"
                >
                  {SEASONS.map((season) => (
                    <option key={season} value={season}>
                      {season} Season
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-f1-gray/20 animate-fade-in">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('drivers')}
                  className={cn(
                    "py-3 px-1 font-medium border-b-2 transition-colors duration-200 flex items-center",
                    activeTab === 'drivers' 
                      ? "border-f1-red text-white" 
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-f1-gray/30"
                  )}
                >
                  <Award className={cn("h-5 w-5 mr-2", activeTab === 'drivers' ? "text-f1-red" : "text-gray-400")} />
                  Drivers
                </button>
                <button
                  onClick={() => setActiveTab('teams')}
                  className={cn(
                    "py-3 px-1 font-medium border-b-2 transition-colors duration-200 flex items-center",
                    activeTab === 'teams' 
                      ? "border-f1-red text-white" 
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-f1-gray/30"
                  )}
                >
                  <Car className={cn("h-5 w-5 mr-2", activeTab === 'teams' ? "text-f1-red" : "text-gray-400")} />
                  Constructors
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Standings Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Loading Indicator */}
          {(activeTab === 'drivers' && driversLoading) || (activeTab === 'teams' && constructorsLoading) ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin" />
            </div>
          ) : (
            <>
              {/* Drivers Standings */}
              {activeTab === 'drivers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {driverStandings.map((driver, index) => (
                    <div key={index} className="animate-on-scroll">
                      <DriverCard {...driver} />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Teams Standings */}
              {activeTab === 'teams' && (
                <div className="space-y-4">
                  {constructorStandings.map((team, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "bg-f1-gray/10 rounded-lg p-5 transition-all duration-300 hover:bg-f1-gray/20 border-l-4 animate-on-scroll",
                      )}
                      style={{ borderLeftColor: team.color }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-3xl font-formula font-bold text-white mr-5 w-10 text-center">
                            {team.position}
                          </div>
                          <div className="flex-shrink-0 h-16 w-16 relative">
                            <img 
                              src={team.logo} 
                              alt={team.name}
                              className="object-contain h-full w-full"
                              loading="lazy"
                            />
                          </div>
                          <div className="ml-5">
                            <h3 className="text-xl font-formula text-white">{team.name}</h3>
                            <p className="text-gray-400 text-sm">{team.nationality}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-formula font-bold text-white">
                            {team.points} PTS
                          </div>
                          <div className="text-gray-400 text-sm">
                            {team.wins} {team.wins === 1 ? 'Win' : 'Wins'}
                          </div>
                          {team.previousPosition && team.previousPosition !== team.position && (
                            <div className={cn(
                              "flex items-center justify-end text-xs mt-2",
                              team.previousPosition > team.position ? "text-green-500" : "text-red-500"
                            )}>
                              {team.previousPosition > team.position ? (
                                <>
                                  <span>+{team.previousPosition - team.position}</span>
                                  <ChevronDown className="h-3 w-3 ml-1 transform rotate-180" />
                                </>
                              ) : (
                                <>
                                  <span>-{team.position - team.previousPosition}</span>
                                  <ChevronDown className="h-3 w-3 ml-1" />
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Standings;
