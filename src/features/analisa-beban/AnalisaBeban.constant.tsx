import Typography from "@mui/material/Typography";
import { formatDecimalNumber } from "src/utils/number";

export interface CellType {
  row: any;
}

export const defaultColumns = [
  {
    flex: 0.25,
    field: "subsistem",
    minWidth: 200,
    headerName: "Subsistem",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "nama",
    headerName: "IBT",
  },
  {
    flex: 0.25,
    field: "jam",
    minWidth: 90,
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
