export interface BatubaraList {
  harian: number;
  id: string;
  pembangkit: {
    id: string;
    nama: string;
  };
  satuan: string;
  stock: number;
  tanggal: string;
  tipe: string;
  unit: number;
}