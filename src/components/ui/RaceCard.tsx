import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RaceCardProps {
  id: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  time: string;
  imageUrl: string;
  isUpcoming?: boolean;
  isPastRace?: boolean;
  isCurrentRace?: boolean;
  season: string;
  round: string;
}

const RaceCard = ({
  id,
  name,
  circuit,
  country,
  date,
  time,
  imageUrl,
  isUpcoming = false,
  isPastRace = false,
  isCurrentRace = false,
  season,
  round,
}: RaceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg h-72 group transition-all duration-300 transform",
        isHovered && "scale-[1.02] shadow-lg",
        isCurrentRace && "ring-2 ring-f1-red shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black/90 to-f1-black/40 z-10" />
        <img
          src={imageUrl}
          alt={circuit}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-in-out",
            isHovered && "scale-110"
          )}
          loading="lazy" 
        />
      </div>

      {/* Status Badge */}
      {isCurrentRace && (
        <div className="absolute top-4 right-4 z-20 rounded-full bg-f1-red px-3 py-1 text-xs font-semibold text-white shadow-lg animate-pulse-slow">
          LIVE
        </div>
      )}
      {isUpcoming && !isCurrentRace && (
        <div className="absolute top-4 right-4 z-20 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          UPCOMING
        </div>
      )}
      {isPastRace && (
        <div className="absolute top-4 right-4 z-20 rounded-full bg-f1-gray px-3 py-1 text-xs font-semibold text-white shadow-lg">
          COMPLETED
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <div className="space-y-3">
          <h3 className="text-xl text-white font-formula tracking-tight">
            {name}
          </h3>
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-f1-red" />
            <span>{circuit}, {country}</span>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center text-gray-200 text-xs bg-f1-gray/50 px-2 py-1 rounded">
              <Calendar className="w-3 h-3 mr-1 text-f1-red" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-gray-200 text-xs bg-f1-gray/50 px-2 py-1 rounded">
              <Clock className="w-3 h-3 mr-1 text-f1-red" />
              <span>{time}</span>
            </div>
          </div>
          <Link 
            to={`/races/${season}/${round}`}
            className="mt-3 flex items-center justify-center w-full bg-f1-red hover:bg-f1-red/90 text-white py-2 rounded transition-colors duration-300 text-sm font-medium"
          >
            <Flag className="w-4 h-4 mr-2" />
            {isCurrentRace ? "View Live Results" : isPastRace ? "View Results" : "View Details"}
          </Link>
        </div>
      </div>

      {/* Hover Effect */}
      <div
        className={cn(
          "absolute inset-0 bg-f1-red/10 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
      />
    </div>
  );
};

export default RaceCard;
