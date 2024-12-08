import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Calendar, Map } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Calendar, label: 'Years Experience', value: '15+' },
    { icon: Map, label: 'Destinations', value: '50+' },
    { icon: Award, label: 'Awards Won', value: '20+' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="section-title">About Dagu Travel</h2>
          <p className="text-lg text-gray-600 mb-8">
            Named after the ancient Ethiopian communication system "Dagu," we embody the spirit of
            connecting people through meaningful travel experiences. Our mission is to showcase
            Ethiopia's rich cultural heritage, stunning landscapes, and warm hospitality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="Travel pictures/pictures/Omo-valley-pic-2.jpg"
              alt="Ethiopian Culture"
              className="rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-display font-bold text-primary mb-6">
              Your Gateway to Authentic Ethiopian Experiences
            </h3>
            <p className="text-gray-600 mb-8">
              With over 15 years of experience, we specialize in crafting immersive journeys
              that go beyond typical tourist routes. Our expert guides and carefully curated
              itineraries ensure you experience the true essence of Ethiopia.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="font-bold text-2xl text-primary">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;