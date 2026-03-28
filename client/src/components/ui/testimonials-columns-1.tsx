'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2)
            .fill(0)
            .map((_, index) => (
              <React.Fragment key={index}>
                {props.testimonials.map(({ text, image, name, role }, i) => (
                  <div
                    className="p-6 rounded-lg border border-[#c9a84c]/20 bg-[#0d0d0f] backdrop-blur-sm max-w-xs w-full hover:border-[#c9a84c]/50 transition-all duration-300"
                    key={i}
                  >
                    <div className="text-gray-300 text-sm leading-relaxed">
                      "{text}"
                    </div>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#c9a84c]/10">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold text-[#c9a84c] text-sm">
                          {name}
                        </div>
                        <div className="text-xs text-gray-500">{role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )),
        ]}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn;
