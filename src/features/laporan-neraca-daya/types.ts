export interface LaporanNeracaDayaList {
  beban_ibt: number;
  beban_kit: number;
  dm_pasok: number;
  ibt: {
    id: string;
    nama: string;
  };
  id: string;
  keterangan: string;
  pembangkit: {
    id: string;
    nama: string;
  };
  sub_sistem: {
    id: string;
    nama: string;
  };
  tanggal: string;
}
