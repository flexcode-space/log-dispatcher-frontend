import { Typography } from "@mui/material";
import { CellType } from "src/types";
import { formatDecimalNumber } from "src/utils/number";

export const columns = (jam: string) => {
  return [
    {
      flex: 0.35,
      field: "nama",
      headerName: "Pasokan",
    },
    {
      flex: 0.25,
      field: "value",
      headerName: jam,
      renderCell: ({ row }: CellType) => {
        const { value } = row;
        return (
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ textTransform: "capitalize" }}
          >
            {formatDecimalNumber(value)}
          </Typography>
        );
      },
    },
  ];
};
