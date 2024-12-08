import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Compass, Hotel, Car, Mountain, Coffee, Camera, 
  Users, Utensils 
} from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      icon: Compass,
      title: 'Guided Tours',
      description: 'Expert-led tours through Ethiopia\'s historical sites and natural wonders.'
    },
    {
      icon: Hotel,
      title: 'Luxury Accommodations',
      description: 'Carefully selected hotels and lodges that blend comfort with local charm.'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Modern, comfortable vehicles with experienced drivers for all terrains.'
    },
    {
      icon: Mountain,
      title: 'Adventure Tours',
      description: 'Thrilling experiences in Ethiopia\'s diverse landscapes.'
    },
    {
      icon: Coffee,
      title: 'Cultural Experiences',
      description: 'Authentic cultural immersion including traditional coffee ceremonies.'
    },
    {
      icon: Camera,
      title: 'Photography Tours',
      description: 'Specialized tours for capturing Ethiopia\'s stunning visuals.'
    },
    {
      icon: Users,
      title: 'Group Tours',
      description: 'Socially engaging tours with like-minded travelers.'
    },
    {
      icon: Utensils,
      title: 'Culinary Tours',
      description: 'Explore Ethiopia\'s rich culinary heritage and traditional dishes.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience Ethiopia like never before with our comprehensive range of travel services,
            designed to provide you with unforgettable memories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group"
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-secondary group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;