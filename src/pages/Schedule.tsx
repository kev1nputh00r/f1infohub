
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RaceCard from '@/components/ui/RaceCard';
import { useRaceSchedule } from '@/hooks/useRaceSchedule';
import { cn } from '@/lib/utils';
import { initScrollAnimations } from '@/lib/animation';

// Define time zones
const TIMEZONES = [
  { value: 'local', label: 'Local Time' },
  { value: 'utc', label: 'UTC' },
  { value: 'est', label: 'EST (UTC-5)' },
  { value: 'cet', label: 'CET (UTC+1)' },
  { value: 'jst', label: 'JST (UTC+9)' },
];

// Define seasons
const SEASONS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

const Schedule = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('local');
  const [selectedSeason, setSelectedSeason] = useState('2024');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past', 'all'
  
  // Fetch race schedule data
  const { races, loading } = useRaceSchedule(selectedSeason);
  
  // Filter races based on the active tab
  const filteredRaces = races.filter(race => {
    if (activeTab === 'upcoming') return race.isUpcoming;
    if (activeTab === 'past') return race.isPastRace;
    return true; // 'all' tab
  });

  // Adjust time based on selected timezone (simplified example)
  const adjustTime = (time: string, timezone: string) => {
    // This is a simplified example
    // In a real app, you would use a library like date-fns or moment-timezone
    if (timezone === 'local' || timezone === 'utc') return time;
    
    // Simplified timezone adjustment (just for display purposes)
    if (timezone === 'est') return '10:00 AM';
    if (timezone === 'cet') return '4:00 PM';
    if (timezone === 'jst') return '11:00 PM';
    
    return time;
  };

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
                  <Calendar className="h-8 w-8 mr-3 text-f1-red" />
                  Race Calendar
                </h1>
                <p className="text-gray-400">
                  Formula 1 {selectedSeason} season schedule and circuit information
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
              isFiltersOpen ? "max-h-60 opacity-100 p-4 mb-6" : "max-h-0 opacity-0 p-0 border-transparent"
            )}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-2">Season</label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="w-full bg-f1-gray/20 border border-f1-gray/30 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-f1-red/50 transition-all duration-200"
                  >
                    {SEASONS.map((season) => (
                      <option key={season} value={season}>
                        {season} Season
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-2">Timezone</label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full bg-f1-gray/20 border border-f1-gray/30 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-f1-red/50 transition-all duration-200"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-f1-red" />
                <p className="text-gray-400 text-sm">
                  All race times are shown in {TIMEZONES.find(tz => tz.value === selectedTimezone)?.label || 'Local Time'}.
                </p>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-f1-gray/20 animate-fade-in">
              <nav className="-mb-px flex space-x-4">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={cn(
                    "py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200",
                    activeTab === 'upcoming' 
                      ? "border-f1-red text-white" 
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-f1-gray/30"
                  )}
                >
                  Upcoming Races
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={cn(
                    "py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200",
                    activeTab === 'past' 
                      ? "border-f1-red text-white" 
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-f1-gray/30"
                  )}
                >
                  Past Races
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    "py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200",
                    activeTab === 'all' 
                      ? "border-f1-red text-white" 
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-f1-gray/30"
                  )}
                >
                  Full Season
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Race Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin" />
            </div>
          )}
          
          {/* No Results */}
          {!loading && filteredRaces.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Calendar className="h-16 w-16 text-f1-gray mb-4" />
              <h3 className="text-xl font-formula text-white mb-2">No Races Found</h3>
              <p className="text-gray-400 text-center max-w-md">
                No races available for the selected filters.
              </p>
              <button 
                onClick={() => setActiveTab('all')}
                className="mt-6 px-6 py-2 bg-f1-red hover:bg-f1-red/90 text-white rounded-md transition-colors duration-200"
              >
                View All Races
              </button>
            </div>
          )}
          
          {!loading && filteredRaces.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRaces.map((race) => (
                <div key={race.id} className="animate-on-scroll">
                  <RaceCard
                    {...race}
                    time={adjustTime(race.time, selectedTimezone)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Schedule;
