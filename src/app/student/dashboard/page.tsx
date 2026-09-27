'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('student_authenticated');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Student Dashboard</h1>
              <p className="text-gray-400">Welcome to your learning portal</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">3</h3>
              <p className="text-gray-400">Active Courses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2</h3>
              <p className="text-gray-400">Certificates Earned</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
              <p className="text-gray-400">Attendance Rate</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">6</h3>
              <p className="text-gray-400">Months Completed</p>
            </motion.div>
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card rounded-3xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to Your Student Portal</h2>
            <p className="text-gray-300 mb-6">
              This is your personal dashboard where you can track your course progress, view certificates, 
              and manage your learning journey. The full student portal features will be available soon.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/courses"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Browse Courses
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-blue-500 text-white rounded-full font-semibold hover:bg-blue-500 transition-all"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-3xl p-8 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-500/30"
          >
            <h3 className="text-xl font-bold text-white mb-4">🚀 Coming Soon</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Detailed course progress tracking
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Assignment submission and grading
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Certificate download and verification
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Schedule and class reminders
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Interactive learning materials
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}