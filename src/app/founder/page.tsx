'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, BookOpen, Target, Heart, ArrowLeft, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { FOUNDER_IMAGE_URL } from '@/lib/constants';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function FounderPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative pb-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 border-4 border-white/30 overflow-hidden relative">
              {isClient && !imageError ? (
                <Image
                  src={FOUNDER_IMAGE_URL}
                  alt="Hem Chandra Joshi"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <GraduationCap className="w-16 h-16 text-white" />
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Hem Chandra Joshi
            </h1>
            <p className="text-2xl text-blue-300 font-semibold mb-6">
              Owner, Director & Lead Instructor
            </p>
            <p className="text-xl text-gray-200">
              Growing Mind Computer Class, Tanakpur
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              About <span className="gradient-text-blue">The Founder</span>
            </h2>

            <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Hem Chandra Joshi is the visionary founder and lead instructor at Growing Mind Computer Class, 
                Tanakpur. With a strong educational background and years of dedicated teaching experience, 
                he has been instrumental in shaping the careers of hundreds of students in the region.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                His passion for computer education and commitment to student success has made Growing Mind 
                Computer Class a premier institution for technical training in Uttarakhand. Under his 
                leadership, the institute has become an AICT Authorized Study Centre, maintaining the 
                highest standards of education.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Hem Chandra believes in practical, hands-on learning that prepares students for real-world 
                challenges. His teaching methodology focuses on building strong fundamentals while staying 
                updated with the latest industry trends and technologies.
              </p>
            </div>

            {/* Education & Qualifications */}
            <h3 className="text-3xl font-bold text-white mb-6">Education & Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Diploma in CSE</h4>
                    <p className="text-gray-400">Computer Science & Engineering</p>
                    <p className="text-blue-400 font-semibold">Govt. Polytechnic Tanakpur</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">BCA Pursuing</h4>
                    <p className="text-gray-400">Bachelor of Computer Applications</p>
                    <p className="text-green-400 font-semibold">Continuing Education</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Teaching Philosophy */}
            <h3 className="text-3xl font-bold text-white mb-6">Teaching Philosophy</h3>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Practical Learning</h4>
                  <p className="text-gray-400">
                    Focus on hands-on training and real-world applications
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Personal Attention</h4>
                  <p className="text-gray-400">
                    Small batch sizes for individualized guidance
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Student Success</h4>
                  <p className="text-gray-400">
                    Committed to every student's career growth
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Message to Students */}
            <h3 className="text-3xl font-bold text-white mb-6">Message to Students</h3>
            <div className="glass-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-500/30">
              <blockquote className="text-xl text-gray-200 leading-relaxed italic mb-6">
                "Dear Students of Tanakpur,
                <br /><br />
                In today's digital age, computer education is not just a skill—it's a necessity. 
                At Growing Mind Computer Class, we are committed to providing you with quality 
                education that transforms your future. Our courses are designed to make you 
                industry-ready and confident in your abilities.
                <br /><br />
                I personally believe that every student has the potential to excel. Our job is 
                to nurture that potential with the right guidance, practical training, and 
                continuous support. Whether you want to build a career in IT, start your own 
                business, or enhance your employability, we are here to help you achieve your goals.
                <br /><br />
                Join us on this journey of learning and growth. Together, we can build a brighter 
                future for you and for Tanakpur."
              </blockquote>
              <p className="text-right text-blue-300 font-semibold">— Hem Chandra Joshi</p>
            </div>

            {/* Contact */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919548334908"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +91 9548334908
                </a>
                <a
                  href="mailto:growingmindtnp@gmail.com"
                  className="inline-flex items-center px-6 py-3 glass text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  growingmindtnp@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}