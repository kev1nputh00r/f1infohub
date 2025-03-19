
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-f1-black border-t border-f1-gray/20 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-f1-red flex items-center justify-center">
                <span className="font-formula text-white text-xl font-bold">F1</span>
              </div>
              <span className="ml-3 text-white font-formula text-xl">F1 InfoHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier destination for Formula 1 news, race results, and driver standings. Stay updated with the fastest sport on the planet.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/F1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/Formula1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/f1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/F1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-formula font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/live" className="text-gray-400 hover:text-white transition-colors">Live Results</Link></li>
              <li><Link to="/schedule" className="text-gray-400 hover:text-white transition-colors">Race Schedule</Link></li>
              <li><Link to="/standings" className="text-gray-400 hover:text-white transition-colors">Standings</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-formula font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">F1 History</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Teams</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Drivers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Circuits</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fantasy F1</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-formula font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Copyright</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-f1-gray/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} F1 InfoHub. All rights reserved. F1 and Formula 1 are trademarks of Formula One Licensing BV.
          </p>
          <button 
            onClick={scrollToTop} 
            className="mt-4 md:mt-0 flex items-center text-gray-400 hover:text-white transition-colors group"
          >
            <span className="mr-2 text-sm">Back to top</span>
            <ArrowUp className="h-4 w-4 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
