'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, CheckCircle, Lightbulb, Code } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Explanation {
  lineNumber: number;
  code: string;
  explanation: string;
}

interface ExplanationDisplayProps {
  explanations: Explanation[];
  language: string;
}

export default function ExplanationDisplay({ explanations, language }: ExplanationDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadExplanation = () => {
    let content = `Code Explanation (${language})\n`;
    content += '='.repeat(50) + '\n\n';
    
    explanations.forEach((exp) => {
      content += `Line ${exp.lineNumber}:\n`;
      content += `Code: ${exp.code}\n`;
      content += `Explanation: ${exp.explanation}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-explanation-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded explanation!');
  };

  if (explanations.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Line-by-Line Explanation</h2>
              <p className="text-blue-100 text-xs">{explanations.length} lines analyzed</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadExplanation}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </motion.button>
        </div>

        {/* Explanations List */}
        <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {explanations.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-blue-500/20 overflow-hidden backdrop-blur-sm hover:border-blue-500/40 transition-all"
              >
                {/* Line Number Badge */}
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 px-4 py-2 border-b border-blue-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Line {exp.lineNumber}
                    </span>
                    <Code className="w-4 h-4 text-blue-400" />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(exp.code, index)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>

                {/* Code Display */}
                <div className="px-4 py-3 bg-black/30">
                  <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                    <code>{exp.code || '// Empty line'}</code>
                  </pre>
                </div>

                {/* Explanation */}
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: hoveredIndex === index ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                  }}
                  className="px-4 py-3"
                >
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {exp.explanation}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
