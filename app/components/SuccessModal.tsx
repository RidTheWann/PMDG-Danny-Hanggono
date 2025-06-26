import { CheckCircle, ThumbsUp } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Berhasil" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg border bg-green-100 dark:bg-gradient-to-br dark:from-green-400 dark:to-green-600 dark:shadow-green-500/20 dark:border-green-400/30 border-green-300 shadow-green-200/30"
        >
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-900 dark:text-white mb-8 bg-gray-100 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 shadow-inner"
        >
          {message}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-8 py-3 rounded-lg text-gray-900 dark:text-white bg-green-200 dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-600 dark:hover:to-emerald-700 dark:shadow-green-700/30 hover:bg-green-300 transition-all duration-300 shadow-lg flex items-center gap-2 font-medium"
        >
          <ThumbsUp className="w-4 h-4" />
          Tutup
        </motion.button>
      </div>
    </Modal>
  );
}
