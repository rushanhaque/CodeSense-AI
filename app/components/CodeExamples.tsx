'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Code, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface CodeExample {
  title: string;
  language: string;
  code: string;
  description: string;
}

const examples: CodeExample[] = [
  {
    title: 'JavaScript Function',
    language: 'javascript',
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    description: 'Recursive Fibonacci sequence'
  },
  {
    title: 'Python Class',
    language: 'python',
    code: `class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, x, y):
        self.result = x + y
        return self.result`,
    description: 'Simple calculator class'
  },
  {
    title: 'HTML Structure',
    language: 'html',
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>Hello World!</p>
  </body>
</html>`,
    description: 'Basic HTML page structure'
  },
  {
    title: 'CSS Styling',
    language: 'css',
    code: `.container {
  display: flex;
  justify-content: center;
  background-color: #3b82f6;
  padding: 20px;
}`,
    description: 'Flexbox container styling'
  },
  {
    title: 'C Program',
    language: 'c',
    code: `#include <stdio.h>

int main() {
    int num = 10;
    printf("Number: %d\\n", num);
    return 0;
}`,
    description: 'Simple C program'
  },
  {
    title: 'C++ Class',
    language: 'cpp',
    code: `class Rectangle {
private:
    int width, height;
public:
    Rectangle(int w, int h) {
        width = w;
        height = h;
    }
};`,
    description: 'C++ rectangle class'
  },
];

interface CodeExamplesProps {
  onSelectExample: (code: string, language: string) => void;
}

export default function CodeExamples({ onSelectExample }: CodeExamplesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm md:text-base"
      >
        <Sparkles className="w-4 h-4" />
        <span>Try Examples</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/30 max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="w-6 h-6 text-white" />
                  <div>
                    <h3 className="text-white font-bold text-lg">Code Examples</h3>
                    <p className="text-blue-100 text-xs">Click any example to load it</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Examples Grid */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => {
                        onSelectExample(example.code, example.language);
                        setIsOpen(false);
                      }}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-blue-500/20 hover:border-blue-500/50 p-4 cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">{example.title}</h4>
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">
                          {example.language}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mb-3">{example.description}</p>
                      <pre className="bg-black/40 text-gray-300 text-xs p-3 rounded-lg overflow-x-auto font-mono">
                        <code>{example.code}</code>
                      </pre>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
