import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { User, Calendar, CreditCard, Activity, CheckCircle, Pill, Scissors, Smile, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Patient } from '../types/patient';

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onSave: (updatedPatient: Patient) => Promise<void>;
}

export default function EditPatientModal({ isOpen, onClose, patient, onSave }: EditPatientModalProps) {
  const [formData, setFormData] = useState<Patient>({
    id: '', // Menambahkan id agar sesuai dengan tipe Patient
    tanggal: '',
    nama_pasien: '',
    no_rm: '',
    kelamin: '',
    jenis_pasien: '',
    lainnya: ''
  });
  const [loading, setLoading] = useState(false);

  // Mengisi form dengan data pasien ketika modal dibuka
  useEffect(() => {
    if (patient) {
      let actions = [];
      if (patient.actions) {
        if (Array.isArray(patient.actions)) {
          actions = patient.actions;
        } else if (typeof patient.actions === 'string') {
          try {
            actions = JSON.parse(patient.actions);
          } catch (e) {
            actions = [];
          }
        }
      }
      setFormData({
        id: patient.id,
        tanggal: patient.tanggal,
        nama_pasien: patient.nama_pasien,
        no_rm: patient.no_rm,
        kelamin: patient.kelamin,
        jenis_pasien: patient.jenis_pasien,
        actions: actions,
        lainnya: patient.lainnya || '',
        tanggal_asli: patient.tanggal_asli || patient.tanggal,
        nama_pasien_asli: patient.nama_pasien_asli || patient.nama_pasien,
        no_rm_asli: patient.no_rm_asli || patient.no_rm,
        obat: actions.includes('Obat'),
        cabut_anak: actions.includes('Cabut Anak'),
        cabut_dewasa: actions.includes('Cabut Dewasa'),
        tambal_sementara: actions.includes('Tambal Sementara'),
        tambal_tetap: actions.includes('Tambal Tetap'),
        scaling: actions.includes('Scaling'),
        rujuk: actions.includes('Rujuk')
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: Patient) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: Patient) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Kumpulkan tindakan yang dipilih
      const selectedActions = [];
      if (formData.obat) selectedActions.push('Obat');
      if (formData.cabut_anak) selectedActions.push('Cabut Anak');
      if (formData.cabut_dewasa) selectedActions.push('Cabut Dewasa');
      if (formData.tambal_sementara) selectedActions.push('Tambal Sementara');
      if (formData.tambal_tetap) selectedActions.push('Tambal Tetap');
      if (formData.scaling) selectedActions.push('Scaling');
      if (formData.rujuk) selectedActions.push('Rujuk');
      
      // Update formData dengan actions terbaru
      const updatedData = {
        ...formData,
        actions: selectedActions
      };
      
      await onSave(updatedData);
      onClose();
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('Gagal menyimpan data pasien');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Data Pasien" maxWidth="max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6">
              {/* Hapus animasi framer-motion pada field input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-900 dark:text-blue-300 mb-1.5 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  Tanggal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 group-hover:border-gray-400 dark:group-hover:border-gray-500 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-900 dark:text-blue-300 mb-1.5 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  No. RM
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="no_rm"
                    value={formData.no_rm}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 group-hover:border-gray-400 dark:group-hover:border-gray-500 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-900 dark:text-blue-300 mb-1.5 flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  Nama Pasien
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nama_pasien"
                    value={formData.nama_pasien}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 group-hover:border-gray-400 dark:group-hover:border-gray-500 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-900 dark:text-blue-300 mb-1.5 flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  Kelamin
                </label>
                <div className="relative">
                  <select
                    name="kelamin"
                    value={formData.kelamin}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 group-hover:border-gray-400 dark:group-hover:border-gray-500 backdrop-blur-sm appearance-none"
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="group md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 dark:text-blue-300 mb-1.5 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  Jenis Pasien
                </label>
                <div className="relative">
                  <select
                    name="jenis_pasien"
                    value={formData.jenis_pasien}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all shadow-sm hover:border-gray-400 dark:hover:border-gray-500 group-hover:border-gray-400 dark:group-hover:border-gray-500 backdrop-blur-sm appearance-none"
                  >
                    <option value="">Pilih jenis pasien</option>
                    <option value="BPJS">BPJS</option>
                    <option value="UMUM">UMUM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tindakan Section */}
            <motion.div 
              className="mb-6" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex items-center mb-3">
                <Activity className="h-5 w-5 mr-2 text-blue-400" />
                <label className="text-sm font-medium text-blue-300">
                  Tindakan
                </label>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-inner">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.obat ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="obat"
                        checked={formData.obat || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.obat && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Pill className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Obat</span>
                    </div>
                  </motion.label>
                  
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.cabut_anak ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="cabut_anak"
                        checked={formData.cabut_anak || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.cabut_anak && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Scissors className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Cabut Anak</span>
                    </div>
                  </motion.label>
                  
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.cabut_dewasa ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="cabut_dewasa"
                        checked={formData.cabut_dewasa || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.cabut_dewasa && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Scissors className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Cabut Dewasa</span>
                    </div>
                  </motion.label>
                  
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.tambal_sementara ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="tambal_sementara"
                        checked={formData.tambal_sementara || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.tambal_sementara && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Tambal Sementara</span>
                    </div>
                  </motion.label>
                  
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.tambal_tetap ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="tambal_tetap"
                        checked={formData.tambal_tetap || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.tambal_tetap && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Tambal Tetap</span>
                    </div>
                  </motion.label>
                  
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.scaling ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="scaling"
                        checked={formData.scaling || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.scaling && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Scaling</span>
                    </div>
                  </motion.label>
                  
                  <motion.label 
                    className={`flex items-center space-x-3 cursor-pointer rounded-xl p-3 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md ${formData.rujuk ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-gray-700/80 border border-gray-600 hover:bg-gray-600/80'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="rujuk"
                        checked={formData.rujuk || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      {formData.rujuk && <div className="absolute inset-0 bg-blue-500 rounded scale-150 opacity-20 animate-pulse"></div>}
                    </div>
                    <div className="flex items-center">
                      <Smile className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm font-medium text-gray-200">Rujuk</span>
                    </div>
                  </motion.label>
                </div>
              </div>
            </motion.div>
            
            {/* Tindakan Lainnya */}
            <motion.div 
              className="mb-6" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center mb-3">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-400" />
                <label className="text-sm font-medium text-blue-300">
                  Tindakan Lainnya
                </label>
              </div>
              <textarea
                name="lainnya"
                value={formData.lainnya}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all shadow-sm hover:border-gray-500 backdrop-blur-sm resize-none"
                placeholder="Masukkan tindakan lainnya jika ada..."
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-8 sticky bottom-0 bg-gradient-to-t from-gray-900/90 to-transparent pt-3 z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 border border-gray-600 shadow-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-800 disabled:to-blue-900 disabled:opacity-70 text-white rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center shadow-md hover:shadow-blue-700/30 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  'Simpan'
                )}
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
}