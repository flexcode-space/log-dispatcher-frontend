import { Dayjs } from "dayjs";

export interface SwitchingPembangkitList {
  dispatch: string;
  energi_primer: string;
  id: string;
  jenis: string;
  keterangan: string;
  operator_acc: {
    id: string;
    nama: string;
  };
  operator_bops: {
    id: string;
    nama: string;
  };
  operator_pembangkit: {
    id: string;
    nama: string;
  };
  pembangkit: {
    id: string;
    nama: string;
  };
  status: string;
  tanggal: string;
  waktu_perintah: string;
  waktu_real: string;
}

export type Filter = {
  pembangkit_id: string
  status: string
  jenis?: 'naik-turun' | 'change-over' | 'start-stop' | ''
  tanggal: Dayjs | null
};

