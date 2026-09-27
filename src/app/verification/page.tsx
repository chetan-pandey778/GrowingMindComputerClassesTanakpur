'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, CheckCircle, XCircle, ExternalLink, Award, FileText, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function VerificationPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVerificationResult(null);

    // Simulate API call (replace with actual Supabase integration)
    setTimeout(() => {
      // Mock verification logic
      if (rollNumber.toLowerCase() === 'valid123') {
        setVerificationResult({
          status: 'verified',
          studentName: 'Rahul Sharma',
          course: 'Diploma in Computer Applications',
          year: '2022',
          aictRegistration: 'AICT/2022/12345',
          certificateNumber: 'GMCC/2022/001'
        });
      } else if (rollNumber.toLowerCase() === 'invalid123') {
        setVerificationResult({
          status: 'not_found',
          message: 'No record found for this roll number. Please contact the institute.'
        });
      } else {
        setVerificationResult({
          status: 'pending',
          message: 'Verification in progress. Please contact the institute for detailed verification.'
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Certificate <span className="gradient-text-blue">Verification Portal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Verify your certificates and results issued through AICT Authorized Study Centre
          </p>
        </motion.div>

        {/* AICT Affiliation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-500/30">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl">
                <span className="text-sm font-bold text-blue-900 text-center leading-tight">AICT<br/>EDU</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">AICT Authorized Study Centre</h2>
                <p className="text-gray-300 mb-4">
                  Growing Mind Computer Class is an AICT Authorized Study Centre. 
                  All certificates, marksheets, and diplomas are officially certified and 
                  recognized under the AICT Education framework.
                </p>
                <a
                  href="https://www.aicteducation.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Verify at aicteducation.in
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Verify Your Certificate
            </h3>
            <form onSubmit={handleVerification} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Enter Roll Number / Registration Number
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g., GMCC2022XXXX"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Verify Certificate
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center">
                {error}
              </div>
            )}
          </div>
        </motion.div>

        {/* Verification Result */}
        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {verificationResult.status === 'verified' ? (
              <div className="glass-card rounded-3xl p-8 border-2 border-green-500/30 bg-green-900/20">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-6">
                  Certificate Verified Successfully
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Student Name</span>
                    <span className="text-white font-semibold">{verificationResult.studentName}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Course</span>
                    <span className="text-white font-semibold">{verificationResult.course}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Year</span>
                    <span className="text-white font-semibold">{verificationResult.year}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">AICT Registration</span>
                    <span className="text-green-400 font-semibold">{verificationResult.aictRegistration}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Certificate Number</span>
                    <span className="text-blue-400 font-semibold">{verificationResult.certificateNumber}</span>
                  </div>
                </div>
              </div>
            ) : verificationResult.status === 'not_found' ? (
              <div className="glass-card rounded-3xl p-8 border-2 border-red-500/30 bg-red-900/20">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  Record Not Found
                </h3>
                <p className="text-gray-300 text-center">
                  {verificationResult.message}
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-8 border-2 border-yellow-500/30 bg-yellow-900/20">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  Verification Pending
                </h3>
                <p className="text-gray-300 text-center">
                  {verificationResult.message}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Important Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AICT Certified</h4>
              <p className="text-gray-400 text-sm">
                All certificates are issued through AICT Education authorized study centre
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Official Documents</h4>
              <p className="text-gray-400 text-sm">
                Marksheets and diplomas are officially recognized documents
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Career Valid</h4>
              <p className="text-gray-400 text-sm">
                Certificates are valid for government and private sector jobs
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact for Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-2">Need Help with Verification?</h4>
            <p className="text-gray-400 mb-4">
              Contact our office for assistance with certificate verification
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}