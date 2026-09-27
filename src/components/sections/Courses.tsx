'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  category?: string;
  image_url?: string;
  is_active?: boolean;
}

export default function Courses() {
  const [coursesGrouped, setCoursesGrouped] = useState<Record<string, Course[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          const grouped = data.reduce((acc: Record<string, Course[]>, course: Course) => {
            const cat = course.category || 'General';
            if (!acc[cat]) {
              acc[cat] = [];
            }
            acc[cat].push(course);
            return acc;
          }, {});

          setCoursesGrouped(grouped);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-blue-400">Professional Courses</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Industry-relevant curriculum designed to launch your career in the digital world
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white text-xl">Loading courses...</div>
        ) : Object.keys(coursesGrouped).length === 0 ? (
          <div className="text-center text-gray-400 text-xl">No courses found in database.</div>
        ) : (
          Object.entries(coursesGrouped).map(([categoryName, items], categoryIndex) => (
            <div key={categoryName} className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 capitalize">
                  {categoryName}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((course, index) => (
                  <motion.div
                    key={course.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full flex flex-col justify-between hover:border-blue-500/50 transition-all">
                      <div>
                        <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Monitor className="w-8 h-8 text-blue-400" />
                        </div>

                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 mb-3 capitalize">
                          {categoryName}
                        </span>

                        <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {course.description || 'Professional computer training course designed for practical learning.'}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center text-sm text-gray-300 mb-4">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration || '3 Months'}
                        </div>

                        <a
                          href={`https://wa.me/919548334908?text=Hello,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(course.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Enquire via WhatsApp
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}