'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Target, Users, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text-blue">Growing Mind Computer Class</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Empowering Tanakpur's future with cutting-edge computer education since establishment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-gray-400">
                To provide quality computer education that empowers students with practical skills 
                for career success in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-gray-400">
                To be the leading computer training institute in Tanakpur, recognized for excellence 
                in education and student success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AICT Authorized</h3>
              <p className="text-gray-400">
                Official AICT Education authorized study centre providing certified courses and 
                government-recognized certificates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Faculty</h3>
              <p className="text-gray-400">
                Led by experienced instructors with industry expertise and passion for 
                teaching practical computer skills.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Comprehensive curriculum designed for industry requirements
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Hands-on practical training with modern computer labs
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Small batch sizes for personalized attention
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Flexible timing for working professionals and students
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Affordable fees with multiple payment options
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Job placement assistance and career guidance
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}