'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Image as ImageIcon, ZoomIn, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getImageUrl } from '@/lib/constants';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [selectedCategory, galleryImages]);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setGalleryImages(data || []);
      setFilteredImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      // Fallback data using Supabase storage
      const fallbackImages = [
        { id: '1', title: 'Computer Lab 1', description: 'Main computer lab', image_url: getImageUrl('img1.jpg'), category: 'lab' },
        { id: '2', title: 'Computer Lab 2', description: 'Advanced lab', image_url: getImageUrl('img2.jpg'), category: 'lab' },
        { id: '3', title: 'Classroom Session', description: 'Training in progress', image_url: getImageUrl('img3.jpg'), category: 'classroom' },
        { id: '4', title: 'Practical Training', description: 'Students working', image_url: getImageUrl('img4.jpg'), category: 'classroom' },
        { id: '5', title: 'Annual Event', description: 'Tech celebration', image_url: getImageUrl('img5.jpg'), category: 'events' },
        { id: '6', title: 'Certificate Distribution', description: 'Award ceremony', image_url: getImageUrl('img6.jpg'), category: 'certificates' },
        { id: '7', title: 'Campus View', description: 'Institute campus', image_url: getImageUrl('img7.jpg'), category: 'campus' },
        { id: '8', title: 'Group Photo', description: 'Students group', image_url: getImageUrl('img8.jpg'), category: 'events' },
      ];
      setGalleryImages(fallbackImages);
      setFilteredImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    if (selectedCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
    }
  };

  const categories = ['all', 'lab', 'classroom', 'events', 'certificates', 'campus'];

  const categoryLabels = {
    all: 'All Photos',
    lab: 'Computer Labs',
    classroom: 'Classrooms',
    events: 'Events',
    certificates: 'Certificates',
    campus: 'Campus'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading gallery...</div>
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
            Our <span className="gradient-text-blue">Photo Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our campus, labs, classrooms, events, and student activities
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 flex-wrap gap-2"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {categoryLabels[category as keyof typeof categoryLabels]}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden">
                {isClient && !imageErrors.has(image.id) ? (
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(image.id)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-bold">{image.title}</h4>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">No images found in this category</p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative rounded-2xl overflow-hidden">
                {isClient && !imageErrors.has(selectedImage.id) ? (
                  <Image
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[80vh]"
                    onError={() => handleImageError(selectedImage.id)}
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}