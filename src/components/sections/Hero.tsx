'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Users, Award, ChevronRight, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getBackgroundImage } from '@/lib/constants';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  is_active?: boolean;
  display_order?: number;
}

interface Metrics {
  total_students: number;
  active_students: number;
  experience: number;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ total_students: 0, active_students: 0, experience: 0 });
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsClient(true);
    fetchGalleryImages();
    fetchMetrics();
  }, []);

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(10);

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      // Fallback images using Supabase storage
      setGalleryImages([
        { id: '1', image_url: getBackgroundImage('hero', 0), title: 'Computer Lab' },
        { id: '2', image_url: getBackgroundImage('hero', 1), title: 'Classroom' },
        { id: '3', image_url: getBackgroundImage('hero', 2), title: 'Campus' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*');

      if (error) throw error;
      
      const metricsObj: Record<string, number> = {};
      data?.forEach((metric: any) => {
        metricsObj[metric.metric_name] = metric.metric_value;
      });
      setMetrics({
        total_students: metricsObj.total_students || 1000,
        active_students: metricsObj.active_students || 70,
        experience: metricsObj.experience || 5
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      // Fallback metrics
      setMetrics({ total_students: 1000, active_students: 70, experience: 5 });
    }
  };

  useEffect(() => {
    if (galleryImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleryImages]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Gallery */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {galleryImages.map((image, index) => (
            currentSlide === index && (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
                {isClient && !imageErrors.has(index) ? (
                  <Image
                    src={image.image_url}
                    alt={image.title || 'Gallery Image'}
                    fill
                    className="object-cover"
                    priority
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900" />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pb-20 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Empowering Tanakpur's Future with
              <span className="gradient-text-blue block mt-2">AICT Authorized Computer Training</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-8"
            >
              Led by Founder & Expert Instructor{' '}
              <span className="text-blue-300 font-semibold">Hem Chandra Joshi</span>
              <br />
              <span className="text-lg text-gray-300">
                Diploma in CSE from Govt. Polytechnic Tanakpur, BCA Pursuing
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 flex-wrap"
            >
              <a
                href="/demo"
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center group"
              >
                Register for 3 Days Free Demo Class
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/919548334908?text=Hello,%20I%20want%20to%20enquire%20about%20computer%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-2xl hover:shadow-green-500/50 flex items-center justify-center group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
              <a
                href="/courses"
                className="px-6 py-4 glass text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Explore Courses
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </motion.div>
          </motion.div>

          {/* Dynamic Metrics Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-6 text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">
                {metrics.total_students.toLocaleString()}+
              </div>
              <p className="text-gray-300">Students Trained</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">
                {metrics.active_students}+
              </div>
              <p className="text-gray-300">Active Students</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">
                {metrics.experience}+ Years
              </div>
              <p className="text-gray-300">Experience</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      {galleryImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrow Navigation */}
      {galleryImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 glass p-3 rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 glass p-3 rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </section>
  );
}