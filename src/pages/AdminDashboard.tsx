import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminOverview from '../components/admin/AdminOverview';
import PackageManagement from '../components/admin/PackageManagement';
import UserManagement from '../components/admin/UserManagement';
import BookingManagement from '../components/admin/BookingManagement';
import VehicleManagement from '../components/admin/VehicleManagement';
import HotelManagement from '../components/admin/HotelManagement';
import Analytics from '../components/admin/Analytics';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="packages/*" element={<PackageManagement />} />
        <Route path="users/*" element={<UserManagement />} />
        <Route path="bookings/*" element={<BookingManagement />} />
        <Route path="vehicles/*" element={<VehicleManagement />} />
        <Route path="hotels/*" element={<HotelManagement />} />
        <Route path="analytics" element={<Analytics />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;