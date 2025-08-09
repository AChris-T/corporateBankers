/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import heroVideo from '../assets/herovideo.mp4';
import flier from '../assets/flier.jpeg';

export default function Anniversary() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="lg:px-40 mt-32 mx-2 py-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="h-[500px]  justify-center flex ">
        <img src={flier} alt="" className="object-cover relative" />
        <motion.div
          className="h-[90px] absolute -ml-52 -mt-6  w-[200px] shadow-md"
          variants={videoVariants}
        >
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            className="rounded-md"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
