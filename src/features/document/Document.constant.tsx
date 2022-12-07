import { ListTable, TypeDocument } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "nama",
    headerName: "Nama Dokumen",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "tanggal",
    headerName: "Tanggal Diunggah",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "keterangan",
    headerName: "Keterangan",
  },
];

export const listTable: ListTable[] = [
  {
    title: "Grid Code",
    type: "code",
  },
  {
    title: "SOP Pemulihan",
    type: "pemulihan",
  },
  {
    title: "SOP GI",
    type: "gi",
  },
  {
    title: "IK Dispatcher",
    type: "dispatcher",
  },
  {
    title: "Defense Scheme",
    type: "scheme",
  },
  {
    title: "DKIKP",
    type: "dkikp",
  },
  {
    title: "Lain-Lain",
    type: "lain",
  },
];

export const typeDocumentOptions = listTable.map(({ title, type }) => ({
  value: type,
  label: title,
}));

export const datamock = [
  {
    id: "c836c745-e1db-4777-9699-e40fffaa302d",
    keterangan: "string",
    nama: "FD3",
    tanggal: "yyyy-mm-dd hh:mm",
    tipe: "pemulihan",
    url: "aws.s3.com",
  },
  {
    id: "22323-e1db-4777-9699-e40fffaa302d",
    keterangan: "string",
    nama: "FD3",
    tanggal: "yyyy-mm-dd hh:mm",
    tipe: "pemulihan",
    url: "aws.s3.com",
  },
];
