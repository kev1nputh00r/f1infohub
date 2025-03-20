
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
  // Function to get a relevant sports news website based on category
  const getSportsNewsUrl = () => {
    // Map categories to relevant sports news websites
    const websiteMap: Record<string, string> = {
      'Race Report': 'https://www.formula1.com/en/latest/article.race-report.html',
      'Team News': 'https://www.autosport.com/f1/news/',
      'Driver News': 'https://www.motorsport.com/f1/news/',
      'Technical': 'https://the-race.com/formula-1/',
      'Opinion': 'https://www.racefans.net/category/regular-features/comment/',
      'Interview': 'https://racingnews365.com/f1-news',
    };
    
    return websiteMap[category] || 'https://www.formula1.com/en/latest.html';
  };

  return (
    <div className="rounded-lg bg-f1-gray/10 h-full flex flex-col border border-f1-gray/20">
      <div className="aspect-w-16 aspect-h-10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black/20 to-transparent z-10" />
        <img
          src={imageUrl || 'https://cdn-1.motorsport.com/images/amp/0L1G4OA0/s1000/formula-1-f1-logo-1.jpg'}
          alt={title}
          className="w-full h-full object-cover"
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
        
        <h3 className="font-formula text-lg text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {excerpt}
        </p>
        
        <a 
          href={getSportsNewsUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-white bg-f1-gray rounded-md px-3 py-2 text-sm font-medium mt-auto"
        >
          Read Full Article
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
