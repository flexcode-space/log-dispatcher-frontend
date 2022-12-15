export interface CatatanPembangkitanList {
  id: string;
  keterangan: string;
  mampu: number;
  operator: string;
  pembangkit: {
    id: string;
    nama: string
  };
  status: string;
  tanggal_akhir: string;
  tanggal_mulai: string;
}

export type PayloadCatatanPembangkitan = {
  pembangkit_id: string;
  mampu: number | null;
  status: string;
  tanggal_mulai: Date;
  waktu_mulai: Date;
  tanggal_akhir?: Date;
  waktu_akhir?: Date;
  keterangan: string;
};