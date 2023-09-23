export const DATA = [
  {
    name: "00.30",
    tanggal_1: 20,
    tanggal_2: 60,
  },
  {
    name: "01.30",
    tanggal_1: 40,
    tanggal_2: 80,
  },
  {
    name: "02.00",
    tanggal_1: 30,
    tanggal_2: 70,
  },
  {
    name: "02.30",
    tanggal_1: 70,
    tanggal_2: 110,
  },
  {
    name: "03.00",
    tanggal_1: 40,
    tanggal_2: 80,
  },
  {
    name: "02.30",
    tanggal_1: 60,
    tanggal_2: 80,
  },
];

export const pengaturanSubsistem = [
  { path: "/master-data/busbar", type: "busbar", name: "Busbar" },
  {
    path: "/master-data/gardu-induk",
    type: "gardu_induk",
    name: "Gardu Induk",
  },
  { path: "/master-data/ibt", type: "ibt", name: "IBT" },
  { path: "/master-data/pembangkit", type: "pembangkit", name: "Pembangkit" },
  { path: "/master-data/penghantar", type: "penghantar", name: "Penghantar" },
  { path: "/master-data/reaktor", type: "reaktor", name: "Reaktor" },
  { path: "/master-data/sub-sistem", type: "subsistem", name: "Subsistem" },
  { path: "/master-data/trafo", type: "trafo", name: "Trafo" },
];
