import { Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CardHeader } from "src/components/card";

export interface CellType {
  row: any;
}

export const columns = [
  {
    flex: 0.35,
    field: "subsistem",
    headerName: "Subsistem",
  },
  {
    flex: 0.25,
    field: "penghantar",
    maxWidth: 100,
    headerName: "Penghantar",
  },
  {
    flex: 0.25,
    field: "beban",
    headerName: "Beban",
  },
];

export const dataMock = [
  {
    id: 1,
    subsistem: "Ungaran",
    penghantar: "Penghantar 1",
    beban: "55%",
  },
  {
    id: 2,
    subsistem: "Ungaran",
    penghantar: "Penghantar 1",
    beban: "55%",
  },
  {
    id: 3,
    subsistem: "Ungaran",
    penghantar: "Penghantar 1",
    beban: "55%",
  },
  {
    id: 4,
    subsistem: "Ungaran",
    penghantar: "Penghantar 1",
    beban: "55%",
  },
];

export const MonitoringPenghantar = () => {
  return (
    <Card sx={{}}>
      <CardHeader title="Monitoring Penghantar" />
      <CardContent>
        <DataGrid autoHeight hideFooter rows={dataMock} columns={columns} />
      </CardContent>
    </Card>
  );
};
