
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

  // Mock news data
  const mockNewsItems = [
    {
      id: 1,
      title: "Verstappen Claims Victory in Thrilling Dutch Grand Prix",
      excerpt: "Max Verstappen delighted his home crowd with a dominant performance at Zandvoort, extending his championship lead over Lewis Hamilton.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/68eyZ1B0/s1000/formula-1-dutch-gp-2023-max-ve.jpg",
      date: "Aug 27, 2023",
      time: "5:30 PM",
      category: "Race Report",
      url: "#",
    },
    {
      id: 2,
      title: "Mercedes Brings Major Upgrades to Italian Grand Prix",
      excerpt: "The Silver Arrows have arrived at Monza with a comprehensive upgrade package as they look to challenge Red Bull in the high-speed temple of speed.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0L1nLeMY/s1000/mercedes-w14-technical-detail.jpg",
      date: "Aug 30, 2023",
      time: "10:15 AM",
      category: "Technical",
      url: "#",
    },
    {
      id: 3,
      title: "Ferrari Hopeful for Home Success at Monza",
      excerpt: "Charles Leclerc and Carlos Sainz are optimistic about Ferrari's chances at their home race, following promising performance in practice sessions.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/2jXZgbd0/s1000/charles-leclerc-ferrari-sf-23-.jpg",
      date: "Aug 31, 2023",
      time: "2:45 PM",
      category: "Team News",
      url: "#",
    },
    {
      id: 4,
      title: "Hamilton: 'We're Getting Closer to Red Bull'",
      excerpt: "Lewis Hamilton believes Mercedes is narrowing the gap to Red Bull after recent performances suggest the Silver Arrows are making progress with their troublesome W14.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/Y99JQR8Y/s1000/lewis-hamilton-mercedes-f1-w14.jpg",
      date: "Sep 1, 2023",
      time: "9:20 AM",
      category: "Interview",
      url: "#",
    },
    {
      id: 5,
      title: "Norris Signs Contract Extension with McLaren",
      excerpt: "Lando Norris has committed his future to McLaren, signing a multi-year contract extension that will keep him at the Woking-based team beyond 2025.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/6D1nEAJ0/s1000/lando-norris-mclaren-f1-team-.jpg",
      date: "Aug 29, 2023",
      time: "11:45 AM",
      category: "Driver News",
      url: "#",
    },
    {
      id: 6,
      title: "FIA Introduces New Technical Directive for Floor Regulations",
      excerpt: "The sport's governing body has implemented a new technical directive aimed at preventing teams from exploiting flexible floor regulations.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/6AQ5Pnz0/s1000/fia-flags-1.jpg",
      date: "Aug 30, 2023",
      time: "3:30 PM",
      category: "Technical",
      url: "#",
    },
    {
      id: 7,
      title: "Alpine Team Principal Steps Down Amid Restructuring",
      excerpt: "Alpine F1 Team has announced a major restructuring of its leadership, with the team principal stepping down with immediate effect.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/68yN3N40/s1000/alpine-f1-team-logo-1.jpg",
      date: "Aug 28, 2023",
      time: "1:15 PM",
      category: "Team News",
      url: "#",
    },
    {
      id: 8,
      title: "Alonso: 'Aston Martin Can Fight for Championships in 2024'",
      excerpt: "Fernando Alonso has expressed confidence that Aston Martin will be in a position to challenge for championships next season following the team's impressive development trajectory.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0k7D47j0/s1000/fernando-alonso-aston-martin-f.jpg",
      date: "Sep 1, 2023",
      time: "10:30 AM",
      category: "Interview",
      url: "#",
    },
    {
      id: 9,
      title: "Opinion: F1's New Regulations Are a Step in the Right Direction",
      excerpt: "The 2022 regulation changes have delivered on their promise to create closer racing and more overtaking opportunities, but there's still work to be done.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/0L1G4OA0/s1000/formula-1-f1-logo-1.jpg",
      date: "Aug 27, 2023",
      time: "4:00 PM",
      category: "Opinion",
      url: "#",
    },
    {
      id: 10,
      title: "Williams Confirms Interest in Sainz for 2024 Seat",
      excerpt: "Williams team principal James Vowles has confirmed the team's interest in signing Carlos Sainz for the 2024 season as they look to strengthen their driver lineup.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/6Vxj3wA0/s1000/carlos-sainz-scuderia-ferrari-.jpg",
      date: "Aug 31, 2023",
      time: "12:20 PM",
      category: "Driver News",
      url: "#",
    },
    {
      id: 11,
      title: "Verstappen's Dominance Reminiscent of Schumacher Era, Says Brawn",
      excerpt: "Ross Brawn has drawn parallels between Max Verstappen's current dominance and Michael Schumacher's reign at Ferrari in the early 2000s.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/Y99E3ReY/s1000/max-verstappen-red-bull-racing.jpg",
      date: "Aug 28, 2023",
      time: "9:45 AM",
      category: "Opinion",
      url: "#",
    },
    {
      id: 12,
      title: "Red Bull Unveils Special Livery for Italian Grand Prix",
      excerpt: "Red Bull Racing has revealed a special one-off livery for the Italian Grand Prix, paying tribute to their power unit supplier Honda.",
      imageUrl: "https://cdn-1.motorsport.com/images/amp/2jXZd5d0/s1000/red-bull-racing-rb19-1.jpg",
      date: "Sep 1, 2023",
      time: "8:30 AM",
      category: "Team News",
      url: "#",
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
    }, 1000);
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
                  Latest F1 News
                </h1>
                <p className="text-gray-400">
                  Stay updated with the latest stories from the Formula 1 paddock
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
                    placeholder="Search news..."
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
