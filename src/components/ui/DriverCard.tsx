
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Trophy, Flag, ArrowUp, ArrowDown } from 'lucide-react';

interface DriverCardProps {
  position: number;
  name: string;
  team: string;
  nationality: string;
  points: number;
  imageUrl: string;
  teamColor: string;
  previousPosition?: number;
}

const DriverCard = ({
  position,
  name,
  team,
  nationality,
  points,
  imageUrl,
  teamColor,
  previousPosition,
}: DriverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const positionChange = previousPosition ? previousPosition - position : 0;
  
  return (
    <div
      className={cn(
        "relative rounded-lg p-5 transition-all duration-300 overflow-hidden",
        isHovered ? "bg-f1-gray/20 transform scale-[1.02]" : "bg-f1-gray/10",
        "border-l-4",
      )}
      style={{
        borderLeftColor: teamColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden border-2 border-white/10">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-formula text-lg leading-tight">
                {name}
              </h3>
              <p className="text-gray-400 text-sm">
                {team}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {nationality}
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-3xl font-formula font-bold text-white">
                {position}
              </div>
              {positionChange !== 0 && (
                <div className={cn(
                  "flex items-center text-xs mt-1",
                  positionChange > 0 ? "text-green-500" : positionChange < 0 ? "text-red-500" : "text-gray-500"
                )}>
                  {positionChange > 0 ? (
                    <>
                      <ArrowUp className="h-3 w-3 mr-1" /> 
                      <span>+{positionChange}</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-3 w-3 mr-1" /> 
                      <span>{Math.abs(positionChange)}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <Trophy className="text-f1-red w-4 h-4 mr-2" />
          <span className="text-white font-formula">{points} PTS</span>
        </div>
        
        <button className="text-xs flex items-center bg-f1-gray/40 hover:bg-f1-red text-white px-3 py-1 rounded transition-colors duration-300">
          <Flag className="h-3 w-3 mr-1" />
          View Details
        </button>
      </div>
      
      {/* Decorative element */}
      <div 
        className={cn(
          "absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 transition-opacity duration-300",
        )}
        style={{ 
          backgroundColor: teamColor,
          opacity: isHovered ? 0.2 : 0.1 
        }}
      />
    </div>
  );
};

export default DriverCard;
