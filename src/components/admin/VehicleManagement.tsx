import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Car,
  MapPin,
  Users,
  Wrench, // Changed from Tool to Wrench
  Edit2,
  Trash2,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import VehicleForm from './VehicleForm';

// Rest of the file remains exactly the same, just the import changed
const VehicleManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await axios.get('/api/admin/vehicles');
      return data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/admin/vehicles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle deleted successfully');
    }
  });
  const handleEdit = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredVehicles = vehicles?.filter((vehicle: any) =>
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vehicle Management</h1>
        <button
          onClick={() => {
            setSelectedVehicle(null);
            setIsFormOpen(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Vehicle
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="btn-secondary flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles?.map((vehicle: any) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 space-x-2">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.available ? 'Available' : 'In Use'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {vehicle.model}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    {vehicle.type}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Capacity: {vehicle.capacity} passengers
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    License: {vehicle.licensePlate}
                  </div>
                  {vehicle.maintenanceHistory.length > 0 && (
                    <div className="flex items-center">
                      <Wrench className="w-4 h-4 mr-2" />
                      Last maintenance: {new Date(vehicle.maintenanceHistory[0].date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <VehicleForm
          vehicle={selectedVehicle}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
          }}
        />
      )}
    </div>
  );};

export default VehicleManagement;