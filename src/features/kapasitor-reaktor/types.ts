export interface KapasitorReaktorList {
  id: string;
  gardu_induk: {
    id: string;
    nama: string
  };
  jam_buka: string;
  jam_tutup: string;
  tegangan_sebelum: number;
  tegangan_sesudah: number;
  keterangan: string;
  tanggal: string;
}
