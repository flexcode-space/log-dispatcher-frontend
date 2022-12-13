export type PayloadKapasitorReaktor = {
  gardu_induk_id: string,
  jam_buka: Date,
  jam_tutup: Date,
  keterangan: string,
  tanggal: Date,
  tegangan_sebelum: number | null,
  tegangan_sesudah: number | null,
};

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
