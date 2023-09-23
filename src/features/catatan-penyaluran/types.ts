import { Dayjs } from "dayjs"

export type PayloadCatatanPenyaluran = {
  gardu_induk_id: string
  jurusan: string
  keterangan: string
  tanggal_mulai: Date
  waktu_mulai: Date
  tanggal_akhir?: Date
  waktu_akhir?: Date
}


export interface CatatanPenyaluranList {
  gardu_induk: {
    id: string;
    nama: string;
  }
  id: string;
  jurusan: string;
  keterangan: string;
  tanggal_akhir: string;
  tanggal_mulai: string;
}

export type FilterProps = {
  gardu_induk_id: string;
  jurusan: string;
  tanggal_mulai: Dayjs | null;
  tanggal_akhir: Dayjs | null;
};

