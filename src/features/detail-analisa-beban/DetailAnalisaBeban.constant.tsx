import Typography from "@mui/material/Typography";
import { CellType } from "src/types";
import { formatDecimalNumber } from "src/utils/number";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "peralatan",
    minWidth: 200,
    headerName: "Peralatan",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "gardu_induk",
    headerName: "Gardu Induk",
  },
  {
    flex: 0.25,
    field: "nama",
    headerName: "Penghantar",
  },
  {
    flex: 0.25,
    field: "jam",
    headerName: "Jam",
  },
  {
    flex: 0.25,
    field: "arus",
    minWidth: 90,
    headerName: "Arus",
    renderCell: ({ row }: CellType) => {
      const { arus } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {formatDecimalNumber(arus)}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: "mw",
    headerName: "MW",
    renderCell: ({ row }: CellType) => {
      const { mw } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {formatDecimalNumber(mw)}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: "mvar",
    headerName: "MVAR",
    renderCell: ({ row }: CellType) => {
      const { mvar } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {formatDecimalNumber(mvar)}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: "percentage",
    headerName: "%",
    renderCell: ({ row }: CellType) => {
      const { percentage } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {formatDecimalNumber(percentage)}
        </Typography>
      );
    },
  },
];
