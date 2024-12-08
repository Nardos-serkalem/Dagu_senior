import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Calendar,
  Map,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import axios from 'axios';
import { LineChart, BarChart } from '../charts';

const Analytics = () => {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const { data } = await axios.get('/api/admin/analytics');
      return data;
    }
  });

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: analyticsData?.revenueData || [],
        borderColor: '#8B4513',
        backgroundColor: 'rgba(139, 69, 19, 0.1)',
      }
    ]
  };

  const bookingsData = {
    labels: ['Historical', 'Adventure', 'Cultural', 'Nature', 'Combined'],
    datasets: [
      {
        label: 'Bookings by Category',
        data: analyticsData?.bookingsByCategory || [],
        backgroundColor: [
          '#8B4513',
          '#A0522D',
          '#654321',
          '#DAA520',
          '#B8860B'
        ],
      }
    ]
  };

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: analyticsData?.totalRevenue || 0,
      change: analyticsData?.revenueGrowth || 0,
      format: (val: number) => `$${val.toLocaleString()}`
    },
    {
      icon: Users,
      label: 'Total Users',
      value: analyticsData?.totalUsers || 0,
      change: analyticsData?.userGrowth || 0,
      format: (val: number) => val.toLocaleString()
    },
    {
      icon: Package,
      label: 'Active Packages',
      value: analyticsData?.activePackages || 0,
      change: analyticsData?.packageGrowth || 0,
      format: (val: number) => val.toLocaleString()
    },
    {
      icon: Calendar,
      label: 'Total Bookings',
      value: analyticsData?.totalBookings || 0,
      change: analyticsData?.bookingGrowth || 0,
      format: (val: number) => val.toLocaleString()
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className={`flex items-center ${
                stat.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change >= 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.format(stat.value)}
            </h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Trends</h2>
          <LineChart data={revenueData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Bookings by Category</h2>
          <BarChart data={bookingsData} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Destinations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyticsData?.popularDestinations?.map((destination: any) => (
            <div
              key={destination.name}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.bookings} bookings</p>
                <div className="flex items-center mt-1">
                  <Map className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{destination.region}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {analyticsData?.recentActivities?.map((activity: any) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center`}>
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;