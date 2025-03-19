
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RaceCard from '@/components/ui/RaceCard';
import { cn } from '@/lib/utils';

// Define time zones
const TIMEZONES = [
  { value: 'local', label: 'Local Time' },
  { value: 'utc', label: 'UTC' },
  { value: 'est', label: 'EST (UTC-5)' },
  { value: 'cet', label: 'CET (UTC+1)' },
  { value: 'jst', label: 'JST (UTC+9)' },
];

// Define seasons
const SEASONS = ['2023', '2022', '2021', '2020', '2019'];

const Schedule = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('local');
  const [selectedSeason, setSelectedSeason] = useState('2023');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [races, setRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past', 'all'

  // Mock race data
  const mockRaces = [
    {
      id: 1,
      name: "Bahrain Grand Prix",
      circuit: "Bahrain International Circuit",
      country: "Bahrain",
      date: "March 5, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 2,
      name: "Saudi Arabian Grand Prix",
      circuit: "Jeddah Corniche Circuit",
      country: "Saudi Arabia",
      date: "March 19, 2023",
      time: "7:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 3,
      name: "Australian Grand Prix",
      circuit: "Albert Park",
      country: "Australia",
      date: "April 2, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 4,
      name: "Chinese Grand Prix",
      circuit: "Shanghai International Circuit",
      country: "China",
      date: "April 16, 2023",
      time: "2:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 5,
      name: "Miami Grand Prix",
      circuit: "Miami International Autodrome",
      country: "United States",
      date: "May 7, 2023",
      time: "3:30 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 6,
      name: "Emilia Romagna Grand Prix",
      circuit: "Imola",
      country: "Italy",
      date: "May 21, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 7,
      name: "Monaco Grand Prix",
      circuit: "Circuit de Monaco",
      country: "Monaco",
      date: "May 28, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 8,
      name: "Spanish Grand Prix",
      circuit: "Circuit de Barcelona-Catalunya",
      country: "Spain",
      date: "June 4, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 9,
      name: "Canadian Grand Prix",
      circuit: "Circuit Gilles-Villeneuve",
      country: "Canada",
      date: "June 18, 2023",
      time: "2:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 10,
      name: "Austrian Grand Prix",
      circuit: "Red Bull Ring",
      country: "Austria",
      date: "July 2, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 11,
      name: "British Grand Prix",
      circuit: "Silverstone",
      country: "United Kingdom",
      date: "July 9, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 12,
      name: "Hungarian Grand Prix",
      circuit: "Hungaroring",
      country: "Hungary",
      date: "July 23, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 13,
      name: "Belgian Grand Prix",
      circuit: "Spa-Francorchamps",
      country: "Belgium",
      date: "July 30, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 14,
      name: "Dutch Grand Prix",
      circuit: "Zandvoort",
      country: "Netherlands",
      date: "August 27, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/7col/image.png",
      isUpcoming: false,
      isPastRace: true,
    },
    {
      id: 15,
      name: "Italian Grand Prix",
      circuit: "Monza",
      country: "Italy",
      date: "September 3, 2023",
      time: "3:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
      isCurrentRace: true,
    },
    {
      id: 16,
      name: "Azerbaijan Grand Prix",
      circuit: "Baku City Circuit",
      country: "Azerbaijan",
      date: "September 17, 2023",
      time: "1:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Azerbaijan_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 17,
      name: "Singapore Grand Prix",
      circuit: "Marina Bay Street Circuit",
      country: "Singapore",
      date: "September 24, 2023",
      time: "8:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Singapore_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 18,
      name: "United States Grand Prix",
      circuit: "Circuit of The Americas",
      country: "United States",
      date: "October 22, 2023",
      time: "2:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/United_States_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 19,
      name: "Mexico City Grand Prix",
      circuit: "Autódromo Hermanos Rodríguez",
      country: "Mexico",
      date: "October 29, 2023",
      time: "2:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 20,
      name: "São Paulo Grand Prix",
      circuit: "Interlagos",
      country: "Brazil",
      date: "November 5, 2023",
      time: "1:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 21,
      name: "Las Vegas Grand Prix",
      circuit: "Las Vegas Street Circuit",
      country: "United States",
      date: "November 18, 2023",
      time: "10:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 22,
      name: "Qatar Grand Prix",
      circuit: "Losail International Circuit",
      country: "Qatar",
      date: "November 26, 2023",
      time: "5:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
    {
      id: 23,
      name: "Abu Dhabi Grand Prix",
      circuit: "Yas Marina Circuit",
      country: "UAE",
      date: "December 3, 2023",
      time: "5:00 PM",
      imageUrl: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/7col/image.png",
      isUpcoming: true,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      let filteredRaces = [...mockRaces];
      
      // Filter based on active tab
      if (activeTab === 'upcoming') {
        filteredRaces = filteredRaces.filter(race => race.isUpcoming);
      } else if (activeTab === 'past') {
        filteredRaces = filteredRaces.filter(race => race.isPastRace);
      }
      
      setRaces(filteredRaces);
      setLoading(false);
    }, 1000);
  }, [activeTab, selectedSeason, selectedTimezone]);

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
          {!loading && races.length === 0 && (
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
          
          {!loading && races.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {races.map((race) => (
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
