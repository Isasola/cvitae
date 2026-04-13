'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => (
  <motion.a
    href="https://wa.me/595992954169"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-md"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30">
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.428.638 4.704 1.756 6.678L2 30l7.52-1.732A13.944 13.944 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm-3.5 8.5c-.28 0-.74.1-1.13.52-.39.42-1.49 1.46-1.49 3.56s1.53 4.13 1.74 4.41c.22.28 2.99 4.77 7.37 6.5 3.65 1.44 4.39 1.15 5.18 1.08.79-.07 2.55-1.04 2.91-2.05.36-1.01.36-1.87.25-2.05-.11-.18-.39-.28-.82-.49-.43-.21-2.55-1.26-2.94-1.4-.39-.14-.68-.21-.96.21-.28.42-1.09 1.4-1.34 1.69-.25.28-.49.32-.92.11-.43-.21-1.82-.67-3.47-2.14-1.28-1.14-2.15-2.55-2.4-2.97-.25-.43-.03-.66.19-.87.19-.19.43-.49.64-.74.21-.25.28-.43.43-.71.14-.28.07-.53-.04-.74-.11-.21-.96-2.32-1.33-3.17-.34-.8-.69-.7-.96-.71z" fill="white"/>
        </svg>
      </div>
    </div>
  </motion.a>
);

export default WhatsAppButton;
