import { Dayjs } from "dayjs";

export interface GangguanList {
  akibat: string;
  announciator: string[];
  arus: string;
  beban: string;
  buka: string;
  cuaca: string;
  dfr: string;
  fl: string;
  gangguan_jenis: {
    id: string;
    nama: string;
  };
  gardu_induk: {
    id: string;
    nama: string;
  };
  gensum: string;
  id: string;
  jenis_peralatan: string;
  la: string;
  lain: string;
  lap: string;
  penyebab: string;
  peralatan: {
    id: string;
    nama: string;
  };
  pmt: string;
  pqm: string;
  reclose: string;
  rele: string[];
  siap_op: string;
  sld: string;
  sms_kinerja: string;
  tanggal: string;
  trip: string;
  tutup: string;
  vaisala: string;
}

export interface GangguanList {
  akibat: string;
  announciator: string[];
  arus: string;
  beban: string;
  buka: string;
  cuaca: string;
  dfr: string;
  fl: string;
  gangguan_jenis: {
    id: string;
    nama: string;
  };
  gardu_induk: {
    id: string;
    nama: string;
  };
  gensum: string;
  id: string;
  jenis_peralatan: string;
  la: string;
  lain: string;
  lap: string;
  penyebab: string;
  peralatan: {
    id: string;
    nama: string;
  };
  pmt: string;
  pqm: string;
  reclose: string;
  rele: string[];
  siap_op: string;
  sld: string;
  sms_kinerja: string;
  tanggal: string;
  trip: string;
  tutup: string;
  vaisala: string;
}

export type Filter = {
  gardu_induk_id: string,
  gangguan_jenis_id: string,
  jenis_peralatan: string,
  peralatan_id: string,
  announciator: string,
  rele: string
  tanggal: Dayjs | null,
};

