
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flag, Calendar, Trophy, Newspaper, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Clock className="w-5 h-5" /> },
    { name: 'Live Results', path: '/live', icon: <Flag className="w-5 h-5" /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Standings', path: '/standings', icon: <Trophy className="w-5 h-5" /> },
    { name: 'News', path: '/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'F1 History', path: '/history', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-f1-black/90 backdrop-blur-lg border-b border-f1-gray/20" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-f1-red flex items-center justify-center">
                <span className="font-formula text-white text-xl font-bold">F1</span>
              </div>
              <span className="ml-3 text-white font-formula text-xl">F1 InfoHub</span>
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center group",
                      location.pathname === link.path
                        ? "text-white bg-f1-red/20 border border-f1-red/40"
                        : "text-gray-300 hover:text-white hover:bg-f1-gray/20"
                    )}
                  >
                    <span className="flex items-center">
                      {link.icon}
                      <span className="ml-2">{link.name}</span>
                    </span>
                    {location.pathname === link.path && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-f1-red transform origin-left animate-slide-in" />
                    )}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-f1-red transform origin-left transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-f1-gray/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-f1-black/95 backdrop-blur-lg z-40 transition-all duration-300 transform",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="px-2 pt-24 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-3 py-4 rounded-md text-base font-medium transition-all duration-300 border-l-4",
                location.pathname === link.path
                  ? "bg-f1-gray/20 text-white border-f1-red"
                  : "text-gray-300 hover:bg-f1-gray/10 hover:text-white border-transparent"
              )}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                {link.icon}
                <span className="ml-3">{link.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
