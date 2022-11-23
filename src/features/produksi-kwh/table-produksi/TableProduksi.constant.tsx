import Typography from "@mui/material/Typography";
import { formatDecimalNumber } from "src/utils/number";

export interface CellType {
  row: any;
}

export const defaultColumns = [
  {
    flex: 0.25,
    field: "pembangkit",
    minWidth: 200,
    headerName: "Pembangkit",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "mw",
    headerName: "Total MW",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "produksi",
    headerName: "Produksi",
  },
];

export const dataMock = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      pembangkit: "Tambaklorok G1.1",
      mw: "30.000 MW",
      produksi: "30.000 kWh",
    });
  }

  return data;
};
