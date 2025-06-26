import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  // Mencegah scroll pada body ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 dark:bg-black/60 bg-white/60 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`w-[98vw] sm:w-full ${maxWidth} bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.08)] dark:shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-700/50 backdrop-filter backdrop-blur-sm transform transition-all overflow-hidden`}
        style={{ maxWidth: '98vw', willChange: 'transform', contain: 'layout paint' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-white transition-all duration-200 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="p-3 sm:p-6 max-h-[80vh] overflow-y-auto" style={{ willChange: 'transform', contain: 'layout paint' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}