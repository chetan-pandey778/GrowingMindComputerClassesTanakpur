'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  const courseSlug = params.slug as string;

  const courseInfo: Record<string, { title: string; description: string; duration: string }> = {
    'basic': {
      title: 'Basic Computer Course (DCA/CCA)',
      description: 'Learn fundamental computer operations, file management, and basic applications',
      duration: '6 Months'
    },
    'graphic-design': {
      title: 'Graphic Design Course',
      description: 'Master vector graphics design and professional illustration with Coral Draw and Photoshop',
      duration: '3 Months'
    },
    'accounting': {
      title: 'Financial Accounting (Tally)',
      description: 'Complete accounting with Tally and financial management for corporate jobs',
      duration: '6 Months'
    },
    'stenography': {
      title: 'Stenography & Typing Course',
      description: 'Professional stenography and shorthand skills in Hindi and English',
      duration: '6 Months'
    },
    'ccc': {
      title: 'CCC Course',
      description: 'Comprehensive computer concepts course for government job preparation',
      duration: '3 Months'
    }
  };

  const course = courseInfo[courseSlug] || {
    title: 'Professional Computer Course',
    description: 'Comprehensive computer training for career development',
    duration: '3-6 Months'
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${course.title} at Growing Mind Computer Class. Please provide more details about the course, schedule, and fees.`
  );

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
            href="/courses"
            className="inline-flex items-center text-white hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>

          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {course.description}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Duration</h3>
                <p className="text-gray-400">{course.duration}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
            <p className="text-gray-300 mb-6">
              This comprehensive course is designed to provide you with practical skills and 
              knowledge that are directly applicable to real-world scenarios. Our curriculum is 
              regularly updated to match industry requirements.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Fundamental concepts and practical applications
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Hands-on training with modern tools and software
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Industry-relevant projects and assignments
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Career guidance and placement support
              </li>
            </ul>

            <a
              href={`https://wa.me/919548334908?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              Enquire via WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-500/30"
          >
            <h3 className="text-xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Register for a free demo class to experience our teaching methodology 
              and meet our expert instructors.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Book Free Demo Class
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}