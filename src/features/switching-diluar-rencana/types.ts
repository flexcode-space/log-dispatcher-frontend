export interface SwitchingLuarRencanaList {
  gardu_induk: {
    id: string;
    nama: string;
  };
  id: string;
  jam_buka: string;
  jam_tutup: string;
  keterangan: string;
  penghantar: {
    id: string;
    nama: string;
  };
  tanggal: string;
}
