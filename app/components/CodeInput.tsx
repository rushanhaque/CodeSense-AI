'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Send, Sparkles, Trash2, Copy, Info } from 'lucide-react';
import toast from 'react-hot-toast';

interface CodeInputProps {
  onExplain: (code: string, language: string) => void;
  isLoading: boolean;
  initialCode?: string;
  initialLanguage?: string;
}

const languages = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'c', label: 'C', icon: '🔵' },
  { value: 'cpp', label: 'C++', icon: '🔷' },
  { value: 'csharp', label: 'C#', icon: '🟣' },
  { value: 'html', label: 'HTML', icon: '🌐' },
  { value: 'css', label: 'CSS', icon: '🎨' },
  { value: 'php', label: 'PHP', icon: '🐘' },
  { value: 'ruby', label: 'Ruby', icon: '💎' },
  { value: 'go', label: 'Go', icon: '🔷' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'swift', label: 'Swift', icon: '🐦' },
  { value: 'kotlin', label: 'Kotlin', icon: '🟣' },
  { value: 'sql', label: 'SQL', icon: '🗄️' },
  { value: 'bash', label: 'Bash', icon: '💻' },
  { value: 'r', label: 'R', icon: '📊' },
  { value: 'matlab', label: 'MATLAB', icon: '📈' },
  { value: 'scala', label: 'Scala', icon: '🔴' },
];

export default function CodeInput({ onExplain, isLoading, initialCode = '', initialLanguage = 'javascript' }: CodeInputProps) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines);
    setCharCount(code.length);
  }, [code]);

  const handleSubmit = () => {
    if (code.trim() && !isLoading) {
      onExplain(code, language);
    }
  };

  const handleClear = () => {
    setCode('');
    toast.success('Code cleared!');
  };

  const handleCopyCode = () => {
    if (code.trim()) {
      navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleLanguageSelect = (langValue: string) => {
    setLanguage(langValue);
    setIsDropdownOpen(false);
  };

  const selectedLang = languages.find(l => l.value === language) || languages[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base md:text-lg">Code Input</h2>
              <p className="text-blue-100 text-xs">Paste your code below</p>
            </div>
          </div>
          
          {/* Custom Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 md:px-4 py-2.5 rounded-lg border border-blue-400/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm md:text-base cursor-pointer font-medium shadow-lg flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{selectedLang.icon}</span>
                <span>{selectedLang.label}</span>
              </span>
              <motion.svg 
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full sm:w-64 bg-gray-900 rounded-xl border border-blue-500/30 shadow-2xl overflow-hidden z-20 max-h-80 overflow-y-auto custom-scrollbar"
                  >
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => handleLanguageSelect(lang.value)}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                          language === lang.value
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-blue-600/20 hover:text-white'
                        }`}
                      >
                        <span className="text-xl">{lang.icon}</span>
                        <span className="font-medium text-sm md:text-base">{lang.label}</span>
                        {language === lang.value && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Code Input Area */}
        <div className="p-4 md:p-6">
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="// Paste your code here...&#10;function example() {&#10;  return 'Hello World';&#10;}&#10;&#10;// Tip: Press Ctrl+Enter to explain!"
              className="w-full h-64 md:h-96 bg-black/40 text-gray-100 font-mono text-xs md:text-sm p-3 md:p-4 rounded-lg border border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none resize-none backdrop-blur-sm transition-all"
              style={{
                lineHeight: '1.6',
                tabSize: 4,
              }}
            />
            
            {/* Character and Line Counter */}
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{lineCount} lines</span>
                <span>•</span>
                <span>{charCount} chars</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 mt-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              disabled={!code.trim()}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-2 rounded-lg border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCode}
              disabled={!code.trim()}
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-2 rounded-lg border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs md:text-sm"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </motion.button>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Info className="w-3 h-3" />
              <span className="hidden md:inline">Ctrl+Enter to explain</span>
            </div>
          </div>
        </div>

        {/* Footer with Submit Button */}
        <div className="p-4 md:p-6 pt-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading || !code.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 md:py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-base"
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
