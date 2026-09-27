'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getImageUrl } from '@/lib/constants';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured_image_url: string;
  category: string;
  published_at: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = (blogId: string) => {
    setImageErrors(prev => new Set([...prev, blogId]));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, selectedCategory, blogs]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
      setFilteredBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Fallback data using Supabase storage
      const fallbackBlogs = [
        {
          id: '1',
          title: 'Career Opportunities in Computer Education',
          slug: 'career-opportunities-computer-education',
          excerpt: 'Computer education opens doors to numerous career opportunities in today\'s digital world.',
          author: 'Growing Mind Computer Class',
          featured_image_url: getImageUrl('img9.jpg'),
          category: 'career_guidance',
          published_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Tips for Cracking Government Computer Exams',
          slug: 'tips-cracking-government-computer-exams',
          excerpt: 'Government computer exams require strategic preparation. This comprehensive guide covers essential tips.',
          author: 'Growing Mind Computer Class',
          featured_image_url: getImageUrl('img10.jpg'),
          category: 'exam_tips',
          published_at: new Date().toISOString()
        }
      ];
      setBlogs(fallbackBlogs);
      setFilteredBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
  };

  const categories = ['all', 'career_guidance', 'exam_tips', 'technology'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text-blue">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest in computer education, career guidance, and technology trends
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="career_guidance">Career Guidance</option>
                <option value="exam_tips">Exam Tips</option>
                <option value="technology">Technology</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No blogs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <div className="glass-card rounded-2xl overflow-hidden h-full hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700">
                      {isClient && blog.featured_image_url && !imageErrors.has(blog.id) ? (
                        <Image
                          src={blog.featured_image_url}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(blog.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                          {blog.category.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {blog.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(blog.published_at)}
                        </div>
                      </div>
                      <div className="flex items-center text-blue-400 font-semibold group">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}