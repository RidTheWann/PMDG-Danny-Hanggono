import { CheckCircle, ThumbsUp } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Berhasil" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-4">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 border border-green-400/30"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white mb-8 bg-white/5 p-4 rounded-lg border border-white/10 shadow-inner"
        >
          {message}
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-700/30 flex items-center gap-2 font-medium"
        >
          <ThumbsUp className="w-4 h-4" />
          Tutup
        </motion.button>
      </div>
    </Modal>
  );
}