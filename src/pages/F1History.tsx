
import { useState, useEffect } from 'react';
import { BookOpen, Trophy, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { initScrollAnimations } from '@/lib/animation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define champion data (mock data for now, would be fetched from API in a real app)
interface Champion {
  year: number;
  driver: string;
  team: string;
  wins: number;
  points: number;
  imageUrl: string;
}

const F1History = () => {
  const [selectedEra, setSelectedEra] = useState<string>('modern');
  const [expandedSection, setExpandedSection] = useState<string | null>('champions');
  const [loading, setLoading] = useState<boolean>(false);

  // Mock data for champions
  const champions: Champion[] = [
    {
      year: 2023,
      driver: 'Max Verstappen',
      team: 'Red Bull Racing',
      wins: 19,
      points: 575,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png',
    },
    {
      year: 2022,
      driver: 'Max Verstappen',
      team: 'Red Bull Racing',
      wins: 15,
      points: 454,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png',
    },
    {
      year: 2021,
      driver: 'Max Verstappen',
      team: 'Red Bull Racing',
      wins: 10,
      points: 395.5,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png',
    },
    {
      year: 2020,
      driver: 'Lewis Hamilton',
      team: 'Mercedes',
      wins: 11,
      points: 347,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
    },
    {
      year: 2019,
      driver: 'Lewis Hamilton',
      team: 'Mercedes',
      wins: 11,
      points: 413,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
    },
    {
      year: 2018,
      driver: 'Lewis Hamilton',
      team: 'Mercedes',
      wins: 11,
      points: 408,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
    },
    {
      year: 2017,
      driver: 'Lewis Hamilton',
      team: 'Mercedes',
      wins: 9,
      points: 363,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
    },
    {
      year: 2016,
      driver: 'Nico Rosberg',
      team: 'Mercedes',
      wins: 9,
      points: 385,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/N/NICROS01_Nico_Rosberg/nicros01.png.transform/2col/image.png',
    },
    {
      year: 2015,
      driver: 'Lewis Hamilton',
      team: 'Mercedes',
      wins: 10,
      points: 381,
      imageUrl: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
    },
  ];

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Filter champions by era
  const filteredChampions = () => {
    switch (selectedEra) {
      case 'modern':
        return champions.filter(c => c.year >= 2014);
      case 'v8':
        return champions.filter(c => c.year >= 2006 && c.year <= 2013);
      case 'ferrari':
        return champions.filter(c => c.year >= 2000 && c.year <= 2005);
      case 'classic':
        return champions.filter(c => c.year < 2000);
      default:
        return champions;
    }
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
                  <BookOpen className="h-8 w-8 mr-3 text-f1-red" />
                  Formula 1 History
                </h1>
                <p className="text-gray-400">
                  Discover the rich history and legacy of Formula 1 racing
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0">
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="bg-f1-gray/30 hover:bg-f1-gray/50 text-white px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-f1-red/50"
                >
                  <option value="modern">Modern Era (2014-Present)</option>
                  <option value="v8">V8 Era (2006-2013)</option>
                  <option value="ferrari">Ferrari Dominance (2000-2005)</option>
                  <option value="classic">Classic Era (Pre-2000)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Champions Section */}
          <div className="mb-8 animate-on-scroll">
            <div 
              className="flex items-center justify-between bg-f1-gray/10 p-4 rounded-t-lg cursor-pointer"
              onClick={() => toggleSection('champions')}
            >
              <div className="flex items-center">
                <Trophy className="text-f1-red h-6 w-6 mr-3" />
                <h2 className="text-2xl font-formula text-white">World Champions</h2>
              </div>
              {expandedSection === 'champions' ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </div>
            
            {expandedSection === 'champions' && (
              <div className="bg-f1-gray/5 p-4 rounded-b-lg border border-f1-gray/20 border-t-0">
                {loading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-f1-gray/20">
                            <TableHead className="text-white">Year</TableHead>
                            <TableHead className="text-white">Driver</TableHead>
                            <TableHead className="text-white">Team</TableHead>
                            <TableHead className="text-white text-right">Wins</TableHead>
                            <TableHead className="text-white text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredChampions().map((champion) => (
                            <TableRow 
                              key={champion.year}
                              className="hover:bg-f1-gray/10 border-b border-f1-gray/10"
                            >
                              <TableCell className="font-bold text-white">{champion.year}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img 
                                      src={champion.imageUrl} 
                                      alt={champion.driver} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="text-white">{champion.driver}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-300">{champion.team}</TableCell>
                              <TableCell className="text-right text-gray-300">{champion.wins}</TableCell>
                              <TableCell className="text-right text-gray-300">{champion.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {filteredChampions().length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-gray-400">No championship data available for this era.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Timeline Section */}
          <div className="mb-8 animate-on-scroll">
            <div 
              className="flex items-center justify-between bg-f1-gray/10 p-4 rounded-t-lg cursor-pointer"
              onClick={() => toggleSection('timeline')}
            >
              <div className="flex items-center">
                <Calendar className="text-f1-red h-6 w-6 mr-3" />
                <h2 className="text-2xl font-formula text-white">F1 Timeline</h2>
              </div>
              {expandedSection === 'timeline' ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </div>
            
            {expandedSection === 'timeline' && (
              <div className="bg-f1-gray/5 p-6 rounded-b-lg border border-f1-gray/20 border-t-0">
                <div className="relative pl-8 border-l-2 border-f1-red/50">
                  {/* Timeline items */}
                  <div className="mb-10 relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">1950: The Beginning of Formula 1</h3>
                    <p className="text-gray-300 mb-3">
                      The first Formula 1 World Championship race was held at Silverstone in the United Kingdom. Giuseppe Farina won the inaugural F1 race driving an Alfa Romeo.
                    </p>
                    <div className="h-40 bg-f1-gray/20 rounded-lg overflow-hidden">
                      <img 
                        src="https://www.formula1.com/content/dam/fom-website/manual/Misc/2019/Silverstone%201950.jpg.transform/9col/image.jpg" 
                        alt="First F1 race" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-10 relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">1960s: The Rise of British Teams</h3>
                    <p className="text-gray-300 mb-3">
                      British teams like Lotus, Cooper, and BRM dominated the sport, introducing innovations like mid-engine designs that revolutionized F1.
                    </p>
                  </div>
                  
                  <div className="mb-10 relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">1970s: Safety Improvements</h3>
                    <p className="text-gray-300 mb-3">
                      After several fatal accidents, the 1970s saw major safety improvements in F1, including mandatory crash structures, fire-resistant clothing, and improved circuits.
                    </p>
                  </div>
                  
                  <div className="mb-10 relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">1980s: The Turbo Era</h3>
                    <p className="text-gray-300 mb-3">
                      The introduction of turbocharged engines brought unprecedented power, with some qualifying engines producing over 1,500 horsepower before being banned in 1989.
                    </p>
                    <div className="h-40 bg-f1-gray/20 rounded-lg overflow-hidden">
                      <img 
                        src="https://www.formula1.com/content/dam/fom-website/manual/Misc/2019/TURBO_LEAD.jpg.transform/9col/image.jpg" 
                        alt="Turbo Era" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-10 relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">2000s: The Schumacher Dominance</h3>
                    <p className="text-gray-300 mb-3">
                      Michael Schumacher and Ferrari dominated F1, winning an unprecedented five consecutive championships from 2000 to 2004.
                    </p>
                  </div>
                  
                  <div className="mb-10 relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">2014: The Hybrid Era</h3>
                    <p className="text-gray-300 mb-3">
                      F1 introduced 1.6-liter V6 turbocharged hybrid power units, marking a new era of energy efficiency and technological innovation in the sport.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-f1-red flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">F1</span>
                    </div>
                    <h3 className="text-xl font-formula text-white mb-2">2022: New Regulations</h3>
                    <p className="text-gray-300 mb-3">
                      F1 introduced completely new cars designed to promote closer racing and more overtaking, featuring ground effect aerodynamics and simplified wings.
                    </p>
                    <div className="h-40 bg-f1-gray/20 rounded-lg overflow-hidden">
                      <img 
                        src="https://www.formula1.com/content/dam/fom-website/manual/Misc/2022manual/2022CarImages/2022%20F1%20car%203.jpg.transform/9col/image.jpg" 
                        alt="2022 F1 Car" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default F1History;
