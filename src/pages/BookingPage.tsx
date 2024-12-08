import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Users, CreditCard } from 'lucide-react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

const BookingPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState('');

  const { data: pkg, isLoading } = useQuery({
    queryKey: ['package', packageId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/packages/${packageId}`);
      return data;
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await axios.post('/api/bookings', bookingData);
      return data;
    },
    onSuccess: () => {
      navigate('/dashboard/bookings');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate({
      packageId,
      startDate,
      numberOfPeople,
      specialRequirements,
      totalPrice: pkg.price * numberOfPeople
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Trip</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src={pkg.images[0]}
                alt={pkg.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold text-gray-900 mt-4">{pkg.title}</h2>
              <p className="text-gray-600">{pkg.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Price per person</p>
                <p className="text-3xl font-bold text-gray-900">${pkg.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-lg font-semibold text-gray-900">{pkg.duration} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-lg font-semibold text-gray-900">{pkg.locations[0].name}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Number of People</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  required
                  min="1"
                  max={pkg.maxGroupSize}
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
              <textarea
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                rows={4}
                className="block w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Package Price</span>
                <span className="text-gray-900">${pkg.price} × {numberOfPeople}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${pkg.price * numberOfPeople}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={bookingMutation.isLoading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {bookingMutation.isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default BookingPage;