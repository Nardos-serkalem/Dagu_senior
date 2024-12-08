import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, MapPin, Star, ChevronRight } from 'lucide-react';

const FeaturedPackages = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const packages = [
    {
      title: 'Historical Northern Circuit',
      image: '/Travel pictures/pictures/lalibela-rock-churches-ethiopia.jpg',
      duration: '8 Days',
      location: 'Lalibela, Axum, Gondar',
      rating: 4.9,
      price: 1899,
      description: 'Explore Ethiopia\'s ancient Christian kingdoms and rock-hewn churches.'
    },
    {
      title: 'Danakil Depression Adventure',
      image: '/Travel pictures/pictures/danakil-depression.jpg',
      duration: '4 Days',
      location: 'Afar Region',
      rating: 4.8,
      price: 1299,
      description: 'Journey through one of Earth\'s most unique and extreme landscapes.'
    },
    {
      title: 'Omo Valley Cultural Tour',
      image: '/Travel pictures/pictures/Omo-valley-pic-3.jpg',
      duration: '6 Days',
      location: 'Southern Ethiopia',
      rating: 4.7,
      price: 1599,
      description: 'Meet indigenous tribes and experience their unique way of life.'
    }
  ];

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular tours, carefully crafted to showcase the best of Ethiopia's
            diverse landscapes, rich culture, and historical wonders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card overflow-hidden group"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{pkg.rating}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
              
              <div className="flex items-center text-gray-600 mb-2 space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{pkg.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{pkg.location}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{pkg.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div className="text-primary">
                  <span className="text-2xl font-bold">${pkg.price}</span>
                  <span className="text-sm text-gray-600">/person</span>
                </div>
                <button className="btn-primary flex items-center">
                  Book Now
                  <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary" >
            <a ></a>
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;