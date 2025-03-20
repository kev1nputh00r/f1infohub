
import { useState, useEffect } from 'react';
import { Newspaper, Search, Filter, Tag, Calendar, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/ui/NewsCard';
import { cn } from '@/lib/utils';

// Define categories
const CATEGORIES = ['All', 'Race Report', 'Team News', 'Driver News', 'Technical', 'Opinion', 'Interview'];

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock 2025 news data
  const mockNewsItems = [
    {
      id: 1,
      title: "Lando Norris Dominates Season Opener in Bahrain",
      excerpt: "Lando Norris secured a dominant victory at the 2025 Bahrain Grand Prix, leading from pole to flag as McLaren sets the pace for the new season.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/68eyZ1B0/s1000/formula-1-dutch-gp-2023-max-ve.jpg",
      date: "Mar 2, 2025",
      time: "5:30 PM",
      category: "Race Report",
      url: "#",
      season: "2025"
    },
    {
      id: 2,
      title: "Ferrari Unveils Revolutionary Aerodynamic Package",
      excerpt: "Ferrari has introduced a radical new floor and diffuser design that they believe will challenge McLaren's early season advantage at the Saudi Arabian GP.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0L1nLeMY/s1000/mercedes-w14-technical-detail.jpg",
      date: "Mar 5, 2025",
      time: "10:15 AM",
      category: "Technical",
      url: "#",
      season: "2025"
    },
    {
      id: 3,
      title: "Red Bull Racing Addresses Early Season Performance Gaps",
      excerpt: "After a challenging start to the 2025 season, Red Bull Racing's technical director reveals plans to recover their performance advantage.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/2jXZgbd0/s1000/charles-leclerc-ferrari-sf-23-.jpg",
      date: "Mar 6, 2025",
      time: "2:45 PM",
      category: "Team News",
      url: "#",
      season: "2025"
    },
    {
      id: 4,
      title: "Hamilton: 'Mercedes Finally Has a Car We Can Fight With'",
      excerpt: "Lewis Hamilton expresses confidence in Mercedes' 2025 challenger after securing a podium in the season opener, marking a significant improvement over their 2024 form.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/Y99JQR8Y/s1000/lewis-hamilton-mercedes-f1-w14.jpg",
      date: "Mar 3, 2025",
      time: "9:20 AM",
      category: "Interview",
      url: "#",
      season: "2025"
    },
    {
      id: 5,
      title: "Bearman Impresses in Sauber Debut",
      excerpt: "Oliver Bearman has made a strong impression in his full-time Formula 1 debut, scoring points for Sauber in his first race of the 2025 season.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/6D1nEAJ0/s1000/lando-norris-mclaren-f1-team-.jpg",
      date: "Mar 4, 2025",
      time: "11:45 AM",
      category: "Driver News",
      url: "#",
      season: "2025"
    },
    {
      id: 6,
      title: "FIA Introduces New DRS Activation Rules for 2025",
      excerpt: "The sport's governing body has implemented new DRS regulations aimed at improving racing without making overtaking too easy.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/6AQ5Pnz0/s1000/fia-flags-1.jpg",
      date: "Mar 7, 2025",
      time: "3:30 PM",
      category: "Technical",
      url: "#",
      season: "2025"
    },
    {
      id: 7,
      title: "Alpine Shows Signs of Resurgence Under New Leadership",
      excerpt: "After a difficult 2024 campaign, Alpine appears to have turned a corner with their new technical structure yielding immediate results in 2025.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/68yN3N40/s1000/alpine-f1-team-logo-1.jpg",
      date: "Mar 5, 2025",
      time: "1:15 PM",
      category: "Team News",
      url: "#",
      season: "2025"
    },
    {
      id: 8,
      title: "Alonso: '2025 Could Be My Final Season in Formula 1'",
      excerpt: "Fernando Alonso has hinted that the 2025 season might be his last in Formula 1, as he evaluates his future in motorsport at the age of 43.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0k7D47j0/s1000/fernando-alonso-aston-martin-f.jpg",
      date: "Mar 8, 2025",
      time: "10:30 AM",
      category: "Interview",
      url: "#",
      season: "2025"
    },
    {
      id: 9,
      title: "Opinion: The 2025 Season Already Promises More Competition",
      excerpt: "After just one race, the 2025 Formula 1 season is shaping up to be one of the most competitive in recent history with four teams in genuine contention.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0L1G4OA0/s1000/formula-1-f1-logo-1.jpg",
      date: "Mar 4, 2025",
      time: "4:00 PM",
      category: "Opinion",
      url: "#",
      season: "2025"
    },
    {
      id: 10,
      title: "Haas Confirms Interest in Zhou for 2026 Seat",
      excerpt: "Haas team principal has confirmed the team's interest in retaining Zhou Guanyu for 2026 following his strong start to the 2025 campaign.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/6Vxj3wA0/s1000/carlos-sainz-scuderia-ferrari-.jpg",
      date: "Mar 6, 2025",
      time: "12:20 PM",
      category: "Driver News",
      url: "#",
      season: "2025"
    },
    {
      id: 11,
      title: "Norris's Performance Reminiscent of Early Hamilton Era, Says Brawn",
      excerpt: "Ross Brawn has drawn parallels between Lando Norris's current form and Lewis Hamilton's early dominance with McLaren after his impressive start to 2025.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/Y99E3ReY/s1000/max-verstappen-red-bull-racing.jpg",
      date: "Mar 7, 2025",
      time: "9:45 AM",
      category: "Opinion",
      url: "#",
      season: "2025"
    },
    {
      id: 12,
      title: "McLaren Unveils Special Livery for Saudi Arabian Grand Prix",
      excerpt: "McLaren Racing has revealed a special one-off livery for the Saudi Arabian Grand Prix, celebrating their new title sponsor's Middle Eastern heritage.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/2jXZd5d0/s1000/red-bull-racing-rb19-1.jpg",
      date: "Mar 8, 2025",
      time: "8:30 AM",
      category: "Team News",
      url: "#",
      season: "2025"
    },
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      const filteredNews = mockNewsItems
        .filter((item) => 
          selectedCategory === 'All' || item.category === selectedCategory
        )
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      setNewsItems(filteredNews.slice(0, page * 6));
      setHasMore(filteredNews.length > page * 6);
      setLoading(false);
    }, 800);
  }, [selectedCategory, searchTerm, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-f1-black to-f1-black/90 border-b border-f1-gray/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 animate-fade-in">
              <div>
                <h1 className="text-3xl md:text-4xl font-formula font-bold text-white flex items-center mb-2">
                  <Newspaper className="h-8 w-8 mr-3 text-f1-red" />
                  2025 F1 News
                </h1>
                <p className="text-gray-400">
                  Stay updated with the latest stories from the 2025 Formula 1 season
                </p>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-6 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search 2025 news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full bg-f1-gray/10 border border-f1-gray/20 rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-f1-red/50 transition-all duration-200"
                  />
                </div>
                
                <div className="md:w-auto">
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-f1-gray/20 hover:bg-f1-gray/30 text-white rounded-md transition-colors duration-200"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                    <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform duration-200", isFiltersOpen && "transform rotate-180")} />
                  </button>
                </div>
              </div>
              
              {/* Filters Panel */}
              <div className={cn(
                "mt-4 bg-f1-gray/10 rounded-md border border-f1-gray/20 p-4 transition-all duration-300 ease-in-out overflow-hidden",
                isFiltersOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 p-0 border-transparent"
              )}>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="flex items-center text-white mb-2 text-sm">
                      <Tag className="h-4 w-4 mr-2 text-f1-red" />
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "px-3 py-1 rounded-full text-sm transition-colors duration-200",
                            selectedCategory === category 
                              ? "bg-f1-red text-white" 
                              : "bg-f1-gray/20 text-gray-300 hover:bg-f1-gray/30"
                          )}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-white mb-2 text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-f1-red" />
                      Date Range
                    </label>
                    <div className="flex gap-2">
                      <select className="bg-f1-gray/20 border border-f1-gray/30 text-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-f1-red/50 transition-all duration-200">
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* News Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Loading Indicator */}
          {loading && newsItems.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="h-12 w-12 rounded-full border-4 border-f1-red border-t-transparent animate-spin" />
            </div>
          )}
          
          {/* No Results */}
          {!loading && newsItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Newspaper className="h-16 w-16 text-f1-gray mb-4" />
              <h3 className="text-xl font-formula text-white mb-2">No News Found</h3>
              <p className="text-gray-400 text-center max-w-md">
                No news articles match your current search criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-6 px-6 py-2 bg-f1-red hover:bg-f1-red/90 text-white rounded-md transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <div key={news.id} className="animate-on-scroll">
                <NewsCard {...news} />
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && !loading && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                className="bg-f1-gray/20 hover:bg-f1-gray/30 text-white px-8 py-3 rounded-md transition-colors duration-200"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
