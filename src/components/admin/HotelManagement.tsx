import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Building2,
  MapPin,
  Star,
  Bed,
  Edit2,
  Trash2,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import HotelForm from './HotelForm';

const HotelManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data } = await axios.get('/api/admin/hotels');
      return data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/admin/hotels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hotels']);
      toast.success('Hotel deleted successfully');
    }
  });

  const handleEdit = (hotel: any) => {
    setSelectedHotel(hotel);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredHotels = hotels?.filter((hotel: any) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Hotel Management</h1>
        <button
          onClick={() => {
            setSelectedHotel(null);
            setIsFormOpen(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Hotel
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search hotels..."
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
          {filteredHotels?.map((hotel: any) => (
            <motion.div
              key={hotel._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 space-x-2">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-white rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {hotel.location.city}, {hotel.location.address}
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    {hotel.rooms.length} room types
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    {hotel.rooms.reduce((acc: number, room: any) => acc + (room.available ? 1 : 0), 0)} rooms available
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 3).map((amenity: string) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <HotelForm
          hotel={selectedHotel}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            queryClient.invalidateQueries(['hotels']);
          }}
        />
      )}
    </div>
  );
};

export default HotelManagement;