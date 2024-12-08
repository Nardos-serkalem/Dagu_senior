import { useState } from 'react';
import { Filter, Grid, Columns } from 'lucide-react';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryFilters from '../components/gallery/GalleryFilters';
import type { GalleryImage } from '../types/gallery';

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Santorini Sunset',
    location: 'Greece',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    tags: ['sunset', 'island', 'architecture']
  },
  {
    id: '2',
    title: 'Mount Fuji',
    location: 'Japan',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    tags: ['mountain', 'nature', 'snow']
  },
  {
    id: '3',
    title: 'Machu Picchu',
    location: 'Peru',
    category: 'Historical',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
    tags: ['ruins', 'ancient', 'mountains']
  },
  {
    id: '4',
    title: 'Maldives Beach',
    location: 'Maldives',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    tags: ['beach', 'ocean', 'tropical']
  }
];

export default function Gallery() {
  const [layout, setLayout] = useState<'grid' | 'columns'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  return (
    <div className="pt-16">
      <div className="relative py-16 bg-gradient-to-br from-teal-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Travel Gallery</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore stunning destinations through our curated collection of travel photographs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Photo Collection</h2>
            <p className="text-gray-600">Discover the world through our lens</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="flex bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 ${layout === 'grid' ? 'text-teal-600' : 'text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayout('columns')}
                className={`p-2 ${layout === 'columns' ? 'text-teal-600' : 'text-gray-400'}`}
              >
                <Columns className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {showFilters && (
            <div className="lg:col-span-1">
              <GalleryFilters
                images={galleryImages}
                onFilter={setFilteredImages}
              />
            </div>
          )}
          
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <GalleryGrid images={filteredImages} layout={layout} />
          </div>
        </div>
      </div>
    </div>
  );
}