import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  Calendar,
  DollarSign,
  TrendingUp,
  Map,
  Car,
  Building2,
} from 'lucide-react';
import axios from 'axios';
import { LineChart, BarChart } from '../charts';

const AdminOverview = () => {
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/admin/stats');
      return data;
    }
  });

  const statCards = [
    { icon: Users, label: 'Total Users', value: stats?.totalUsers || 0, color: 'bg-blue-100 text-blue-600' },
    { icon: Package, label: 'Active Packages', value: stats?.activePackages || 0, color: 'bg-green-100 text-green-600' },
    { icon: Calendar, label: 'Bookings', value: stats?.totalBookings || 0, color: 'bg-purple-100 text-purple-600' },
    { icon: DollarSign, label: 'Revenue', value: `$${stats?.totalRevenue || 0}`, color: 'bg-yellow-100 text-yellow-600' },
    { icon: TrendingUp, label: 'Growth', value: `${stats?.growth || 0}%`, color: 'bg-pink-100 text-pink-600' },
    { icon: Map, label: 'Destinations', value: stats?.destinations || 0, color: 'bg-indigo-100 text-indigo-600' },
    { icon: Car, label: 'Vehicles', value: stats?.vehicles || 0, color: 'bg-red-100 text-red-600' },
    { icon: Building2, label: 'Hotels', value: stats?.hotels || 0, color: 'bg-teal-100 text-teal-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
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

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h2>
          <LineChart data={stats?.revenueData || []} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Booking Statistics</h2>
          <BarChart data={stats?.bookingStats || []} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {stats?.recentActivities?.map((activity: any) => (
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
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Packages</h2>
          <div className="space-y-4">
            {stats?.popularPackages?.map((pkg: any) => (
              <div
                key={pkg.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{pkg.title}</h3>
                  <p className="text-sm text-gray-600">{pkg.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${pkg.revenue}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;