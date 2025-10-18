'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FloatingCard({ children, delay = 0, className = '' }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        whileHover={{
          rotateX: 5,
          rotateY: 5,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        {/* 3D Shadow Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl blur-xl -z-10"
          style={{
            transform: 'translateZ(-20px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
