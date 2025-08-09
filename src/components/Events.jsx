/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { CalenderIcon, Location, TagIcon, TimeIcon } from '../assets/icons';

export default function Events() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="lg:px-40 px-3 mt-22 py-3 flex justify-center gap-4 items-center flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="text-3xl font-bold font-inter text-[#0b2241]"
        variants={titleVariants}
      >
        Events
      </motion.h3>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex flex-col gap-3">
          <motion.div
            className="bg-[#0b2241] w-full rounded-2xl flex flex-col gap-5 justify-between p-6 cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="gap-3 flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex -ml-2 items-center gap-3">
                <motion.div variants={iconVariants} whileHover="hover">
                  <CalenderIcon
                    width={30}
                    height={30}
                    className="flex-shrink-0"
                  />
                </motion.div>
                <h3 className="text-base font-inter font-medium text-white">
                  Friday 22nd Aug, 2025
                </h3>
              </div>
              <div className="text-white md:text-gray-400 -ml-2 gap-2 flex items-center">
                <motion.div variants={iconVariants} whileHover="hover">
                  <TimeIcon width={25} height={25} className="flex-shrink-0" />
                </motion.div>
                <h3 className="text-lg font-inter font-medium">02:00 PM</h3>
              </div>
            </div>

            <div className="flex -ml-2 gap-2 items-start md:items-center">
              <motion.div
                className="flex-shrink-0"
                variants={iconVariants}
                whileHover="hover"
              >
                <TagIcon width={25} height={25} />
              </motion.div>
              <span className="text-white uppercase font-semibold text-sm md:text-base font-inter">
                Flash Back Friday: NOSTALGIC CB{' '}
                <span className="text-gray-300 uppercase font-semibold text-sm">
                  Meeting,School Tour,Games & TGIF ViBEs
                </span>
              </span>
            </div>

            <div className="flex items-start md:items-center gap-2 -ml-2">
              <motion.div
                className="flex-shrink-0"
                variants={iconVariants}
                whileHover="hover"
              >
                <Location width={25} height={25} className="flex-shrink-0" />
              </motion.div>
              <h3 className="text-sm font-inter font-semibold text-white">
                ROTUNDA HALL, THE POLYTECHNIC IBADAN.
              </h3>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#0b2241] w-full rounded-2xl flex flex-col gap-5 justify-between p-6 cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="gap-3 flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex -ml-2 items-center gap-3">
                <motion.div variants={iconVariants} whileHover="hover">
                  <CalenderIcon
                    width={30}
                    height={30}
                    className="flex-shrink-0"
                  />
                </motion.div>
                <h3 className="text-base font-inter font-medium text-white">
                  Saturday 23nd Aug, 2025
                </h3>
              </div>
              <div className="text-white md:text-gray-400 -ml-2 gap-2 flex items-center">
                <motion.div variants={iconVariants} whileHover="hover">
                  <TimeIcon width={25} height={25} className="flex-shrink-0" />
                </motion.div>
                <h3 className="text-lg font-inter font-medium">10:00 AM</h3>
              </div>
            </div>

            <div className="flex -ml-2 gap-2 items-start md:items-center">
              <motion.div
                className="flex-shrink-0"
                variants={iconVariants}
                whileHover="hover"
              >
                <TagIcon width={25} height={25} />
              </motion.div>
              <span className="text-white uppercase font-semibold text-sm md:text-base font-inter">
                Building Wealth Beyond Money: NOSTALGIC CB{' '}
                <span className="text-gray-300 uppercase font-semibold text-sm">
                  Relationships, Impact and Legacy
                </span>
              </span>
            </div>

            <div className="flex items-start md:items-center gap-2 -ml-2">
              <motion.div
                className="flex-shrink-0"
                variants={iconVariants}
                whileHover="hover"
              >
                <Location width={25} height={25} className="flex-shrink-0" />
              </motion.div>
              <h3 className="text-sm font-inter uppercase font-semibold text-white">
                THAMAS HOTEL NO 2 FRIN RD, JERICHO HILL, IBADAN 200284,OYO
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
