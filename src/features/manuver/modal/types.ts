import { Dayjs } from "dayjs";

export interface PayloadManuver {
  buka: string;
  gangguan_id: string;
  gardu_induk_id: string;
  jurusan: string;
  keterangan: string;
  tutup: string;
}

export interface InitialValue {
  gardu_induk: { id: string }[];
  buka: { value: Dayjs | null }[];
  tutup: { value: Dayjs | null }[];
  jurusan: { value: string }[];
  keterangan: { value: string }[];
}
