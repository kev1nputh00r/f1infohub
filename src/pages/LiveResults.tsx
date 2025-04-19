import { useState, useEffect } from 'react';
import { Flag, Clock, ChevronDown, ChevronUp, Award, Gauge, RotateCcw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SessionResults from '@/components/ui/SessionResults';
import { cn } from '@/lib/utils';

interface Driver {
  position: number;
  name: string;
  team: string;
  teamColor: string;
  gap: string;
  lapTime: string;
  sector1: number;
  sector2: number;
  sector3: number;
  pitStops: number;
  status: 'racing' | 'pitted' | 'out';
  fastestLap: boolean;
}

const LiveResults = () => {
  const [activeSession, setActiveSession] = useState<'fp1' | 'fp2' | 'fp3' | 'qualifying' | 'race'>('race');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [lapCount, setLapCount] = useState(23);
  const [totalLaps, setTotalLaps] = useState(53);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [sortConfig, setSortConfig] = useState<{ key: keyof Driver; direction: 'ascending' | 'descending' }>({
    key: 'position',
    direction: 'ascending',
  });

  useEffect(() => {
    // Simulated data fetch
    const fetchData = () => {
      setLoading(true);
      
      // Mocked data to simulate a live API
      const mockDrivers: Driver[] = [
        {
          position: 1,
          name: 'Max Verstappen',
          team: 'Red Bull Racing',
          teamColor: '#0600EF',
          gap: 'LEADER',
          lapTime: '1:22.235',
          sector1: 28.432,
          sector2: 24.132,
          sector3: 29.671,
          pitStops: 1,
          status: 'racing',
          fastestLap: true,
        },
        {
          position: 2,
          name: 'Lewis Hamilton',
          team: 'Mercedes',
          teamColor: '#00D2BE',
          gap: '+2.351s',
          lapTime: '1:22.456',
          sector1: 28.543,
          sector2: 24.235,
          sector3: 29.678,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 3,
          name: 'Charles Leclerc',
          team: 'Ferrari',
          teamColor: '#DC0000',
          gap: '+5.782s',
          lapTime: '1:22.654',
          sector1: 28.721,
          sector2: 24.321,
          sector3: 29.612,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 4,
          name: 'Lando Norris',
          team: 'McLaren',
          teamColor: '#FF8700',
          gap: '+8.127s',
          lapTime: '1:22.754',
          sector1: 28.823,
          sector2: 24.298,
          sector3: 29.633,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 5,
          name: 'Carlos Sainz',
          team: 'Ferrari',
          teamColor: '#DC0000',
          gap: '+10.342s',
          lapTime: '1:22.954',
          sector1: 28.845,
          sector2: 24.421,
          sector3: 29.688,
          pitStops: 1,
          status: 'pitted',
          fastestLap: false,
        },
        {
          position: 6,
          name: 'George Russell',
          team: 'Mercedes',
          teamColor: '#00D2BE',
          gap: '+12.561s',
          lapTime: '1:23.154',
          sector1: 28.945,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 7,
          name: 'Sergio Perez',
          team: 'Red Bull Racing',
          teamColor: '#0600EF',
          gap: '+15.782s',
          lapTime: '1:23.254',
          sector1: 29.045,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 2,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 8,
          name: 'Fernando Alonso',
          team: 'Aston Martin',
          teamColor: '#006F62',
          gap: '+18.347s',
          lapTime: '1:23.354',
          sector1: 29.145,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 9,
          name: 'Oscar Piastri',
          team: 'McLaren',
          teamColor: '#FF8700',
          gap: '+22.561s',
          lapTime: '1:23.454',
          sector1: 29.245,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 10,
          name: 'Pierre Gasly',
          team: 'Alpine',
          teamColor: '#0090FF',
          gap: '+25.782s',
          lapTime: '1:23.554',
          sector1: 29.345,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 11,
          name: 'Esteban Ocon',
          team: 'Alpine',
          teamColor: '#0090FF',
          gap: '+28.347s',
          lapTime: '1:23.654',
          sector1: 29.445,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 12,
          name: 'Lance Stroll',
          team: 'Aston Martin',
          teamColor: '#006F62',
          gap: '+32.561s',
          lapTime: '1:23.754',
          sector1: 29.545,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 13,
          name: 'Yuki Tsunoda',
          team: 'AlphaTauri',
          teamColor: '#2B4562',
          gap: '+35.782s',
          lapTime: '1:23.854',
          sector1: 29.645,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 14,
          name: 'Valtteri Bottas',
          team: 'Alfa Romeo',
          teamColor: '#900000',
          gap: '+38.347s',
          lapTime: '1:23.954',
          sector1: 29.745,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 15,
          name: 'Zhou Guanyu',
          team: 'Alfa Romeo',
          teamColor: '#900000',
          gap: '+42.561s',
          lapTime: '1:24.054',
          sector1: 29.845,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 2,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 16,
          name: 'Kevin Magnussen',
          team: 'Haas F1 Team',
          teamColor: '#FFFFFF',
          gap: '+45.782s',
          lapTime: '1:24.154',
          sector1: 29.945,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 17,
          name: 'Nico Hulkenberg',
          team: 'Haas F1 Team',
          teamColor: '#FFFFFF',
          gap: '+48.347s',
          lapTime: '1:24.254',
          sector1: 30.045,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 18,
          name: 'Daniel Ricciardo',
          team: 'AlphaTauri',
          teamColor: '#2B4562',
          gap: '+52.561s',
          lapTime: '1:24.354',
          sector1: 30.145,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 2,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 19,
          name: 'Alexander Albon',
          team: 'Williams',
          teamColor: '#005AFF',
          gap: '+55.782s',
          lapTime: '1:24.454',
          sector1: 30.245,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'racing',
          fastestLap: false,
        },
        {
          position: 20,
          name: 'Logan Sargeant',
          team: 'Williams',
          teamColor: '#005AFF',
          gap: '+1 LAP',
          lapTime: '1:24.554',
          sector1: 30.345,
          sector2: 24.521,
          sector3: 29.688,
          pitStops: 1,
          status: 'out',
          fastestLap: false,
        },
      ];
      
      setDrivers(mockDrivers);
      setLapCount((prev) => Math.min(prev + 1, totalLaps));
      setLastUpdated(new Date());
      setLoading(false);
    };
    
    fetchData();
    
    // Simulated real-time updates
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalLaps]);
  
  const requestSort = (key: keyof Driver) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    setDrivers((prevDrivers) => {
      return [...prevDrivers].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };
  
  const getSortIconForColumn = (columnName: keyof Driver) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  
  const refreshData = () => {
    setLoading(true);
    // Simulated delay for refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  const sessions = {
    fp1: {
      title: "Practice 1",
      time: "Friday 11:30",
      completed: true,
      drivers: drivers.map(d => ({
        position: d.position,
        name: d.name,
        team: d.team,
        teamColor: d.teamColor,
        bestLapTime: d.lapTime,
        gap: d.gap,
        laps: 25
      }))
    },
    fp2: {
      title: "Practice 2",
      time: "Friday 15:00",
      completed: true,
      drivers: drivers.map(d => ({
        position: d.position,
        name: d.name,
        team: d.team,
        teamColor: d.teamColor,
        bestLapTime: d.lapTime,
        gap: d.gap,
        laps: 28
      }))
    },
    fp3: {
      title: "Practice 3",
      time: "Saturday 10:30",
      completed: true,
      drivers: drivers.map(d => ({
        position: d.position,
        name: d.name,
        team: d.team,
        teamColor: d.teamColor,
        bestLapTime: d.lapTime,
        gap: d.gap,
        laps: 22
      }))
    },
    qualifying: {
      title: "Qualifying",
      time: "Saturday 15:00",
      completed: true,
      drivers: drivers.map(d => ({
        position: d.position,
        name: d.name,
        team: d.team,
        teamColor: d.teamColor,
        bestLapTime: d.lapTime,
        gap: d.gap,
        laps: 18
      }))
    },
    race: {
      title: "Race",
      time: "Sunday 15:00",
      completed: false,
      drivers: drivers
    }
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
                <h1 className="text-3xl md:text-4xl font-formula font-bold text-white mb-2">
                  Italian Grand Prix - Live Results
                </h1>
                <p className="text-gray-400">
                  Monza Circuit, Italy
                </p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0">
                <button 
                  onClick={refreshData}
                  className="inline-flex items-center bg-f1-gray/30 hover:bg-f1-gray/50 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  <RotateCcw className={cn("h-4 w-4 mr-2", loading && "animate-spin-slow")} />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-f1-gray/10 rounded-lg p-4 flex items-center">
                <div className="bg-f1-red/20 rounded-full p-3 mr-4">
                  <Flag className="h-6 w-6 text-f1-red" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Race Progress</p>
                  <div className="flex items-baseline">
                    <span className="text-white text-xl font-formula font-bold">Lap {lapCount}</span>
                    <span className="text-gray-400 text-sm ml-1">/ {totalLaps}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-f1-gray/10 rounded-lg p-4 flex items-center">
                <div className="bg-f1-red/20 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6 text-f1-red" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white text-lg">
                    {lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="bg-f1-gray/10 rounded-lg p-4 flex items-center">
                <div className="bg-f1-red/20 rounded-full p-3 mr-4">
                  <Gauge className="h-6 w-6 text-f1-red" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Fastest Lap</p>
                  <p className="text-white text-lg">
                    Max Verstappen - 1:22.235
                  </p>
                </div>
              </div>
            </div>
            
            {/* Session Tabs */}
            <div className="flex flex-wrap gap-2 mt-6">
              {Object.entries(sessions).map(([key, session]) => (
                <button
                  key={key}
                  onClick={() => setActiveSession(key as typeof activeSession)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    activeSession === key
                      ? "bg-f1-red text-white"
                      : "bg-f1-gray/20 text-gray-300 hover:bg-f1-gray/30"
                  )}
                >
                  {session.title}
                  <span className="ml-2 text-xs opacity-70">{session.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative">
            {/* Loading Overlay */}
            <div className={cn(
              "absolute inset-0 flex items-center justify-center bg-f1-black/80 z-10 transition-opacity duration-300",
              loading ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin mb-4" />
                <p className="text-white font-medium">Updating results...</p>
              </div>
            </div>

            {/* Session Results */}
            {activeSession === 'race' ? (
              <div className="relative overflow-x-auto">
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center bg-f1-black/80 z-10 transition-opacity duration-300",
                  loading ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin mb-4" />
                    <p className="text-white font-medium">Updating results...</p>
                  </div>
                </div>
                
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-f1-gray/10 sticky top-0">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-4 py-3 cursor-pointer"
                        onClick={() => requestSort('position')}
                      >
                        <div className="flex items-center">
                          Pos
                          {getSortIconForColumn('position')}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3">Driver</th>
                      <th scope="col" className="px-4 py-3 hidden md:table-cell">Team</th>
                      <th 
                        scope="col" 
                        className="px-4 py-3"
                        onClick={() => requestSort('gap')}
                      >
                        <div className="flex items-center cursor-pointer">
                          Gap
                          {getSortIconForColumn('gap')}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 hidden lg:table-cell cursor-pointer"
                        onClick={() => requestSort('lapTime')}
                      >
                        <div className="flex items-center">
                          Last Lap
                          {getSortIconForColumn('lapTime')}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3 hidden xl:table-cell">Sectors</th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 hidden sm:table-cell cursor-pointer"
                        onClick={() => requestSort('pitStops')}
                      >
                        <div className="flex items-center">
                          Pit
                          {getSortIconForColumn('pitStops')}
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver, index) => (
                      <tr 
                        key={index} 
                        className={cn(
                          "border-b border-f1-gray/10 hover:bg-f1-gray/5 transition-colors duration-150",
                          driver.status === 'pitted' && "bg-f1-gray/20",
                          driver.status === 'out' && "bg-f1-gray/30 opacity-60"
                        )}
                      >
                        <td className="px-4 py-4 font-formula font-bold text-lg text-white">
                          {driver.position}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div 
                              className="w-1 h-8 mr-3 rounded-sm"
                              style={{ backgroundColor: driver.teamColor }}
                            />
                            <div>
                              <div className="font-medium text-white">
                                {driver.name}
                                {driver.fastestLap && (
                                  <span className="ml-2 inline-flex items-center rounded-full bg-purple-500/30 px-2 py-0.5 text-xs font-medium text-purple-200">
                                    <Award className="h-3 w-3 mr-1" />
                                    Fastest
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-300 hidden md:table-cell">
                          {driver.team}
                        </td>
                        <td className="px-4 py-4 font-medium text-white">
                          {driver.gap}
                        </td>
                        <td className="px-4 py-4 text-gray-300 hidden lg:table-cell">
                          {driver.lapTime}
                        </td>
                        <td className="px-4 py-4 hidden xl:table-cell">
                          <div className="flex space-x-1">
                            <div className="text-xs px-2 py-1 rounded bg-f1-gray/20 text-gray-300">
                              S1: <span className={driver.sector1 < 28.5 ? "text-purple-400" : driver.sector1 < 29 ? "text-green-400" : "text-white"}>
                                {driver.sector1}
                              </span>
                            </div>
                            <div className="text-xs px-2 py-1 rounded bg-f1-gray/20 text-gray-300">
                              S2: <span className={driver.sector2 < 24.2 ? "text-purple-400" : driver.sector2 < 24.3 ? "text-green-400" : "text-white"}>
                                {driver.sector2}
                              </span>
                            </div>
                            <div className="text-xs px-2 py-1 rounded bg-f1-gray/20 text-gray-300">
                              S3: <span className={driver.sector3 < 29.6 ? "text-purple-400" : driver.sector3 < 29.65 ? "text-green-400" : "text-white"}>
                                {driver.sector3}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-300 hidden sm:table-cell">
                          {driver.pitStops}
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            driver.status === 'racing' && "bg-green-500/20 text-green-400",
                            driver.status === 'pitted' && "bg-yellow-500/20 text-yellow-400",
                            driver.status === 'out' && "bg-red-500/20 text-red-400",
                          )}>
                            {driver.status === 'racing' ? 'Racing' : driver.status === 'pitted' ? 'Pit Stop' : 'Retired'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <SessionResults
                title={sessions[activeSession].title}
                sessionType={activeSession === 'qualifying' ? 'qualifying' : 'practice'}
                drivers={sessions[activeSession].drivers}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveResults;
