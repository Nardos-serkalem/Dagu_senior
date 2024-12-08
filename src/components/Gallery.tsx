import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: '/Travel pictures/pictures/lalibela-rock-churches-ethiopia.jpg',
      title: 'Lalibela Rock Churches',
      category: 'Historical'
    },
    {
      url: '/Travel pictures/pictures/danakil-depression.jpg',
      title: 'Danakil Depression',
      category: 'Landscape'
    },
    {
      url: '/Travel pictures/pictures/Omo-valley-pic-3.jpg',
      title: 'Omo Valley Tribes',
      category: 'Cultural'
    },
    {
      url: '/Travel pictures/pictures/places-to-visit-in-ethiopia-simi.jpg',
      title: 'Simien Mountains',
      category: 'Nature'
    },
    {
      url: '/Travel pictures/pictures/danakil-depression.jpg',
      title: 'Traditional Coffee Ceremony',
      category: 'Cultural'
    },
    {
      url: '/Travel pictures/pictures/danakil-depression.jpg',
      title: 'Blue Nile Falls',
      category: 'Nature'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the breathtaking beauty of Ethiopia through our lens. From ancient churches
            to stunning landscapes and vibrant cultural celebrations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-lg">
                <img
                  src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
                  alt={image.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <span className="text-sm bg-primary px-3 py-1 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                className="absolute top-4 right-4 text-white hover:text-secondary"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img
                src={`${selectedImage}?auto=format&fit=crop&w=1600&q=80`}
                alt="Gallery preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;