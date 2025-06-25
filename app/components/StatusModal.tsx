import { CheckCircle, XCircle, ThumbsUp, AlertOctagon, ArrowRight } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'success' | 'error';
  message: string;
}

export default function StatusModal({ isOpen, onClose, status, message }: StatusModalProps) {
  const router = useRouter();
  
  const handleViewData = () => {
    onClose();
    router.push('/data-pasien');
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={status === 'success' ? 'Berhasil' : 'Gagal'} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-4">
        <motion.div 
          initial={{ scale: 0, rotate: status === 'success' ? -180 : 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg border ${status === 'success' 
            ? 'bg-green-100 dark:bg-gradient-to-br dark:from-green-400 dark:to-green-600 dark:shadow-green-500/20 dark:border-green-400/30 border-green-300 shadow-green-200/30' 
            : 'bg-red-100 dark:bg-gradient-to-br dark:from-red-400 dark:to-red-600 dark:shadow-red-500/20 dark:border-red-400/30 border-red-300 shadow-red-200/30'}`}
        >
          {status === 'success' ? (
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-white" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600 dark:text-white" />
          )}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-900 dark:text-white mb-8 bg-gray-100 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 shadow-inner"
        >
          {message}
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`px-6 py-3 rounded-lg text-gray-900 dark:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 font-medium ${
              status === 'success' 
                ? 'bg-green-200 dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-600 dark:hover:to-emerald-700 dark:shadow-green-700/30 hover:bg-green-300' 
                : 'bg-red-200 dark:bg-gradient-to-r dark:from-red-500 dark:to-rose-600 dark:hover:from-red-600 dark:hover:to-rose-700 dark:shadow-red-700/30 hover:bg-red-300'
            }`}
          >
            {status === 'success' ? (
              <ThumbsUp className="w-4 h-4" />
            ) : (
              <AlertOctagon className="w-4 h-4" />
            )}
            Tutup
          </motion.button>
          
          {status === 'success' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewData}
              className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-700/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
            >
              Lihat Data
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </Modal>
  );
}