'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, GraduationCap, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoError, setLogoError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Preload logo to check if it's accessible (only on client)
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = 'https://yjibyfbbkbyblfsctqko.supabase.co/storage/v1/object/public/images/logo.png';
      img.onload = () => setLogoError(false);
      img.onerror = () => setLogoError(true);
    }
  }, []);

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/919548334908', icon: MessageCircle, color: 'hover:text-green-400' },
    { name: 'Email', href: 'mailto:growingmindtnp@gmail.com', icon: Mail, color: 'hover:text-blue-400' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ];

  const courses = [
    { name: 'Basic Computer (DCA/CCA)', href: '/courses/basic' },
    { name: 'Graphic Design', href: '/courses/graphic-design' },
    { name: 'Financial Accounting (Tally)', href: '/courses/accounting' },
    { name: 'Stenography & Typing', href: '/courses/stenography' },
    { name: 'CCC Course', href: '/courses/ccc' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Institute Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              {isClient && !logoError ? (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://yjibyfbbkbyblfsctqko.supabase.co/storage/v1/object/public/images/logo.png"
                    alt="Growing Mind Logo"
                    width={48}
                    height={48}
                    className="object-cover"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">Growing Mind</h3>
                <p className="text-sm text-blue-300">Computer Class</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering Tanakpur&apos;s future with cutting-edge computer education and professional training.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-300 transition-colors ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-300 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Popular Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="text-gray-400 hover:text-blue-300 transition-colors"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Vishnupuri Colony, Tanakpur, Uttarakhand - 262309
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+919548334908"
                  className="text-gray-400 hover:text-blue-300 transition-colors"
                >
                  +91 9548334908
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:growingmindtnp@gmail.com"
                  className="text-gray-400 hover:text-blue-300 transition-colors"
                >
                  growingmindtnp@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* AICT Affiliation Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-xs font-bold text-blue-900 leading-tight">AICT<br/>EDU</span>
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-white tracking-wide">AICT Authorized Study Centre</p>
              <p className="text-gray-400">
                Official Certification Partner for Results, Marksheets, and Diplomas
              </p>
              <a
                href="https://www.aicteducation.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center mt-2 font-medium"
              >
                Verify Affiliation at aicteducation.in
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Growing Mind Computer Class. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-300 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            Designed & Developed with ❤️ by Chetan Pandey
          </p>
        </div>
      </div>
    </footer>
  );
}