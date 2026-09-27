'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, GraduationCap } from 'lucide-react';
import { FALLBACK_IMAGE_URL } from '@/lib/constants';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/#courses' },
    { name: 'Founder', href: '/#founder' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full">
      {/* Top Bar */}
      <div className={`bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-2 transition-all duration-300 ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 md:space-x-6">
            <a href="tel:+919548334908" className="flex items-center hover:text-blue-300 transition-colors whitespace-nowrap">
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">+91 9548334908</span>
              <span className="sm:hidden">9548334908</span>
            </a>
            <a href="mailto:growingmindtnp@gmail.com" className="hidden md:flex items-center hover:text-blue-300 transition-colors whitespace-nowrap">
              <Mail className="w-4 h-4 mr-2" />
              growingmindtnp@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/verification" className="hover:text-blue-300 transition-colors text-xs md:text-sm whitespace-nowrap">
              Verification Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/98 backdrop-blur-xl shadow-2xl py-3 border-b border-white/10' 
            : 'bg-slate-900/90 backdrop-blur-md py-4 md:py-6 border-b border-white/5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              {isClient && !logoError ? (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://yjibyfbbkbyblfsctqko.supabase.co/storage/v1/object/public/images/logo.png"
                    alt="Growing Mind Logo"
                    width={48}
                    height={48}
                    className="object-cover"
                    onError={() => setLogoError(true)}
                    priority
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-white">Growing Mind</h1>
                <p className="text-xs text-blue-300">Computer Class</p>
              </div>
            </Link>

            {/* AICT Badge - Hidden on medium screens */}
            <div className="hidden 2xl:flex items-center space-x-3 glass px-4 py-2 rounded-full flex-shrink-0 border border-white/20 shadow-xl">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-bold text-blue-900 leading-none text-center">AICT<br/>EDU</span>
              </div>
              <div className="text-xs text-white">
                <p className="font-bold tracking-wide uppercase">AICT Authorized Study Centre</p>
                <a href="https://www.aicteducation.in/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 flex items-center gap-1 transition-colors">
                  aicteducation.in
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-8 flex-1 justify-center px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-blue-300 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href="/demo"
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
              >
                Book Free Demo
              </Link>
              <Link
                href="/student/login"
                className="px-5 py-2 border-2 border-blue-500 text-white rounded-full font-semibold hover:bg-blue-500 transition-all text-sm whitespace-nowrap"
              >
                Student Login
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative z-[120]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl"
            />
            
            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-slate-900/98 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col pt-20"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-white/90 hover:text-blue-400 hover:bg-white/5 px-4 py-4 rounded-xl transition-all font-semibold text-lg border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-white/10 space-y-4 mb-8">
                <Link
                  href="/demo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                >
                  Book Free Demo
                </Link>
                <Link
                  href="/student/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 border border-blue-500/50 text-blue-400 text-center rounded-xl font-bold active:scale-95 transition-all"
                >
                  Student Login
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}