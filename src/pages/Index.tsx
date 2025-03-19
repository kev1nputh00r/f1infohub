
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flag, Calendar, Trophy, Newspaper, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RaceCard from '@/components/ui/RaceCard';
import NewsCard from '@/components/ui/NewsCard';
import DriverCard from '@/components/ui/DriverCard';
import { useDriverStandings } from '@/hooks/useDriverStandings';
import { useConstructorStandings } from '@/hooks/useConstructorStandings';
import { useRaceSchedule } from '@/hooks/useRaceSchedule';
import { cn } from '@/lib/utils';
import { initScrollAnimations } from '@/lib/animation';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('2024');
  
  // Fetch data using our custom hooks
  const { driverStandings, loading: driversLoading } = useDriverStandings(selectedSeason);
  const { constructorStandings, loading: constructorsLoading } = useConstructorStandings(selectedSeason);
  const { races, loading: racesLoading } = useRaceSchedule(selectedSeason);

  // Get upcoming races only
  const upcomingRaces = races.filter(race => race.isUpcoming).slice(0, 3);
  
  // Top drivers (limited to 3 for the homepage)
  const topDrivers = driverStandings.slice(0, 3);

  // Latest news (mock data for now)
  const latestNews = [
    {
      title: "Hamilton Secures Pole Position at Monza",
      excerpt: "Lewis Hamilton delivered a stunning lap to secure pole position for the Italian Grand Prix, outpacing Max Verstappen and Charles Leclerc in a thrilling qualifying session.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/68eyZ1B0/s1000/lewis-hamilton-mercedes-f1-w14.jpg",
      date: "Aug 30, 2023",
      time: "4:30 PM",
      category: "Qualifying",
      url: "#",
    },
    {
      title: "Red Bull Unveils Upgrades for Italian GP",
      excerpt: "Red Bull Racing has brought significant aerodynamic upgrades to Monza as they aim to maintain their championship lead over Mercedes and Ferrari.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0L1nLeMY/s1000/red-bull-racing-rb19-technical.jpg",
      date: "Aug 29, 2023",
      time: "10:15 AM",
      category: "Technical",
      url: "#",
    },
    {
      title: "Ferrari Hopeful for Home Success",
      excerpt: "Charles Leclerc believes Ferrari has a strong chance of victory at their home race in Monza, following promising performance in practice sessions.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/2jXZgbd0/s1000/charles-leclerc-ferrari-sf-23-.jpg",
      date: "Aug 28, 2023",
      time: "2:45 PM",
      category: "Team News",
      url: "#",
    }
  ];

  useEffect(() => {
    // Animation on mount
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Initialize scroll animations
    const cleanup = initScrollAnimations();

    return () => {
      clearTimeout(timeout);
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-f1-black to-transparent z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
              style={{ objectPosition: "center 30%" }}
            >
              <source src="https://assets.formula1.com/video/vf1-production/key-moments/2023/monza-start.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className={cn(
              "max-w-3xl transition-all duration-700 transform",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="inline-flex items-center bg-f1-red px-4 py-1 rounded-md mb-6">
                <span className="font-formula text-white text-sm">F1 Season</span>
                <Select defaultValue={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="border-none bg-transparent text-white w-20 h-6 p-0 ml-2">
                    <SelectValue placeholder="Season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
                Experience the Thrill of Formula 1 Racing
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                Get real-time race results, driver standings, and the latest news from the world of Formula 1. Your ultimate F1 companion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/standings"
                  className="inline-flex items-center bg-f1-red hover:bg-f1-red/90 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Driver Standings
                </Link>
                <Link
                  to="/schedule"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-md font-medium transition-colors duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Race Calendar
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-f1-black">
              <path d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
            </svg>
          </div>
        </section>
        
        {/* Driver Standings Section */}
        <section className="py-20 bg-f1-gray/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-formula font-bold text-white">Driver Standings {selectedSeason}</h2>
                <p className="text-gray-400 mt-2">Current top performers in the championship</p>
              </div>
              <Link to="/standings" className="text-f1-red hover:text-f1-red/80 font-medium inline-flex items-center transition-colors duration-300">
                View All Standings
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
              {driversLoading ? (
                // Loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-f1-gray/10 rounded-lg p-5 h-40 animate-pulse"></div>
                ))
              ) : driverStandings.length > 0 ? (
                // Show top 3 drivers
                topDrivers.map((driver, index) => (
                  <DriverCard key={index} {...driver} />
                ))
              ) : (
                // No data state
                <div className="col-span-3 text-center py-10">
                  <p className="text-gray-400">No driver standings available for {selectedSeason} season yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Teams Standings Section */}
        <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-formula font-bold text-white">Constructor Standings {selectedSeason}</h2>
              <p className="text-gray-400 mt-2">Top performing teams in the championship</p>
            </div>
            <Link to="/standings" className="text-f1-red hover:text-f1-red/80 font-medium inline-flex items-center transition-colors duration-300">
              View All Teams
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4 animate-on-scroll">
            {constructorsLoading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-f1-gray/10 rounded-lg h-20 animate-pulse"></div>
              ))
            ) : constructorStandings.length > 0 ? (
              // Show top 3 teams
              constructorStandings.slice(0, 3).map((team, index) => (
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No data state
              <div className="text-center py-10">
                <p className="text-gray-400">No constructor standings available for {selectedSeason} season yet.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Upcoming Races Section */}
        <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-formula font-bold text-white">Upcoming Races</h2>
              <p className="text-gray-400 mt-2">Don't miss the action on these upcoming Grand Prix events</p>
            </div>
            <Link to="/schedule" className="text-f1-red hover:text-f1-red/80 font-medium inline-flex items-center transition-colors duration-300">
              View Full Calendar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {racesLoading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-f1-gray/10 rounded-lg h-72 animate-pulse"></div>
              ))
            ) : upcomingRaces.length > 0 ? (
              // Show upcoming races
              upcomingRaces.map((race, index) => (
                <RaceCard key={index} {...race} />
              ))
            ) : (
              // No upcoming races
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-400">No upcoming races available for {selectedSeason} season yet.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Latest News Section */}
        <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-formula font-bold text-white">Latest News</h2>
              <p className="text-gray-400 mt-2">Stay updated with the latest from the F1 paddock</p>
            </div>
            <Link to="/news" className="text-f1-red hover:text-f1-red/80 font-medium inline-flex items-center transition-colors duration-300">
              View All News
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {latestNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-f1-red/20 to-f1-gray/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll">
              <h2 className="text-3xl font-formula font-bold text-white mb-4">Never Miss a Race</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Subscribe to our newsletter and get race reminders, news updates, and exclusive content straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full sm:w-auto px-5 py-3 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-f1-red/50"
                />
                <button className="w-full sm:w-auto bg-f1-red hover:bg-f1-red/90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
