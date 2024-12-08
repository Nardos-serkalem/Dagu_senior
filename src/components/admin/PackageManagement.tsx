import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  DollarSign,
} from 'lucide-react';
import axios from 'axios';
import PackageForm from './PackageForm';
import toast from 'react-hot-toast';

const PackageManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: packages, isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data } = await axios.get('/api/packages');
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['packages']);
      toast.success('Package deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete package');
    },
  });

  const handleEdit = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredPackages = packages?.filter((pkg: any) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
        <button
          onClick={() => {
            setSelectedPackage(null);
            setIsFormOpen(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Package
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search packages..."
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
      ) : isError ? (
        <div className="text-red-600">Error loading packages</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages?.map((pkg: any) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={pkg.images[0]}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                               <div className="absolute top-4 right-4 space-x-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {pkg.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location: {pkg.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Duration: {pkg.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Group Size: {pkg.groupSize} people
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Price: ${pkg.price}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <PackageForm
          package={selectedPackage}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            queryClient.invalidateQueries(['packages']);
            toast.success(selectedPackage ? 'Package updated successfully' : 'Package added successfully');
          }}
        />
      )}
    </div>
  );
};

export default PackageManagement;