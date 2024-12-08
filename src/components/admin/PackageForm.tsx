import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X, Upload, Plus, Minus, MapPin } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PackageFormProps {
  package?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const PackageForm: React.FC<PackageFormProps> = ({ package: pkg, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: pkg?.title || '',
    description: pkg?.description || '',
    duration: pkg?.duration || '',
    price: pkg?.price || '',
    maxGroupSize: pkg?.maxGroupSize || '',
    difficulty: pkg?.difficulty || 'moderate',
    locations: pkg?.locations || [{
      name: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    }],
    includes: pkg?.includes || [''],
    excludes: pkg?.excludes || [''],
    images: pkg?.images || [],
    featured: pkg?.featured || false
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (pkg) {
        const { data: response } = await axios.put(`/api/packages/${pkg._id}`, data);
        return response;
      } else {
        const { data: response } = await axios.post('/api/packages', data);
        return response;
      }
    },
    onSuccess: () => {
      toast.success(pkg ? 'Package updated successfully' : 'Package created successfully');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleLocationChange = (index: number, field: string, value: string) => {
    const newLocations = [...formData.locations];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newLocations[index] = {
        ...newLocations[index],
        [parent]: {
          ...newLocations[index][parent],
          [child]: value
        }
      };
    } else {
      newLocations[index] = {
        ...newLocations[index],
        [field]: value
      };
    }
    setFormData(prev => ({ ...prev, locations: newLocations }));
  };

  const addLocation = () => {
    setFormData(prev => ({
      ...prev,
      locations: [...prev.locations, {
        name: '',
        coordinates: {
          latitude: '',
          longitude: ''
        }
      }]
    }));
  };

  const removeLocation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index)
    }));
  };

  const handleListChange = (type: 'includes' | 'excludes', index: number, value: string) => {
    const newList = [...formData[type]];
    newList[index] = value;
    setFormData(prev => ({ ...prev, [type]: newList }));
  };

  const addListItem = (type: 'includes' | 'excludes') => {
    setFormData(prev => ({ ...prev, [type]: [...prev[type], ''] }));
  };

  const removeListItem = (type: 'includes' | 'excludes', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      const { data } = await axios.post('/api/admin/upload', formData);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...data.urls]
      }));
    } catch (error) {
      toast.error('Error uploading images');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {pkg ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Max Group Size</label>
              <input
                type="number"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
            {formData.locations.map((location, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={location.name}
                      onChange={(e) => handleLocationChange(index, 'name', e.target.value)}
                      placeholder="Location name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={location.coordinates.latitude}
                      onChange={(e) => handleLocationChange(index, 'coordinates.latitude', e.target.value)}
                      placeholder="Latitude"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={location.coordinates.longitude}
                      onChange={(e) => handleLocationChange(index, 'coordinates.longitude', e.target.value)}
                      placeholder="Longitude"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLocation}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Location
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Includes</label>
              {formData.includes.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListChange('includes', index, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('includes', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('includes')}
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excludes</label>
              {formData.excludes.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListChange('excludes', index, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('excludes', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('excludes')}
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Item
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <div className="flex space-x-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative w-16 h-16">
                    <img
                      src={image}
                      alt={`Package ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Featured Package
            </label>
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
              ) : pkg ? 'Update Package' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;