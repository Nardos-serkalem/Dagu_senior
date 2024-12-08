import { useState } from 'react';
import { Search } from 'lucide-react';
import BlogPost from '../components/blog/BlogPost';
import BlogSidebar from '../components/blog/BlogSidebar';
import type { BlogPost as BlogPostType } from '../types/blog';

const blogPosts: BlogPostType[] = [
  {
    id: '1',
    title: '10 Hidden Gems in Southeast Asia',
    excerpt: 'Discover lesser-known destinations that offer unique experiences away from the tourist crowds.',
    content: '',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    date: '2024-03-15',
    category: 'Destinations',
    tags: ['asia', 'hidden-gems', 'travel-tips']
  },
  {
    id: '2',
    title: 'Sustainable Travel: A Complete Guide',
    excerpt: 'Learn how to minimize your environmental impact while exploring the world.',
    content: '',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    date: '2024-03-10',
    category: 'Travel Tips',
    tags: ['sustainable', 'eco-friendly', 'responsible-travel']
  },
  {
    id: '3',
    title: 'Best Street Food in Asia',
    excerpt: 'A culinary journey through the vibrant street food scenes of Asian cities.',
    content: '',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    date: '2024-03-05',
    category: 'Food & Culture',
    tags: ['food', 'street-food', 'asia']
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="pt-16">
      <div className="relative py-16 bg-gradient-to-br from-teal-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Stories, tips, and insights from our travel experiences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full input pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div className="md:w-1/3">
            <BlogSidebar
              posts={blogPosts}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}