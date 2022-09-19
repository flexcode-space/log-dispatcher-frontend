import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "scada",
    headerName: "ID Scada",
  },
  {
    flex: 0.35,
    field: "id_amr",
    headerName: "ID AMR",
  },
  {
    flex: 0.25,
    field: "pembangkit",
    headerName: "Nama Penghantar",
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: "penghantar",
    headerName: "Gardu Induk",
  },
  {
    flex: 0.25,
    field: "sub_sistem.nama",
    headerName: "Subsistem",
  },
  {
    flex: 0.25,
    field: "busbar",
    headerName: "Tegangan",
  },
  {
    flex: 0.25,
    field: "arus_nominal",
    headerName: "Arus Nominal (A)",
  },
  {
    flex: 0.25,
    field: "arus_mampu",
    headerName: "Arus Mampu (A)",
  },
  {
    flex: 0.25,
    field: "reaktor",
    headerName: "Jenis Penghantar",
  },
];

export const DATA = [
  // {
  //   busbar: 2,
  //   ibt: 2,
  //   id: "c836c745-e1db-4777-9699-e40fffaa302d",
  //   nama: "Tanjung Jati",
  //   pembangkit: 2,
  //   penghantar: 2,
  //   reaktor: 2,
  //   trafo: 2,
  // },
  {
    arus_mampu: 180,
    arus_nominal: 180,
    gardu_induk: {
      id: "c836c745-e1db-4777-9699-e40fffaa302d",
      nama: "Tambak Lorok",
    },
    gardu_induk_tujuan: {
      id: "c836c745-e1db-4777-9699-e40fffaa302d",
      nama: "Tambak Lorok",
    },
    id: "c836c745-e1db-4777-9699-e40fffaa302d",
    id_amr: "110011",
    jenis: "Radial",
    line: "Penghantar 2",
    nama: "TRAFO - 1",
    scada: "3KWHR3, 300, JELOK-1",
    // scada: {
    //   b1: "3KWHR3",
    //   b2: "300",
    //   b3: "JELOK-1",
    // },
    sub_sistem: {
      id: "c836c745-e1db-4777-9699-e40fffaa302d",
      nama: "Ungaran",
    },
    tegangan: {
      id: "c836c745-e1db-4777-9699-e40fffaa302d",
      value: 150,
    },
  },
];
