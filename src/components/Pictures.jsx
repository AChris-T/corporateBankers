/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pictures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const imageUrls = useMemo(() => {
    const modules = import.meta.glob('/src/assets/pictures/*.{jpg,jpeg,png,gif}', {
      eager: true,
      query: '?url',
      import: 'default',
    });
    return Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, url]) => url);
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((idx) => (idx === null ? null : (idx - 1 + imageUrls.length) % imageUrls.length));
  };
  const showNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((idx) => (idx === null ? null : (idx + 1) % imageUrls.length));
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, imageUrls.length]);

  return (
    <motion.section
      className="lg:px-40 px-3 py-10 flex justify-center items-stretch flex-col gap-6"
      initial="hidden"
      variants={containerVariants}
      animate="visible"
    >
      <motion.h3
        variants={titleVariants}
        className="text-3xl font-bold font-inter text-[#0b2241] text-center"
      >
        Pictures Speak
      </motion.h3>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
        variants={containerVariants}
      >
        {imageUrls.map((src, index) => {
          const filename = src.split('/').pop() || `Image ${index + 1}`;
          return (
            <motion.button
              key={src}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative block w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2241]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={src}
                alt={filename}
                loading="lazy"
                className="h-36 sm:h-40 md:h-44 w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageUrls[lightboxIndex]}
                alt={`Preview ${lightboxIndex + 1}`}
                className="max-h-[80vh] w-full object-contain rounded-lg shadow-xl"
              />

              <div className="absolute inset-x-0 -bottom-14 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={showPrev}
                  className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30"
                  aria-label="Previous image"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30"
                  aria-label="Close lightbox"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30"
                  aria-label="Next image"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
