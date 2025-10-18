'use client';

import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 md:mt-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm overflow-hidden">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg animate-pulse" />
            <div>
              <div className="w-48 h-5 bg-white/20 rounded animate-pulse mb-2" />
              <div className="w-32 h-3 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-4 md:p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-blue-500/20 overflow-hidden"
            >
              {/* Line header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 px-4 py-2 border-b border-blue-500/20">
                <div className="w-16 h-5 bg-blue-500/30 rounded animate-pulse" />
              </div>
              
              {/* Code skeleton */}
              <div className="px-4 py-3 bg-black/30">
                <div className="w-full h-4 bg-gray-700/50 rounded animate-pulse mb-2" />
                <div className="w-3/4 h-4 bg-gray-700/50 rounded animate-pulse" />
              </div>
              
              {/* Explanation skeleton */}
              <div className="px-4 py-3">
                <div className="w-full h-3 bg-gray-700/30 rounded animate-pulse mb-2" />
                <div className="w-5/6 h-3 bg-gray-700/30 rounded animate-pulse mb-2" />
                <div className="w-4/6 h-3 bg-gray-700/30 rounded animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
