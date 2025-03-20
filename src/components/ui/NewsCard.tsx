
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  time: string;
  category: string;
  url: string;
  season?: string;
}

const NewsCard = ({
  title,
  excerpt,
  imageUrl,
  date,
  time,
  category,
  url,
  season = "2025",
}: NewsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-f1-gray/10 transition-all duration-300 h-full flex flex-col border border-f1-gray/20",
        isHovered && "transform scale-[1.02] shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-16 aspect-h-10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black/20 to-transparent z-10" />
        <img
          src={imageUrl || 'https://cdn-1.motorsport.com/images/amp/0L1G4OA0/s1000/formula-1-f1-logo-1.jpg'}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-in-out",
            isHovered && "scale-110"
          )}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://cdn-1.motorsport.com/images/amp/0L1G4OA0/s1000/formula-1-f1-logo-1.jpg';
          }}
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center rounded-full bg-f1-red/90 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
            {category}
          </span>
        </div>
        {season && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex items-center rounded-full bg-f1-black/80 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
              {season}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{time}</span>
          </div>
        </div>
        
        <h3 className="font-formula text-lg text-white mb-2 line-clamp-2 group-hover:text-f1-red transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-white bg-f1-gray hover:bg-f1-gray/80 rounded-md px-3 py-2 text-sm font-medium mt-auto group-hover:bg-f1-red transition-colors duration-300"
        >
          Read Full Article
          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
