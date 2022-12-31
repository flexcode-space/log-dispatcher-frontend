export interface ProduksiKWHList {
  detail: DetailEntityOrTransfer[];
  summary: Summary;
  transfer: DetailEntityOrTransfer;
}

export interface Summary {
  jenis_pembangkit: Detail[];
  pembangkit: Detail;
  thermis: Detail;
  total: Detail;
  transfer: Detail & {
    detail: Detail[]
  };
}

export interface DetailEntityOrTransfer {
  detail: Detail[];
  kwh: number;
  mw: number;
  nama: string;
}
export interface Detail {
  kwh: number;
  mw: number;
  nama: string;
}
