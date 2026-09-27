'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
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
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of <span className="gradient-text-blue">Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 space-y-6"
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing and using Growing Mind Computer Class services, you accept and agree 
                to be bound by the terms and provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Course Enrollment</h2>
              <p className="text-gray-300 mb-4">
                Enrollment in our courses is subject to availability and compliance with our 
                admission requirements. We reserve the right to refuse enrollment at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
              <p className="text-gray-300 mb-4">
                Course fees must be paid according to the payment schedule agreed upon at enrollment. 
                All fees are non-refundable unless otherwise specified in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Student Conduct</h2>
              <p className="text-gray-300 mb-4">
                Students are expected to maintain professional conduct and respect for instructors, 
                staff, and fellow students. We reserve the right to dismiss students for misconduct.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p className="text-gray-300 mb-4">
                All course materials, curriculum, and intellectual property remain the exclusive 
                property of Growing Mind Computer Class. Unauthorized reproduction or distribution 
                is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-300">
                Growing Mind Computer Class shall not be liable for any indirect, incidental, 
                special, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Continued use of our 
                services after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}