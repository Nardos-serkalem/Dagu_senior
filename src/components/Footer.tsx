import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" text-white"style={{
      backgroundImage: `url('/Travel pictures/pictures/erta-ale-volcano-is-a.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     backgroundRepeat: 'no-repeat',
     
    }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Dagu Travel</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for authentic Ethiopian travel experiences. Discover the beauty,
              culture, and history of Ethiopia with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Packages', 'Gallery', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Popular Tours</h4>
            <ul className="space-y-2">
              {[
                'Historical Northern Circuit',
                'Danakil Depression',
                'Omo Valley',
                'Simien Mountains',
                'Bale Mountains',
                'Coffee Tour'
              ].map((tour) => (
                <li key={tour}>
                  <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                    {tour}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-secondary"
              />
              <button type="submit" className="btn-secondary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Dagu Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;