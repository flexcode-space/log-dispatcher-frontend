export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "gardu_induk",
    headerName: "Gardu Induk / TET",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "bay",
    headerName: "Bay",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "unit_pelaksana",
    headerName: "Unit Pelaksana",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "waktu_mulai",
    headerName: "Waktu Mulai",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "waktu_akhir",
    headerName: "Waktu Akhir",
  },
  {
    flex: 0.25,
    field: "progres",
    headerName: "Progres",
  },
  {
    flex: 0.25,
    field: "uraian_pekerjaan",
    headerName: "Uraian Pekerjaan",
  },
];

export const listTable = [
  {
    title: "Pekerjaan Terencana",
    type: "pekerjaan",
  },
];

export const typeDocumentOptions = listTable.map(({ title, type }) => ({
  value: type,
  label: title,
}));

export const datamock = [
  {
    id: "1",
    gardu_induk: "UNGAR",
    bay: "SUTET BAWEN 2",
    unit_pelaksana: "PDKB",
    waktu_mulai: "22 Januari 2022, 01.43 WIB",
    waktu_akhir: "23 Januari 2022, 01.43 WIB",
    progres: "90%",
    uraian_pekerjaan:
      "Pembersihan Isolator T.281, 296, 329, 339-342, 364, 369, 372, 380, 382, 396, 399, 404, 423, 444, 454 ",
  },
];
