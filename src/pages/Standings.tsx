
import { useState, useEffect } from 'react';
import { Trophy, Users, Filter, ChevronDown, Award, Car } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DriverCard from '@/components/ui/DriverCard';
import { cn } from '@/lib/utils';

// Define seasons
const SEASONS = ['2023', '2022', '2021', '2020', '2019'];

interface Driver {
  position: number;
  name: string;
  team: string;
  nationality: string;
  points: number;
  wins: number;
  podiums: number;
  imageUrl: string;
  teamColor: string;
  previousPosition?: number;
}

interface Team {
  position: number;
  name: string;
  nationality: string;
  points: number;
  wins: number;
  color: string;
  logo: string;
  previousPosition?: number;
}

const Standings = () => {
  const [activeTab, setActiveTab] = useState('drivers'); // 'drivers' or 'teams'
  const [selectedSeason, setSelectedSeason] = useState('2023');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockDrivers: Driver[] = [
    {
      position: 1,
      name: "Max Verstappen",
      team: "Red Bull Racing",
      nationality: "Netherlands",
      points: 314,
      wins: 10,
      podiums: 13,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png",
      teamColor: "#0600EF",
      previousPosition: 1,
    },
    {
      position: 2,
      name: "Sergio Perez",
      team: "Red Bull Racing",
      nationality: "Mexico",
      points: 189,
      wins: 2,
      podiums: 8,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png",
      teamColor: "#0600EF",
      previousPosition: 4,
    },
    {
      position: 3,
      name: "Fernando Alonso",
      team: "Aston Martin",
      nationality: "Spain",
      points: 149,
      wins: 0,
      podiums: 6,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png",
      teamColor: "#006F62",
      previousPosition: 9,
    },
    {
      position: 4,
      name: "Lewis Hamilton",
      team: "Mercedes",
      nationality: "United Kingdom",
      points: 148,
      wins: 1,
      podiums: 4,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png",
      teamColor: "#00D2BE",
      previousPosition: 6,
    },
    {
      position: 5,
      name: "Charles Leclerc",
      team: "Ferrari",
      nationality: "Monaco",
      points: 143,
      wins: 0,
      podiums: 3,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png",
      teamColor: "#DC0000",
      previousPosition: 2,
    },
    {
      position: 6,
      name: "Carlos Sainz",
      team: "Ferrari",
      nationality: "Spain",
      points: 140,
      wins: 0,
      podiums: 3,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png",
      teamColor: "#DC0000",
      previousPosition: 5,
    },
    {
      position: 7,
      name: "George Russell",
      team: "Mercedes",
      nationality: "United Kingdom",
      points: 136,
      wins: 0,
      podiums: 2,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png",
      teamColor: "#00D2BE",
      previousPosition: 4,
    },
    {
      position: 8,
      name: "Lando Norris",
      team: "McLaren",
      nationality: "United Kingdom",
      points: 75,
      wins: 0,
      podiums: 2,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png",
      teamColor: "#FF8700",
      previousPosition: 7,
    },
    {
      position: 9,
      name: "Lance Stroll",
      team: "Aston Martin",
      nationality: "Canada",
      points: 47,
      wins: 0,
      podiums: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png",
      teamColor: "#006F62",
      previousPosition: 15,
    },
    {
      position: 10,
      name: "Pierre Gasly",
      team: "Alpine",
      nationality: "France",
      points: 37,
      wins: 0,
      podiums: 0,
      imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png",
      teamColor: "#0090FF",
      previousPosition: 14,
    },
  ];

  const mockTeams: Team[] = [
    {
      position: 1,
      name: "Red Bull Racing",
      nationality: "Austria",
      points: 503,
      wins: 12,
      color: "#0600EF",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/red-bull-racing.png.transform/2col-retina/image.png",
      previousPosition: 1,
    },
    {
      position: 2,
      name: "Mercedes",
      nationality: "Germany",
      points: 284,
      wins: 1,
      color: "#00D2BE",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/mercedes.png.transform/2col-retina/image.png",
      previousPosition: 3,
    },
    {
      position: 3,
      name: "Ferrari",
      nationality: "Italy",
      points: 283,
      wins: 0,
      color: "#DC0000",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/ferrari.png.transform/2col-retina/image.png",
      previousPosition: 2,
    },
    {
      position: 4,
      name: "Aston Martin",
      nationality: "United Kingdom",
      points: 196,
      wins: 0,
      color: "#006F62",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/aston-martin.png.transform/2col-retina/image.png",
      previousPosition: 7,
    },
    {
      position: 5,
      name: "McLaren",
      nationality: "United Kingdom",
      points: 103,
      wins: 0,
      color: "#FF8700",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/mclaren.png.transform/2col-retina/image.png",
      previousPosition: 5,
    },
    {
      position: 6,
      name: "Alpine",
      nationality: "France",
      points: 57,
      wins: 0,
      color: "#0090FF",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/alpine.png.transform/2col-retina/image.png",
      previousPosition: 4,
    },
    {
      position: 7,
      name: "Williams",
      nationality: "United Kingdom",
      points: 21,
      wins: 0,
      color: "#005AFF",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/williams.png.transform/2col-retina/image.png",
      previousPosition: 10,
    },
    {
      position: 8,
      name: "Haas F1 Team",
      nationality: "United States",
      points: 11,
      wins: 0,
      color: "#FFFFFF",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/haas-f1-team.png.transform/2col-retina/image.png",
      previousPosition: 8,
    },
    {
      position: 9,
      name: "Alfa Romeo",
      nationality: "Switzerland",
      points: 9,
      wins: 0,
      color: "#900000",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/alfa-romeo.png.transform/2col-retina/image.png",
      previousPosition: 6,
    },
    {
      position: 10,
      name: "AlphaTauri",
      nationality: "Italy",
      points: 3,
      wins: 0,
      color: "#2B4562",
      logo: "https://www.formula1.com/content/dam/fom-website/teams/2023/alphatauri.png.transform/2col-retina/image.png",
      previousPosition: 9,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      if (activeTab === 'drivers') {
        setDrivers(mockDrivers);
      } else {
        setTeams(mockTeams);
      }
      setLoading(false);
    }, 1000);
  }, [activeTab, selectedSeason]);

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
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin" />
            </div>
          )}
          
          {/* Drivers Standings */}
          {!loading && activeTab === 'drivers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver, index) => (
                <div key={index} className="animate-on-scroll">
                  <DriverCard {...driver} />
                </div>
              ))}
            </div>
          )}
          
          {/* Teams Standings */}
          {!loading && activeTab === 'teams' && (
            <div className="space-y-4">
              {teams.map((team, index) => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Standings;
