import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, scale: 0.9, x: '-50%', transition: { duration: 0.2 } }}
          className="fixed bottom-10 left-1/2 z-[1000] min-w-[300px]"
        >
          <div className="logo-gradient-container rounded-2xl p-[1px] shadow-2xl">
            <div className="bg-[#0a0a0a]/95 backdrop-blur-md rounded-[15px] px-6 py-4 flex items-center gap-4 border border-white/5">
              {type === 'success' ? (
                <IoCheckmarkCircle className="text-green-400 w-6 h-6 shrink-0" />
              ) : (
                <IoAlertCircle className="text-red-400 w-6 h-6 shrink-0" />
              )}
              <p className="text-[#f0ede8] font-inter text-[14px] md:text-[16px] font-light tracking-wide">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
