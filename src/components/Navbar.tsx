import { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-1" />
              <span>+251 911 234 567</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-secondary">Facebook</a>
            <a href="#" className="hover:text-secondary">Instagram</a>
            <a href="#" className="hover:text-secondary">Twitter</a>
          </div>
        </div>
      </div>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-display font-bold text-primary"
            >
              Dagu
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Services', 'Packages', 'Gallery', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-secondary'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>

            <button
              className="md:hidden text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              {['Home', 'About', 'Services', 'Packages', 'Gallery', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-800 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/login" className="w-full btn-secondary">Login</Link>
                <Link to="/register" className="w-full btn-primary">Sign Up</Link>
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;