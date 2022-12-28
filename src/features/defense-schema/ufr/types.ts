export interface DefenseUFRList {
  beban_malam: number;
  beban_siang: number;
  gardu_induk: {
    id: string;
    nama: string;
  };
  id: string;
  keterangan: string;
  penyulang: string;
  penyulang_buka: string;
  penyulang_kw: number;
  penyulang_kwh: number;
  penyulang_menit: number;
  penyulang_tutup: string;
  set: number;
  status: boolean;
  sub_sistem: {
    id: string;
    nama: string;
  };
  tahap: {
    id: string;
    value: number;
  };
  tanggal: string;
  trafo: {
    id: string;
    nama: string;
  };
  ufr_kw: number;
  ufr_kwh: number;
  ufr_masuk: string;
  ufr_menit: number;
  ufr_trip: string;
  upt: string;
}
