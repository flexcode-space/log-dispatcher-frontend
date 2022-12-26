export type UploadDocumentType = {
  dfr: string
  pqm: string
  vaisala: string
  sld: string
  gensum: string
  lap: string
}

export interface PayloadGangguan {
  akibat: string;
  announciator: string[];
  arus: string;
  beban: string;
  buka: string;
  cuaca: string;
  dfr: string;
  fl: string;
  gangguan_jenis_id: string;
  gardu_induk_id: string;
  gensum: string;
  jenis_peralatan: string;
  la: string;
  lain: string;
  lap: string;
  penyebab: string;
  peralatan_id: string;
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
