import { useState } from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  patientName,
  onConfirm,
}: DeleteConfirmationModalProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Gagal menghapus data pasien');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi Hapus" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg border bg-red-100 dark:bg-gradient-to-br dark:from-red-400 dark:to-red-600 dark:shadow-red-500/20 dark:border-red-400/30 border-red-300 shadow-red-200/30"
        >
          <AlertTriangle className="w-10 h-10 text-red-600 dark:text-white" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-medium text-red-700 dark:text-white mb-3 bg-red-200 dark:bg-red-500/10 px-4 py-1 rounded-full"
        >
          Hapus Data Pasien
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 dark:text-gray-300 mb-8 bg-gray-100 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10 shadow-inner"
        >
          Apakah Anda yakin ingin menghapus data pasien{' '}
          <span className="font-semibold text-red-700 dark:text-white bg-red-200 dark:bg-red-500/20 px-2 py-0.5 rounded">
            {patientName}
          </span>
          ?<span className="block mt-2 text-red-300">Tindakan ini tidak dapat dibatalkan.</span>
        </motion.p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gradient-to-r dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-900 dark:text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 font-medium"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-3 bg-red-200 dark:bg-gradient-to-r dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 disabled:from-red-800 disabled:to-red-900 disabled:opacity-70 text-red-700 dark:text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 font-medium"
            disabled={loading}
          >
            {loading && (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-t-2 border-red-700 dark:border-white mr-2"></span>
            )}
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
}
