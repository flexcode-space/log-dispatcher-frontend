import { Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CardHeader } from "src/components/card";

export const columns = [
  {
    flex: 0.35,
    field: "subsistem",
    headerName: "Subsistem",
  },
  {
    flex: 0.25,
    field: "gardu_induk",
    maxWidth: 200,
    headerName: "Gardu Induk",
  },
  {
    flex: 0.25,
    field: "peralatan",
    headerName: "Busbar",
  },
  {
    flex: 0.25,
    field: "tegangan",
    headerName: "Tertinggi",
  },
  {
    flex: 0.25,
    field: "tegangan_terendah",
    headerName: "Terendah",
  },
];

export const TeganganSubsistem = ({ data = [] }: { data: [] }) => {
  return (
    <Card sx={{}}>
      <CardHeader title="Tegangan Subsistem" />
      <CardContent>
        <DataGrid autoHeight hideFooter rows={data} columns={columns} />
      </CardContent>
    </Card>
  );
};
