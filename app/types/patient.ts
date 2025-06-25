export interface Patient {
  id: string | number;
  tanggal: string;
  nama_pasien: string;
  no_rm: string;
  kelamin: string;
  jenis_pasien: string;
  actions?: string[];
  lainnya?: string;
  tanggal_asli?: string;
  nama_pasien_asli?: string;
  no_rm_asli?: string;
  obat?: boolean;
  cabut_anak?: boolean;
  cabut_dewasa?: boolean;
  tambal_sementara?: boolean;
  tambal_tetap?: boolean;
  scaling?: boolean;
  rujuk?: boolean;
  [key: string]: string | number | boolean | string[] | undefined;
}
