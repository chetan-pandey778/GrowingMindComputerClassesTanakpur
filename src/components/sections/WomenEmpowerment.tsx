'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function WomenEmpowerment() {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-flex mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            महिलाओं के लिए विशेष बैच
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-6"
          >
            तीन माह के कोर्स से घर बैठे कार्य प्रारम्भ करें
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Special batches designed for women to gain computer skills and start working from home. 
            Flexible timing, personalized attention, and career guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://wa.me/919548334908?text=Hi, I'm interested in the Women Special Batch. Please provide more details about the course, schedule, and fees."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center group"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Women Special Batch
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/courses"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center"
            >
              View Course Details
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">Flexible Timing</div>
              <div className="text-white/70 text-sm">Morning & Evening Batches</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">Personal Attention</div>
              <div className="text-white/70 text-sm">Small Batch Sizes</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">Career Support</div>
              <div className="text-white/70 text-sm">Job Placement Assistance</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}