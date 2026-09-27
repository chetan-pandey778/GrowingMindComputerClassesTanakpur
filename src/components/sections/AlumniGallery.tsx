'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Heart, Star, Filter, ChevronRight, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getImageUrl } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

interface Alumni {
  id: string;
  name: string;
  photo_url: string;
  batch_year: number;
  course_completed: string;
  current_position: string;
  company: string;
  testimonial: string;
  placement_status: string;
  created_at?: string;
}

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  is_active?: boolean;
  display_order?: number;
}

export default function AlumniGallery() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [filteredGallery, setFilteredGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'alumni' | 'gallery'>('alumni');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAlumni();
  }, [selectedFilter, alumni]);

  useEffect(() => {
    filterGallery();
  }, [selectedCategory, galleryImages]);

  const fetchData = async () => {
    try {
      // Fetch alumni
      const { data: alumniData, error: alumniError } = await supabase
        .from('alumni')
        .select('*')
        .order('batch_year', { ascending: false });

      if (alumniError) throw alumniError;
      setAlumni(alumniData || []);
      setFilteredAlumni(alumniData || []);

      // Fetch gallery images
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (galleryError) throw galleryError;
      setGalleryImages(galleryData || []);
      setFilteredGallery(galleryData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data
      const fallbackAlumni: Alumni[] = [
        {
          id: '1',
          name: 'Rahul Sharma',
          photo_url: '',
          batch_year: 2022,
          course_completed: 'Diploma in Computer Applications',
          current_position: 'Office Assistant',
          company: 'Local Government Office',
          testimonial: 'The DCA course at Growing Mind helped me gain the essential computer skills required for my government job.',
          placement_status: 'placed',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Priya Joshi',
          photo_url: '',
          batch_year: 2023,
          course_completed: 'Accounting Courses',
          current_position: 'Account Assistant',
          company: 'Private Firm, Tanakpur',
          testimonial: 'Learning Tally and Advanced Excel here was the best decision. The practical training was very helpful.',
          placement_status: 'placed',
          created_at: new Date().toISOString()
        }
      ];
      setAlumni(fallbackAlumni);
      setFilteredAlumni(fallbackAlumni);

      const fallbackGallery: GalleryImage[] = [
        { id: '1', title: 'Computer Lab', description: 'Main lab', image_url: getImageUrl('img11.jpg'), category: 'lab', is_active: true, display_order: 1 },
        { id: '2', title: 'Classroom', description: 'Training session', image_url: getImageUrl('img12.jpg'), category: 'classroom', is_active: true, display_order: 2 },
      ];
      setGalleryImages(fallbackGallery);
      setFilteredGallery(fallbackGallery);
    } finally {
      setLoading(false);
    }
  };

  const filterAlumni = () => {
    if (selectedFilter === 'all') {
      setFilteredAlumni(alumni);
    } else {
      setFilteredAlumni(alumni.filter(a => a.placement_status === selectedFilter));
    }
  };

  const filterGallery = () => {
    if (selectedCategory === 'all') {
      setFilteredGallery(galleryImages);
    } else {
      setFilteredGallery(galleryImages.filter(img => img.category === selectedCategory));
    }
  };

  const placementFilters = ['all', 'placed', 'self-employed', 'pursuing_higher_studies'];
  const galleryCategories = ['all', 'lab', 'classroom', 'events', 'certificates', 'campus'];

  const placementLabels = {
    all: 'All Alumni',
    placed: 'Placed',
    'self-employed': 'Self-Employed',
    pursuing_higher_studies: 'Higher Studies'
  };

  const categoryLabels = {
    all: 'All Photos',
    lab: 'Labs',
    classroom: 'Classrooms',
    events: 'Events',
    certificates: 'Certificates',
    campus: 'Campus'
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Success Stories & <span className="gradient-text-blue">Gallery</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our alumni achievements and institute campus through our interactive gallery
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-full p-1 flex space-x-2">
            <button
              onClick={() => setActiveTab('alumni')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'alumni'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Alumni Stories
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Photo Gallery
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'alumni' ? (
            <motion.div
              key="alumni"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Filter */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <Filter className="text-gray-400 w-5 h-5" />
                  <div className="flex space-x-2">
                    {placementFilters.map(filter => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedFilter === filter
                            ? 'bg-blue-500 text-white'
                            : 'glass text-gray-300 hover:text-white'
                        }`}
                      >
                        {placementLabels[filter as keyof typeof placementLabels]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alumni Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((alum, index) => (
                  <motion.div
                    key={alum.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white">{alum.name}</h4>
                          <p className="text-blue-400 text-sm">Batch {alum.batch_year}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-300 text-sm">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {alum.current_position} at {alum.company}
                        </div>
                        <div className="flex items-center text-gray-300 text-sm">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {alum.course_completed}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 italic">
                        "{alum.testimonial}"
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alum.placement_status === 'placed' ? 'bg-green-500/20 text-green-300' :
                          alum.placement_status === 'self-employed' ? 'bg-purple-500/20 text-purple-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {alum.placement_status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filter */}
              <div className="flex justify-center mb-8 flex-wrap gap-2">
                {galleryCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        : 'glass text-gray-300 hover:text-white'
                    }`}
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </button>
                ))}
              </div>

              {/* Masonry Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGallery.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/demo"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl"
          >
            Start Your Success Story
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}