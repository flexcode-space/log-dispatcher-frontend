export interface SwitchingPembangkitList {
  dispatch: string;
  energi_primer: string;
  id: string;
  jenis: string;
  keterangan: string;
  operator_acc: string;
  operator_bops: string;
  operator_pembangkit: string;
  pembangkit: {
    id: string;
    nama: string;
  };
  status: string;
  tanggal: string;
  waktu_perintah: string;
  waktu_real: string;
}
