import { Dayjs } from "dayjs";

export type EnergizeList = {
  id: string;
  ba_ptp: string;
  gardu_induk: {
    id: string;
    nama: string;
  };
  keterangan: string;
  manuver: string;
  peralatan: {
    id: string;
    nama: string;
  };
  permohonan: string;
  rlb: string;
  sop: string;
  tanggal: string;
}

export type CreateEnergizePeralatan = {
  ba_ptp: string
  gardu_induk_id: string
  jenis_peralatan: string
  keterangan: string
  manuver: string
  peralatan_id: string
  permohonan: string
  rlb: string
  sop: string
  tanggal: string
  close?: string
}

export type FilterProps = {
  gardu_induk_id: string;
  jenis_peralatan: string
  jurusan: string;
  tanggal_mulai: Dayjs | null;
  tanggal_akhir: Dayjs | null;
};
