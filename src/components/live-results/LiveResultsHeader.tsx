
import React from 'react';
import { Flag, Clock, Gauge, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveResultsHeaderProps {
  lapCount: number;
  totalLaps: number;
  lastUpdated: Date;
  loading: boolean;
  onRefresh: () => void;
}

const LiveResultsHeader = ({
  lapCount,
  totalLaps,
  lastUpdated,
  loading,
  onRefresh
}: LiveResultsHeaderProps) => {
  return (
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
              onClick={onRefresh}
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
      </div>
    </div>
  );
};

export default LiveResultsHeader;

