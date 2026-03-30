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
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378L2.18 9.74l2.636.694a9.915 9.915 0 004.84 1.255h.004c5.487 0 9.956-4.468 9.958-9.957A9.918 9.918 0 0012.051 2C6.56 2 2.09 6.467 2.088 11.955c-.001 1.754.46 3.466 1.332 4.973L2 22l5.233-1.374a9.944 9.944 0 004.814 1.228h.004c5.486 0 9.955-4.467 9.957-9.955 0-2.659-1.034-5.161-2.916-7.039A9.907 9.907 0 0012.055 2.001z"/>
        </svg>
      </div>
    </div>
  </motion.a>
);

export default WhatsAppButton;
