/* eslint-disable no-unused-vars */
import './App.css';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import About from './components/About';
import Anniversary from './components/Anniversary';
import Events from './components/Events';
import Footer from './components/Footer';
import Header from './components/Header';
import Speaker from './components/Speaker';
import Pictures from './components/Pictures';

function App() {
  const aboutRef = useRef(null);
  const anniversaryRef = useRef(null);
  const eventsRef = useRef(null);
  const speakerRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: true, margin: '-100px' });
  const isAnniversaryInView = useInView(anniversaryRef, {
    once: true,
    margin: '-100px',
  });
  const isEventsInView = useInView(eventsRef, { once: true, margin: '-100px' });
  const isSpeakerInView = useInView(speakerRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <div className="bg-[#f4f8fc] relative">
      <Header />
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <About />
      </motion.div>
      <motion.div
        ref={anniversaryRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isAnniversaryInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Anniversary />
      </motion.div>
      <motion.div
        ref={eventsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isEventsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Events />
      </motion.div>
      <motion.div
        ref={speakerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isSpeakerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Speaker />
      </motion.div>
      <Pictures />
      <Footer />
    </div>
  );
}

export default App;
