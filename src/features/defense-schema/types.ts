export interface DefenseSchemaList {
  id: string;
  sub_sistem: {
    id: string;
    nama: string;
  };
  tahap: {
    id: string;
    value: number;
  };
  amp: {
    id: string;
    value: number;
  };
  detik: number;
  mw: number;
  gardu_induk: {
    id: string;
    nama: string;
  };
  jenis_peralatan: string;
  peralatan: {
    id: string;
    nama: string;
  };
  jenis_peralatan_target: string;
  peralatan_target: {
    id: string;
    nama: string;
  };
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
