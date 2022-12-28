export interface defenseScheme {
  id: string;
  sub_sistem: relation;
  tahap: TahapOrAmp;
  amp: TahapOrAmp;
  detik: number;
  mw: number;
  gardu_induk: relation;
  jenis_peralatan: string;
  peralatan: relation;
  jenis_peralatan_target: string;
  peralatan_target: relation;
  keterangan: string;
  real_ia: number;
  real_mw: number;
  real_ols: number;
  target_ia: number;
  target_mw: number;
  target_ols: number;
  set_ia: number;
  set_mw: number;
  set_ols: number;
  status: boolean;
  tanggal: string;
}
export interface relation {
  id: string;
  nama: string;
}
export interface TahapOrAmp {
  id: string;
  value: number;
}
