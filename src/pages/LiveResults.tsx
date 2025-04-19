import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SessionResults from '@/components/ui/SessionResults';
import LiveResultsHeader from '@/components/live-results/LiveResultsHeader';
import SessionTabs from '@/components/live-results/SessionTabs';
import RaceResults from '@/components/live-results/RaceResults';

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
    const fetchData = () => {
      setLoading(true);
      
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
  
  const refreshData = () => {
    setLoading(true);
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
        <LiveResultsHeader
          lapCount={lapCount}
          totalLaps={totalLaps}
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={refreshData}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <SessionTabs
            sessions={sessions}
            activeSession={activeSession}
            onSessionChange={(session) => setActiveSession(session as typeof activeSession)}
          />
          
          <div className="relative mt-6">
            {activeSession === 'race' ? (
              <RaceResults
                drivers={drivers}
                loading={loading}
                sortConfig={sortConfig}
                onSort={requestSort}
              />
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
