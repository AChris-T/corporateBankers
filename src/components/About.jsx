/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import RegistrationModal from './RegistrationModal';

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.8 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.div 
        className="flex justify-center items-center pt-[130px] md:pt-[150px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-2 items-center mt-2 md:mt-20">
          <motion.h3 
            className="bg-[#ffcc4d] uppercase rounded-full px-3  py-1 text-sm md:text-base font-medium text-white"
            variants={floatingVariants}
            animate={["visible", "animate"]}
          >
            6th Alumni Reunion
          </motion.h3>
          <AnimatedText 
            text="Building wealth Beyond money"
            className="text-4xl md:text-6xl max-w-[850px] font-inter font-bold text-center uppercase text-[#0b2241]"
            delay={0.3}
          />
          <motion.h3 
            className="md:text-xl font-serif text-center  text-gray-600 font-semibold"
            variants={itemVariants}
          >
            Relationships, impact and legacy
          </motion.h3>
          <motion.div 
            className="flex mt-8 md:mt-10"
            variants={buttonVariants}
          >
            <motion.button 
              className="flex cursor-pointer bg-[#0b2241] text-white rounded-full hover:bg-[#1f252c] font-medium md:font-semibold shadow-accent text-base md:text-base px-8 md:px-10 py-3"
              whileHover="hover"
              whileTap="tap"
              onClick={handleRegisterClick}
              whileInView={{
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }
              }}
            >
              <span className="w-full">Register Now</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
