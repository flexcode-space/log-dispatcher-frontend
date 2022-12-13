export interface SwitchingLuarRencanaList {
  gardu_induk: {
    id: string;
    nama: string;
  };
  id: string;
  jam_buka: string;
  jam_tutup: string;
  keterangan: string;
  penghantar: {
    id: string;
    nama: string;
  };
  tanggal: string;
}

export interface PayloadSwitchingLuarRencana {
  gardu_induk_id: string;
  jam_buka: Array<{ value: Date }>;
  jam_tutup: Array<{ value: Date }>;
  keterangan: string;
  penghantar: Array<{ id: string }>;
  tanggal: Date;
}

