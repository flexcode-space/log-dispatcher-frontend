export interface LaporanScadaList {
  aksi: string;
  aset: string;
  bay: string;
  gardu_induk: {
    id: string;
    nama: string;
  };
  id: string;
  keterangan: string;
  status: string;
  tanggal: string;
  tanggal_konfirmasi: string;
  tipe: string;
}

export interface PayloadLaporanScada {
  aksi: string;
  aset: string;
  bay: string;
  gardu_induk_id: string;
  keterangan: string;
  status: string;
  tanggal: string;
  tanggal_konfirmasi: string;
  tipe: string;
}

