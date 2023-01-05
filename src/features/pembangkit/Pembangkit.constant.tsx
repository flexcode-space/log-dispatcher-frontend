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
    field: "jenis",
    headerName: "Jenis Pembangkit",
    renderCell: ({ row }: CellType) => {
      const { jenis } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {jenis.nama}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "nama",
    headerName: "Nama Pembangkit",
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
    flex: 0.35,
    minWidth: 100,
    field: "dmn",
    headerName: "DMN",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "tml",
    headerName: "TML",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "bahan_bakar",
    headerName: "Bahan Bakar",
    renderCell: ({ row }: CellType) => {
      const { bahan_bakar } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {bahan_bakar.nama}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "kategori",
    headerName: "kategori",
    renderCell: ({ row }: CellType) => {
      const { kategori } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {kategori.nama}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "kof_sym",
    headerName: "Koefisien",
    renderCell: ({ row }: CellType) => {
      const { kof_sym, kof_num } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {`${kof_sym} ( ${kof_num} ) `}
        </Typography>
      );
    },
  },
];
