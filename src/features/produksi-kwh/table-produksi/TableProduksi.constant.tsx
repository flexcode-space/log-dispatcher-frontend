import { formatDecimalNumber } from "src/utils/number";
import { CellType } from "src/types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "nama",
    minWidth: 200,
    headerName: "Pembangkit",
    renderCell: ({ row }: CellType) => (
      <p className={row.nama === "Total" ? "total" : ""}>{row.nama}</p>
    ),
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "mw",
    headerName: "Total MW",
    renderCell: ({ row }: CellType) => (
      <p className={row.nama === "Total" ? "total" : ""}>
        {`${formatDecimalNumber(row.mw)} MW`}
      </p>
    ),
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "kwh",
    headerName: "Produksi",
    renderCell: ({ row }: CellType) => (
      <p className={row.nama === "Total" ? "total" : ""}>
        {`${formatDecimalNumber(row.kwh)} kWh`}
      </p>
    ),
  },
];
