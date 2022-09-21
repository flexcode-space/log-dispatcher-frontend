import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "scada",
    minWidth: 200,
    headerName: "ID Scada",
    renderCell: ({ row }: CellType) => {
      const { scada } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {`${scada?.b1}, ${scada?.b2}, ${scada?.b3}`}
        </Typography>
      );
    },
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "id_amr",
    headerName: "ID AMR",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "nama",
    headerName: "Nama Peralatan",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "jenis",
    headerName: "Jenis",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "gardu_induk",
    headerName: "Gardu Induk",
    renderCell: ({ row }: CellType) => {
      const { gardu_induk } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {gardu_induk.nama}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tegangan",
    headerName: "Tegangan",
    renderCell: ({ row }: CellType) => {
      const { tegangan } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {`${tegangan.value} A`}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "setting_ovr",
    headerName: "Setting OVR",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "arus_mampu",
    headerName: "Arus Mampu (A)",
    renderCell: ({ row }: CellType) => {
      const { arus_mampu } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {`${arus_mampu} A`}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "mvar",
    headerName: "MVAR",
  },
];

export const DATA = [
  {
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
    jenis: "Kapasitor",
    line: "Penghantar 2",
    nama: "Busbar - 1",
    scada: {
      b1: "3KWHR3",
      b2: "300",
      b3: "JELOK-1",
    },
    dmn: "180 MW",
    tml: "180 MW",
    bahan_bakar: "Batubara",
    jenis_pembangkit: "PLTU",
    kategori: "MRICA",
    tegangan: {
      id: "c836c745-e1db-4777-9699-e40fffaa302d",
      value: 150,
    },
    mvar: "50 MVAR",
    setting_ovr: '157,5 KV'
  },
];
