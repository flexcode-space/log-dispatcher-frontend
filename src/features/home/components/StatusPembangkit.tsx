import { Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CardHeader } from "src/components/card";
import CustomChip from "src/@core/components/mui/chip";
import { CellType } from "src/types";

export const columns = [
  {
    flex: 0.35,
    field: "pembangkit",
    headerName: "Pembangkit",
  },
  {
    flex: 0.25,
    field: "status",
    maxWidth: 100,
    headerName: "status",
    renderCell: ({ row }: CellType) => (
      <CustomChip
        label={row.status}
        skin="light"
        size="small"
        color="primary"
      />
    ),
  },
  {
    flex: 0.25,
    field: "waktu",
    headerName: "Waktu Mulai",
  },
];

export const StatusPembangkit = ({ data = [] }: { data: [] }) => {
  return (
    <Card sx={{ height: "500px" }}>
      <CardHeader title="Status Pembangkitan" />
      <CardContent>
        <DataGrid autoHeight hideFooter rows={data} columns={columns} />
      </CardContent>
    </Card>
  );
};
