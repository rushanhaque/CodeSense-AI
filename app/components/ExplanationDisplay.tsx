'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, CheckCircle, Lightbulb, Code } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  const copyAllCode = () => {
    const allCode = explanations.map(exp => exp.code).join('\n');
    navigator.clipboard.writeText(allCode);
    toast.success('All code copied to clipboard!');
  };

  const copyAllExplanations = () => {
    let content = `Code Explanations (${language})\n`;
    content += '='.repeat(50) + '\n\n';
    
    explanations.forEach((exp) => {
      content += `Line ${exp.lineNumber}: ${exp.code}\n`;
      content += `→ ${exp.explanation}\n\n`;
    });

    navigator.clipboard.writeText(content);
    toast.success('All explanations copied!');
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
      className="w-full max-w-6xl mx-auto mt-6 md:mt-8"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base md:text-lg">Line-by-Line Explanation</h2>
              <p className="text-blue-100 text-xs">{explanations.length} lines analyzed</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyAllCode}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-xs"
            >
              <Copy className="w-4 h-4" />
              <span>Code</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyAllExplanations}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-xs"
            >
              <Copy className="w-4 h-4" />
              <span>All</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadExplanation}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-xs"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </motion.button>
          </div>
        </div>

        {/* Explanations List */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-4 max-h-[500px] md:max-h-[600px] overflow-y-auto custom-scrollbar">
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
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 px-3 md:px-4 py-2 border-b border-blue-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Line {exp.lineNumber}
                    </span>
                    <Code className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
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

                {/* Code Display with Syntax Highlighting */}
                <div className="px-3 md:px-4 py-3 bg-black/30 overflow-x-auto">
                  <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      fontSize: '0.875rem',
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                      }
                    }}
                  >
                    {exp.code || '// Empty line'}
                  </SyntaxHighlighter>
                </div>

                {/* Explanation */}
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: hoveredIndex === index ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                  }}
                  className="px-3 md:px-4 py-3"
                >
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
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
