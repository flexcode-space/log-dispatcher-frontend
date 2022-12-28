export interface TargetIslandList {
  frekuensi: number;
  gardu_induk: GarduInduk;
  id: string;
  island: string;
  status: boolean;
  tahap: Tahap;
  tanggal: string;
  target_trip: string;
  upt: string;
}
export interface GarduInduk {
  id: string;
  nama: string;
}
export interface Tahap {
  id: string;
  value: number;
}
