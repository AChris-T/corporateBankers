import React from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  const particleVariants = {
    animate: {
      y: [0, -100, 0],
      x: [0, Math.random() * 100 - 50, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-[#0b2241] rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          variants={particleVariants}
          animate="animate"
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
