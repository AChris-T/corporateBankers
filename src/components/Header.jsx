/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';
import RegistrationModal from './RegistrationModal';
import logo from '../assets/logo.png';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.4 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 w-full bg-card/95 backdrop-blur-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive sizing */}
            <motion.div
              className="flex  items-center space-x-2 md:space-x-4"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex   text-[#0b2241] w-full items-center space-x-2 md:space-x-3">
                <img src={logo} alt="" className="w-10 h-10 md:w-20 md:h-20" />
                <div className="flex flex-col">
                  <h1 className="font-Dancing font-extrabold text-sm md:text-2xl leading-tight">
                    Corporate
                  </h1>
                  <h2 className="font-inter font-bold text-lg md:text-2xl md:text-end md:w-[150px]">
                    Bankers'{' '}
                  </h2>
                  <h2 className="text-sm md:text-2xl font-Dancing text-end md:w-[250px]">
                    Alumni Association
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden font-inter text-[#0b2241] font-medium lg:flex items-center space-x-6 xl:space-x-8"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={() => handleMenuClick('#about')}
                className="text-foreground cursor-pointer hover:text-primary transition-colors text-sm xl:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.button>
              <motion.button
                onClick={() => handleMenuClick('#schedule')}
                className="text-foreground cursor-pointer hover:text-primary transition-colors text-sm xl:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Events
              </motion.button>
              <motion.button
                onClick={() => handleMenuClick('#speakers')}
                className="text-foreground cursor-pointer hover:text-primary transition-colors text-sm xl:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Speakers
              </motion.button>
              <motion.button
                onClick={() => handleMenuClick('#venue')}
                className="text-foreground cursor-pointer hover:text-primary transition-colors text-sm xl:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Venue
              </motion.button>
            </motion.nav>

            <motion.div
              className="flex items-center space-x-2"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="flex cursor-pointer bg-[#0b2241] text-white rounded-full hover:bg-[#1f252c] font-medium md:font-semibold shadow-accent text-sm md:text-base px-3 md:px-4 py-2"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={handleRegisterClick}
              >
                <span className="w-full">Register Now</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
