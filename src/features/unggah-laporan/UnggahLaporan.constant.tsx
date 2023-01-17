export const defaultColumns = [
  {
    flex: 0.35,
    minWidth: 100,
    field: "nama",
    headerName: "Nama Laporan",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "tipe",
    headerName: "Tipe Laporan",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tanggal",
    headerName: "Tanggal DIUNGGAH",
  },
];

export const tipeLaporanOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "amr",
    label: "AMR",
  },
  { value: "scada", label: "Scada" },
];

export const jenisAMROptions = [
  {
    value: "mw-mvar",
    label: "MW & MVAR",
  },
  {
    value: "kw-kvar",
    label: "KW & KVAR",
  },
];
