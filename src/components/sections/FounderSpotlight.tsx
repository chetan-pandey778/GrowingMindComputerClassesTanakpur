'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, ArrowRight, BookOpen } from 'lucide-react';
import { FOUNDER_IMAGE_URL } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function FounderSpotlight() {
  const [founderPhoto, setFounderPhoto] = useState<string>(FOUNDER_IMAGE_URL);
  const [imageError, setImageError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Preload the image to check if it's accessible (only on client)
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = FOUNDER_IMAGE_URL;
      img.onload = () => setImageError(false);
      img.onerror = () => setImageError(true);
    }
  }, []);

 return (
    <section id="founder" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="gradient-text-blue">Founder & Lead Instructor</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Led by expertise, driven by passion for education
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Photo Section */}
              <div className="relative h-96 lg:h-auto min-h-[400px] bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {isClient && !imageError ? (
                    <Image
                      src={founderPhoto}
                      alt="Hem Chandra Joshi"
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                      priority
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-4 border-white/30">
                        <GraduationCap className="w-24 h-24 text-white" />
                      </div>
                      <p className="text-white/80 text-sm">Founder Photo</p>
                      <p className="text-white/60 text-xs mt-2">Hem Chandra Joshi</p>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-10">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">AICT Authorized Centre Instructor</span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">Hem Chandra Joshi</h3>
                  <p className="text-blue-400 font-semibold mb-6">Owner, Director & Lead Instructor</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <GraduationCap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">Diploma in Computer Science & Engineering</p>
                        <p className="text-gray-400 text-sm">Govt. Polytechnic Tanakpur</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">BCA Pursuing</p>
                        <p className="text-gray-400 text-sm">Continuing Education in Computer Applications</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">Expert Mentor</p>
                        <p className="text-gray-400 text-sm">5+ Years of Teaching Experience</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed">
                    "My mission is to empower the youth of Tanakpur with cutting-edge computer education 
                    that opens doors to endless career opportunities. Every student deserves quality 
                    education that transforms their future."
                  </p>

                  <Link
                    href="/founder"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all group"
                  >
                    View Complete Profile
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}