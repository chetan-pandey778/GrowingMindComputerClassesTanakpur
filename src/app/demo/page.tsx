'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Send, CheckCircle, ArrowLeft, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function DemoFormContent() {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get('course');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_interest: courseParam || '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const whatsappNumber = '919548334908';
    const message = encodeURIComponent(
      `Hi, I'm ${formData.name} and I'm interested in registering for a free demo class.\n\nCourse Interest: ${formData.course_interest}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\n${formData.message ? `Message: ${formData.message}` : ''}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    setLoading(false);
    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', course_interest: '', message: '' });

    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const courses = [
    'Basic Computer Course',
    'CCC (Course on Computer Concepts)',
    'Coral Draw',
    'Photoshop',
    'Page Maker',
    'Accounting Courses',
    'Advance Excel',
    'Typing Course',
    'Stenography (Hindi & English)',
    'Women Special Batch'
  ];

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
              Register for <span className="text-blue-400">Free Demo Class</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience our teaching methodology with a 3-day free demo class. 
              No commitment required!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Fill Your Details</h2>
                
                {success && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Registration successful! We'll contact you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Course Interest</label>
                    <select
                      name="course_interest"
                      value={formData.course_interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="" className="bg-slate-800">Select a course</option>
                      {courses.map(course => (
                        <option key={course} value={course} className="bg-slate-800">
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
                      placeholder="Any specific questions or requirements?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Register for Free Demo
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Get</h3>
                <ul className="space-y-4">
                  {[
                    '3 days of free classroom training',
                    'Hands-on practical sessions',
                    'Course curriculum overview',
                    'Career guidance session',
                    'Meet our expert instructors',
                    'Special discount offers on enrollment'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <a href="tel:+919548334908" className="text-white font-semibold hover:text-blue-300 transition-colors">
                        +91 9548334908
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">WhatsApp</p>
                      <a
                        href="https://wa.me/919548334908"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold hover:text-blue-300 transition-colors"
                      >
                        +91 9548334908
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:growingmindtnp@gmail.com" className="text-white font-semibold hover:text-blue-300 transition-colors">
                        growingmindtnp@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Address</p>
                      <p className="text-white font-semibold">
                        Vishnupuri Colony, Tanakpur<br />
                        Uttarakhand - 262309
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>}>
      <DemoFormContent />
    </Suspense>
  );
}