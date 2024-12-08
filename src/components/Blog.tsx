import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const posts = [
    {
      title: 'The Ancient Churches of Lalibela: A Spiritual Journey',
      excerpt: 'Discover the architectural marvels and spiritual significance of Ethiopia\'s rock-hewn churches...',
      image: '/Travel pictures/pictures/lalibela-rock-churches-ethiopia.jpg',
      date: 'Mar 15, 2024',
      author: 'Abebe Kebede',
      category: 'Historical Sites'
    },
    {
      title: 'Ethiopian Coffee Culture: From Bean to Ceremony',
      excerpt: 'Experience the rich traditions and cultural significance of Ethiopia\'s coffee ceremony...',
      image: '/Travel pictures/pictures/danakil-depression.jpg',
      date: 'Mar 12, 2024',
      author: 'Sara Haile',
      category: 'Culture'
    },
    {
      title: 'Trekking the Simien Mountains: A Guide',
      excerpt: 'Plan your adventure through one of Africa\'s most spectacular mountain ranges...',
      image: '/Travel pictures/pictures/places-to-visit-in-ethiopia-simi.jpg',
      date: 'Mar 10, 2024',
      author: 'Daniel Mekonnen',
      category: 'Adventure'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Latest from Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with travel tips, cultural insights, and stories from our adventures
            across Ethiopia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card group cursor-pointer"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <button className="flex items-center text-primary font-medium group-hover:text-secondary transition-colors duration-300">
                Read More
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;