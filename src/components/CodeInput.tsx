'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Send, Sparkles } from 'lucide-react';

interface CodeInputProps {
  onExplain: (code: string, language: string) => void;
  isLoading: boolean;
}

const languages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin',
];

export default function CodeInput({ onExplain, isLoading }: CodeInputProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = () => {
    if (code.trim() && !isLoading) {
      onExplain(code, language);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Code Input</h2>
              <p className="text-blue-100 text-xs">Paste your code below</p>
            </div>
          </div>
          
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-gray-800">
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Code Input Area */}
        <div className="p-6">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here...&#10;function example() {&#10;  return 'Hello World';&#10;}"
            className="w-full h-96 bg-black/40 text-gray-100 font-mono text-sm p-4 rounded-lg border border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none resize-none backdrop-blur-sm transition-all"
            style={{
              lineHeight: '1.6',
              tabSize: 4,
            }}
          />
        </div>

        {/* Footer with Submit Button */}
        <div className="p-6 pt-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading || !code.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <span>Analyzing Code...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Explain Code</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
