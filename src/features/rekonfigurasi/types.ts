export interface RekonfigurasiList {
  alasan_rekonfigurasi: string;
  gi: string;
  id: string;
  keterangan: string;
  sub_sistem_akhir: {
    id: string;
    nama: string;
  };
  sub_sistem_awal: {
    id: string;
    nama: string;
  };
  waktu: string;
}
