import { useState } from 'react';
import Modal from './Modal';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
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
  onConfirm 
}: DeleteConfirmationModalProps) {
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
          className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-6 shadow-lg shadow-red-500/20 border border-red-400/30"
        >
          <AlertTriangle className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-medium text-white mb-3 bg-red-500/10 px-4 py-1 rounded-full"
        >
          Hapus Data Pasien
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 mb-8 bg-white/5 p-4 rounded-lg border border-white/10 shadow-inner"
        >
          Apakah Anda yakin ingin menghapus data pasien <span className="font-semibold text-white bg-red-500/20 px-2 py-0.5 rounded">{patientName}</span>? 
          <span className="block mt-2 text-red-300">Tindakan ini tidak dapat dibatalkan.</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#4B5563' }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 font-medium"
          >
            <X className="w-4 h-4" />
            Batal
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#DC2626' }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 disabled:opacity-70 text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 font-medium"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-t-2 border-white mr-2"></span>
                <span>Menghapus...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Hapus
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </Modal>
  );
}