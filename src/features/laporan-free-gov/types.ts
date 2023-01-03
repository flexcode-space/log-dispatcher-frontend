export type Catatan = {
  id: string;
  catatan: string;
};

export type Combo = {
  id: string;
  nama: string;
  jumlah_off: number;
  jumlah_on: number;
}

export type TableVerifikasiProps = {
  combo: Combo[];
  catatan: Catatan[];
};