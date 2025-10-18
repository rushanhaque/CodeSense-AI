'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles, Github, Zap, Linkedin, Instagram, Mail, Code2, Brain, Rocket, AlertCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import CodeInput from './components/CodeInput';
import ExplanationDisplay from './components/ExplanationDisplay';
import FloatingCard from './components/FloatingCard';
import CodeExamples from './components/CodeExamples';
import LoadingSkeleton from './components/LoadingSkeleton';

const Background3D = dynamic(() => import('./components/Background3D'), {
  ssr: false,
});

const Logo3D = dynamic(() => import('./components/Logo3D'), {
  ssr: false,
});

interface Explanation {
  lineNumber: number;
  code: string;
  explanation: string;
}

export default function Home() {
  const [explanations, setExplanations] = useState<Explanation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [currentCode, setCurrentCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async (code: string, language: string) => {
    setIsLoading(true);
    setCurrentLanguage(language);
    setCurrentCode(code);
    setExplanations([]);
    setError(null);

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to explain code');
      }

      setExplanations(data.explanations);
      toast.success('Code explained successfully!');
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = error.message || 'Failed to explain code. Please check your API key.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectExample = (code: string, language: string) => {
    setCurrentCode(code);
    setCurrentLanguage(language);
    toast.success('Example loaded! Click "Explain Code" to analyze.');
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #3b82f6',
          },
        }}
      />
      <Background3D />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section with Branding */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-6 md:pt-8 pb-4 md:pb-6 px-4 relative"
        >
          {/* Logo - Absolute Left Corner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="absolute left-4 md:left-8 top-6 md:top-8 z-10"
          >
            <Logo3D />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Logo and Title - Centered */}
            <div className="flex flex-col items-center gap-4 mb-6">
              {/* Title */}
              <motion.h1 
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                CodeSense AI
              </motion.h1>
              
              {/* Description - Centered below */}
              <p className="text-gray-400 text-base md:text-lg max-w-2xl text-center">
                Transform complex code into simple explanations with AI-powered insights
              </p>
            </div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              <FloatingCard delay={0.3}>
                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                  <Brain className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-gray-300 text-xs md:text-sm font-medium">AI-Powered</span>
                </div>
              </FloatingCard>
              
              <FloatingCard delay={0.4}>
                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-gray-300 text-xs md:text-sm font-medium">Simple Explanations</span>
                </div>
              </FloatingCard>
              
              <FloatingCard delay={0.5}>
                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-gray-300 text-xs md:text-sm font-medium">12+ Languages</span>
                </div>
              </FloatingCard>
              
              <FloatingCard delay={0.6}>
                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                  <Rocket className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-gray-300 text-xs md:text-sm font-medium">Instant Results</span>
                </div>
              </FloatingCard>
              
              <FloatingCard delay={0.7}>
                <CodeExamples onSelectExample={handleSelectExample} />
              </FloatingCard>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="px-4 pb-8">
          {/* Code Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <CodeInput onExplain={handleExplain} isLoading={isLoading} initialCode={currentCode} initialLanguage={currentLanguage} />
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto mt-6"
            >
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading Skeleton */}
          {isLoading && <LoadingSkeleton />}

          {/* Explanation Display */}
          {!isLoading && explanations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ExplanationDisplay explanations={explanations} language={currentLanguage} />
            </motion.div>
          )}
        </main>

        {/* Compact Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-6 px-4 border-t border-blue-500/20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Developer Credit */}
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-sm">
                  Developed with <span className="text-red-500 animate-pulse inline-block">❤️</span> by{' '}
                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Rushan Haque
                  </span>
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/rushanhaque"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-700/50 hover:bg-gray-600/50 p-2 rounded-lg transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 text-gray-300" />
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/rushanhaque?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-blue-600/50 hover:bg-blue-500/50 p-2 rounded-lg transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </motion.a>
                
                <motion.a
                  href="https://www.instagram.com/rushanhaque?igsh=MTN1eTBlMG45andoZw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-r from-pink-600/50 to-purple-600/50 hover:from-pink-500/50 hover:to-purple-500/50 p-2 rounded-lg transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </motion.a>
                
                <motion.a
                  href="mailto:rushanulhaque@gmail.com"
                  whileHover={{ scale: 1.2, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-r from-red-600/50 to-orange-600/50 hover:from-red-500/50 hover:to-orange-500/50 p-2 rounded-lg transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 text-white" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}
