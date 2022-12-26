export interface LaporanPekerjaanList {
  bay: string;
  gardu_induk: {
    id: string;
    nama: string;
  };
  id: string;
  keterangan: string;
  kontingensi: string;
  progress: string;
  tagar: string;
  tanggal: string;
  tipe: string;
  unit_pelaksana: string;
  uraian_pekerjaan: string;
  waktu_akhir: string;
  waktu_mulai: string;
}
