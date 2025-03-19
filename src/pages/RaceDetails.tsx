
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Flag, Timer, Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRaceDetails } from '@/hooks/useRaceDetails';
import { cn } from '@/lib/utils';
import { initScrollAnimations } from '@/lib/animation';
import { format, parseISO } from 'date-fns';

const RaceDetails = () => {
  const { season, round } = useParams<{ season: string; round: string }>();
  const { raceDetails, loading } = useRaceDetails(season || '2024', round || '1');
  
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-f1-black">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!raceDetails) {
    return (
      <div className="min-h-screen bg-f1-black">
        <Navbar />
        <div className="pt-20 container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
          <AlertCircle className="h-16 w-16 text-f1-red mb-4" />
          <h1 className="text-2xl md:text-3xl font-formula text-white mb-4 text-center">Race Details Not Available</h1>
          <p className="text-gray-400 text-center max-w-md mb-6">
            We couldn't find results for this race. It may not have taken place yet, or the data is not available.
          </p>
          <Link to="/schedule">
            <Button variant="default" className="bg-f1-red hover:bg-f1-red/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Race Calendar
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date and time
  const raceDate = raceDetails.date ? format(parseISO(`${raceDetails.date}T${raceDetails.time || '00:00:00Z'}`), 'MMMM d, yyyy') : 'Date unknown';
  const raceTime = raceDetails.time ? format(parseISO(`${raceDetails.date}T${raceDetails.time}`), 'h:mm a') : 'Time unknown';

  return (
    <div className="min-h-screen bg-f1-black">
      <Navbar />
      
      <main className="pt-20 pb-12">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/schedule">
            <Button variant="ghost" className="text-white hover:bg-f1-gray/20 p-0 h-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Race Calendar
            </Button>
          </Link>
        </div>
        
        {/* Race Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-formula text-white mb-2">
              {raceDetails.raceName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-6">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-f1-red" />
                <span>{raceDetails.location}</span>
              </div>
              <span className="text-f1-gray/60">•</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-f1-red" />
                <span>{raceDate}</span>
              </div>
              <span className="text-f1-gray/60">•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-f1-red" />
                <span>{raceTime}</span>
              </div>
            </div>
          </div>
          
          {/* Winner and Fastest Lap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Winner Card */}
            {raceDetails.winner && (
              <Card className="bg-f1-black border-f1-gray/30 animate-on-scroll">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-white">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                    Race Winner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full mr-4 border-2" style={{ borderColor: raceDetails.winner.teamColor }}>
                      <img 
                        src={raceDetails.winner.driverImg} 
                        alt={raceDetails.winner.driver}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-formula text-white">{raceDetails.winner.driver}</h3>
                      <div className="flex items-center mt-1">
                        <div className="h-4 w-4 mr-2 rounded-full overflow-hidden">
                          <img 
                            src={raceDetails.winner.teamLogo} 
                            alt={raceDetails.winner.team} 
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="text-gray-400">{raceDetails.winner.team}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Fastest Lap Card */}
            {raceDetails.fastestLap && (
              <Card className="bg-f1-black border-f1-gray/30 animate-on-scroll">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-white">
                    <Timer className="h-5 w-5 mr-2 text-purple-500" />
                    Fastest Lap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full mr-4 border-2" style={{ borderColor: raceDetails.fastestLap.teamColor }}>
                      <img 
                        src={raceDetails.fastestLap.driverImg} 
                        alt={raceDetails.fastestLap.driver}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-formula text-white">{raceDetails.fastestLap.driver}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <div className="flex items-center">
                          <div className="h-4 w-4 mr-2 rounded-full overflow-hidden">
                            <img 
                              src={raceDetails.fastestLap.teamLogo} 
                              alt={raceDetails.fastestLap.team} 
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-gray-400">{raceDetails.fastestLap.team}</span>
                        </div>
                        <div className="flex items-center">
                          <Timer className="h-3 w-3 mr-1 text-purple-500" />
                          <span className="text-white font-mono">{raceDetails.fastestLap.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Flag className="h-3 w-3 mr-1 text-purple-500" />
                          <span className="text-gray-400">Lap {raceDetails.fastestLap.lapNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Race Results Table */}
          <div className="animate-on-scroll">
            <h2 className="text-2xl font-formula text-white mb-4">Race Results</h2>
            <div className="rounded-md overflow-hidden border border-f1-gray/30">
              <Table>
                <TableHeader className="bg-f1-gray/20">
                  <TableRow className="border-f1-gray/30 hover:bg-f1-gray/30">
                    <TableHead className="text-white w-12 text-center">#</TableHead>
                    <TableHead className="text-white">Driver</TableHead>
                    <TableHead className="text-white">Team</TableHead>
                    <TableHead className="text-white text-right hidden md:table-cell">Grid</TableHead>
                    <TableHead className="text-white text-right hidden md:table-cell">Laps</TableHead>
                    <TableHead className="text-white text-right">Time/Status</TableHead>
                    <TableHead className="text-white text-right w-16">Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {raceDetails.results.map((result) => (
                    <TableRow 
                      key={result.position} 
                      className="border-f1-gray/30 hover:bg-f1-gray/30"
                    >
                      <TableCell className="font-formula text-white text-center">
                        {result.position}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div 
                            className="h-1.5 w-1.5 rounded-full mr-2"
                            style={{ backgroundColor: result.teamColor }}
                          />
                          <span className="text-white">{result.driver}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{result.team}</TableCell>
                      <TableCell className="text-right hidden md:table-cell text-gray-400">{result.grid}</TableCell>
                      <TableCell className="text-right hidden md:table-cell text-gray-400">{result.laps}</TableCell>
                      <TableCell className="text-right text-gray-400">
                        {result.time || result.status}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-white">
                        {parseInt(result.points) > 0 ? result.points : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RaceDetails;
