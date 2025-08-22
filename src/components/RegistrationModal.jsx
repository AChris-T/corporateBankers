/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import attendanceData from '../Attendance_sheet (1).json';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [fullNameError, setFullnameError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [copied, setCopied] = useState(false);

  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, [isOpen]);

  const generateCode = () => {
    // 6-digit numeric OTP
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  };

  const normalizeEmail = (str) => (str || '').toString().trim().toLowerCase();
  const normalizePhoneDigits = (str) => (str || '').toString().replace(/[^0-9]/g, '');

  // Local storage helpers
  const getCacheKey = (identifier) => {
    const id = (identifier || '').toString().trim();
    if (validateEmail(id)) return `reg:email:${normalizeEmail(id)}`;
    return `reg:phone:${normalizePhoneDigits(id)}`;
  };

  const readCachedRegistration = (identifier) => {
    try {
      const raw = localStorage.getItem(getCacheKey(identifier));
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  };

  const writeCachedRegistration = (identifier, payload) => {
    try {
      const key = getCacheKey(identifier);
      localStorage.setItem(
        key,
        JSON.stringify({ ...payload, ts: Date.now() })
      );
    } catch (_) {
      // ignore storage errors
    }
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (value) => {
    if (!value) return false;
    const digits = value.toString().replace(/[^0-9]/g, '');
    return digits.length >= 7;
  };

  const lookupByIdentifier = (identifier) => {
    const isEmail = validateEmail(identifier);
    const idEmail = normalizeEmail(identifier);
    const idPhoneDigits = normalizePhoneDigits(identifier);

    for (const row of attendanceData || []) {
      // Emails (some rows have key 'Email ')
      const rawEmail = row['Email'] ?? row['Email '] ?? '';
      const emailCandidates = (rawEmail || '')
        .toString()
        .split(/[\s,\n]+/)
        .map(normalizeEmail)
        .filter(Boolean);

      // Phones (key often 'Phone ' with trailing space)
      const rawPhone = row['Phone'] ?? row['Phone '] ?? '';
      const phoneCandidates = (rawPhone || '')
        .toString()
        .split(/[\s,\n]+/)
        .map(normalizePhoneDigits)
        .filter(Boolean);

      if (isEmail) {
        if (emailCandidates.includes(idEmail)) {
          return {
            name: row['Name'] || '',
            email: emailCandidates.find(Boolean) || '',
          };
        }
      } else if (validatePhone(identifier)) {
        const match = phoneCandidates.find((cand) =>
          cand && idPhoneDigits ? cand.endsWith(idPhoneDigits) || idPhoneDigits.endsWith(cand) : false
        );
        if (match) {
          return {
            name: row['Name'] || '',
            email: emailCandidates.find(Boolean) || '',
          };
        }
      }
    }
    return null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError('Please enter your email or phone number');
      return;
    }
    if (!(validateEmail(email) || validatePhone(email))) {
      setEmailError('Enter a valid email address or phone number');
      return;
    }

    setEmailError('');
    setServerError('');

    // If cached, reuse code without backend submission
    const cached = readCachedRegistration(email);
    if (cached && cached.code && cached.name) {
      setName(cached.name || '');
      setGeneratedCode(cached.code);
      setIsSubmitted(true);
      return;
    }

    // Lookup by email or phone from attendance sheet
    const found = lookupByIdentifier(email);
    if (!found || !found.name) {
      setServerError('Email or phone not found in attendance list.');
      return;
    }
    setName(found.name);

    const code = generateCode();
    setGeneratedCode(code);

    const endpoint = '/api/register';

    try {
      setIsLoading(true);

      console.log('Registration endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: found.name,
          email: found.email || (validateEmail(email) ? email : ''),
          timeline: code,
        }),
      });

      let result = {};
      try {
        result = await response.json();
      } catch (_) {
        // non-JSON response
      }

      if (
        response.ok &&
        (result.success === undefined || result.success === true)
      ) {
        // Cache successful registration
        writeCachedRegistration(email, {
          name: found.name,
          email: found.email || (validateEmail(email) ? email : ''),
          code,
        });
        setIsSubmitted(true);
      } else {
        const message =
          result.message || 'Registration failed. Please try again.';
        setServerError(message);
      }
    } catch (error) {
      console.error('Error:', error);
      setServerError(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    setGeneratedCode('');
    setEmailError('');
    setName('');
    setFullnameError('');
    setServerError('');
    setIsLoading(false);
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-white/20"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2
                    id="modal-title"
                    className="text-2xl md:text-3xl font-bold text-[#0b2241] mb-2 text-center"
                  >
                    Confirm Register for the  Event
                  </h2>
                  <p
                    id="modal-description"
                    className="text-gray-600 text-center mb-6"
                  >
                    Enter your email or phone number to receive your unique registration code
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email or Phone Number
                    </label>
                    <input
                      ref={firstFieldRef}
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2241] transition-colors ${
                        emailError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email or phone number"
                      autoComplete="on"
                      aria-invalid={Boolean(emailError)}
                      aria-describedby={emailError ? 'email-error' : undefined}
                      disabled={isLoading}
                    />
                    {emailError && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {emailError}
                      </motion.p>
                    )}
                  </motion.div>
                  {serverError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm"
                    >
                      {serverError}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex gap-3 pt-4"
                  >
                    <motion.button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors text-white ${
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#0b2241] hover:bg-[#1f252c]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? 'Registering…' : 'Register'}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            ) : (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold text-[#0b2241] mb-2"
                >
                  Registration Successful!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-gray-600 mb-6"
                >
                  Thank you for registering! Please save your unique
                  registration code.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#0b2241] text-white p-4 rounded-lg mb-6"
                >
                  <p className="text-sm text-gray-300 mb-2">
                    Your Registration Code:
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-2xl font-bold tracking-wider select-all">
                      {generatedCode}
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(generatedCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        } catch (_) {
                          // ignore
                        }
                      }}
                      className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded"
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-sm text-gray-500 mb-6"
                >
                  Please keep this code safe. You'll need it for event check-in.
                </motion.p>

                <motion.button
                  onClick={handleClose}
                  className="px-6 py-3 bg-[#0b2241] text-white rounded-lg font-medium hover:bg-[#1f252c] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
