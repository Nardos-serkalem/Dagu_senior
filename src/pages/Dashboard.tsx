import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Package, MapPin, MessageSquare } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/users/dashboard-stats');
      return data;
    }
  });

  const { data: upcomingBookings } = useQuery({
    queryKey: ['upcomingBookings'],
    queryFn: async () => {
      const { data } = await axios.get('/api/bookings/upcoming');
      return data;
    }
  });

  const { data: recentPackages } = useQuery({
    queryKey: ['recentPackages'],
    queryFn: async () => {
      const { data } = await axios.get('/api/packages/recent');
      return data;
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Package,
              label: 'Total Bookings',
              value: stats?.totalBookings || 0,
              color: 'bg-primary/10 text-primary'
            },
            {
              icon: Calendar,
              label: 'Upcoming Trips',
              value: stats?.upcomingTrips || 0,
              color: 'bg-secondary/10 text-secondary'
            },
            {
              icon: MapPin,
              label: 'Places Visited',
              value: stats?.placesVisited || 0,
              color: 'bg-accent/10 text-accent'
            },
            {
              icon: MessageSquare,
              label: 'Unread Messages',
              value: stats?.unreadMessages || 0,
              color: 'bg-purple-100 text-purple-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Trips</h2>
          <div className="space-y-4">
            {upcomingBookings?.map((booking: any) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.package.images[0]}
                    alt={booking.package.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{booking.package.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Packages */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recently Added Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPackages?.map((pkg: any) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-3">
                  <img
                    src={pkg.images[0]}
                    alt={pkg.title}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-4 py-2 bg-white text-primary rounded-lg">
                      View Details
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {pkg.title}
                </h3>
                <p className="text-sm text-gray-600">${pkg.price} per person</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;