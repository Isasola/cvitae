'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+595992954169';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.3 }}
    >
      <div className="relative">
        {/* Pulse Background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-lg"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Button */}
        <div className="relative bg-gradient-to-br from-[#25D366] to-[#1fa855] rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
