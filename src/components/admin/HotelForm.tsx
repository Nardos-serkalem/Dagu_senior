import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X, Upload, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface HotelFormProps {
  hotel?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ hotel, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: hotel?.name || '',
    location: {
      address: hotel?.location?.address || '',
      city: hotel?.location?.city || '',
      coordinates: hotel?.location?.coordinates || {
        latitude: 0,
        longitude: 0
      }
    },
    description: hotel?.description || '',
    images: hotel?.images || [],
    amenities: hotel?.amenities || [''],
    rooms: hotel?.rooms || [{
      type: '',
      price: '',
      capacity: '',
      amenities: [''],
      images: [],
      available: true
    }],
    policies: {
      checkIn: hotel?.policies?.checkIn || '',
      checkOut: hotel?.policies?.checkOut || '',
      cancellation: hotel?.policies?.cancellation || ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (hotel) {
        const { data: response } = await axios.put(`/api/admin/hotels/${hotel._id}`, data);
        return response;
      } else {
        const { data: response } = await axios.post('/api/admin/hotels', data);
        return response;
      }
    },
    onSuccess: () => {
      toast.success(hotel ? 'Hotel updated successfully' : 'Hotel created successfully');
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData(prev => ({ ...prev, amenities: newAmenities }));
  };

  const addAmenity = () => {
    setFormData(prev => ({ ...prev, amenities: [...prev.amenities, ''] }));
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_: any, i: number) => i !== index)    }));
  };

  const handleRoomChange = (index: number, field: string, value: any) => {
    const newRooms = [...formData.rooms];
    newRooms[index] = {
      ...newRooms[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, rooms: newRooms }));
  };

  const addRoom = () => {
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, {
        type: '',
        price: '',
        capacity: '',
        amenities: [''],
        images: [],
        available: true
      }]
    }));
  };

  const removeRoom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'hotel' | 'room', roomIndex?: number) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const uploadFormData = new FormData();
      Array.from(files).forEach(file => {
        uploadFormData.append('images', file);
      });

      const { data } = await axios.post('/api/admin/upload', uploadFormData);
      
      if (type === 'hotel') {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.urls]
        }));
      } else if (type === 'room' && roomIndex !== undefined) {
        setFormData(prev => {
          const newRooms = [...prev.rooms];
          newRooms[roomIndex].images = [...newRooms[roomIndex].images, ...data.urls];
          return { ...prev, rooms: newRooms };
        });
      }
    } catch (error) {
      toast.error('Error uploading images');
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {hotel ? 'Edit Hotel' : 'Add New Hotel'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
            {formData.amenities.map((amenity: string | number | readonly string[] | undefined, index: React.Key | null | undefined) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index as number, e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter amenity"
                />
                <button
                  type="button"
                  onClick={() => removeAmenity(index as number)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAmenity}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Amenity
            </button>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Images</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'hotel')}
                  className="hidden"
                />
              </label>
              <div className="flex space-x-2">
                {formData.images.map((image: string | undefined, index: number) => (
                  <div key={index} className="relative w-16 h-16">
                    <img
                      src={image}
                      alt={`Hotel ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_: any, i: number) => i !== index)
                      }))}
                      className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rooms</h3>
            {formData.rooms.map((room: { type: string | number | readonly string[] | undefined; price: string | number | readonly string[] | undefined; images: any[]; }, index: React.Key | null | undefined) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-900">Room {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeRoom(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Room Type</label>
                    <input
                      type="text"
                      value={room.type}
                      onChange={(e) => handleRoomChange(index as number, 'type', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={room.price}
                      onChange={(e) => handleRoomChange(index as number, 'price', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Room Images</label>
                  <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'room', index as number)}
                        className="hidden"
                      />
                    </label>
                    <div className="flex space-x-2">
                      {room.images.map((image: string | undefined, imageIndex: number) => (
                        <div key={imageIndex} className="relative w-16 h-16">
                          <img
                            src={image}
                            alt={`Room ${Number(index) + 1} - ${imageIndex + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newRooms = [...formData.rooms];
                              if (typeof index === 'number') {
                                newRooms[index].images = newRooms[index].images.filter((_: any, i: number) => i !== imageIndex);
                                setFormData(prev => ({ ...prev, rooms: newRooms }));
                              }
                            }}                            className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRoom}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Room
            </button>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-in Time</label>
                <input
                  type="text"
                  name="policies.checkIn"
                  value={formData.policies.checkIn}
                  onChange={handleChange}
                  placeholder="e.g., 2:00 PM"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-out Time</label>
                <input
                  type="text"
                  name="policies.checkOut"
                  value={formData.policies.checkOut}
                  onChange={handleChange}
                  placeholder="e.g., 11:00 AM"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
              <textarea
                name="policies.cancellation"
                value={formData.policies.cancellation}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="btn-primary"
            >
              {mutation.isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : hotel ? 'Update Hotel' : 'Create Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;