import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/Travel pictures/pictures/bale-mountains-ethiopian-wolf-in.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
         
        }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            Discover Ethiopia's Hidden Treasures
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white mb-8"
          >
            Experience the rich culture, stunning landscapes, and ancient history of Ethiopia with our expertly curated tours.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="btn-primary flex items-center justify-center">
              Explore Packages
              <ChevronRight className="ml-2" size={20} />
            </button>
            <button className="btn-secondary">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  );
};

export default Hero;