import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PackageDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: pkg, isLoading } = useQuery({
    queryKey: ['package', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/packages/${id}`);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src={pkg.images[selectedImage]}
                  alt={pkg.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? pkg.images.length - 1 : prev - 1))}
                    className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === pkg.images.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {pkg.images.map((image: string, index: number) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img src={image} alt={`${pkg.title} ${index + 1}`} className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Package Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{pkg.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    {pkg.locations[0].name}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-1" />
                    {pkg.duration} days
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />
                    Max {pkg.maxGroupSize} people
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 text-yellow-400 fill-current" />
                    {pkg.rating} ({pkg.numReviews} reviews)
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p>{pkg.description}</p>
              </div>

              <div className="border-t border-b border-gray-200 py-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">What's Included</h2>
                <ul className="grid grid-cols-2 gap-4">
                  {pkg.includes.map((item: string) => (
                    <li key={item} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Price per person</p>
                    <p className="text-3xl font-bold text-gray-900">${pkg.price}</p>
                  </div>
                  <Link
                    to={`/booking/${pkg._id}`}
                    className="btn-primary flex items-center"
                  >
                    Book Now
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <p className="text-sm text-gray-600">
                  Next available date: {new Date(pkg.startDates[0]).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PackageDetails;