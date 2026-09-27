'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  featured_image_url: string;
  category: string;
  published_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const shareBlog = () => {
    if (typeof window !== 'undefined' && blog) {
      if (navigator.share) {
        navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading blog post...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <Link href="/blogs" className="text-blue-400 hover:text-blue-300">
            Return to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative pb-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/blogs"
            className="inline-flex items-center text-white hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                {blog.category.replace('_', ' ').toUpperCase()}
              </span>
              <div className="flex items-center text-white/80 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                5 min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(blog.published_at)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Featured Image */}
            {blog.featured_image_url && (
              <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
                {isClient && !imageError ? (
                  <Image
                    src={blog.featured_image_url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
                )}
              </div>
            )}

            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={shareBlog}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-full text-white hover:bg-white/10 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Blog Content */}
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/blogs">
                  <div className="glass-card rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Explore More Articles
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Discover more insights about computer education and career guidance
                    </p>
                  </div>
                </Link>
                <Link href="/courses">
                  <div className="glass-card rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                    <h4 className="text-lg font-bold text-white mb-2">
                      View Our Courses
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Check out our professional computer training programs
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}