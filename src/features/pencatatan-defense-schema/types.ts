export interface Pencatatan {
  id: string;
  subsistem: string;
  tahap: number;
  lokasi: string;
  trip: string;
  status: boolean;
  keterangan: string;
  tanggal: string;
  set?: number
  gardu_induk?: string
  trafo?: string
  penyulang?: string
  island?: string
  frekuensi?: number
  upt?: string
}

