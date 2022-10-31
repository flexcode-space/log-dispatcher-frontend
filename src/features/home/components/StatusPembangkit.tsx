import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
  },
  {
    flex: 0.25,
    field: "waktu",
    headerName: "Waktu Mulai",
  },
];

export const dataMock = [
  {
    id: 1,
    pembangkit: "Ungaran",
    status: "PO",
    waktu: "22 Januari 2022, 01.43 WIB",
  },
  {
    id: 2,
    pembangkit: "PLTU",
    status: "PO",
    waktu: "22 Januari 2022, 01.43 WIB",
  },
  {
    id: 3,
    pembangkit: "PLTGU",
    status: "PO",
    waktu: "22 Januari 2022, 01.43 WIB",
  },
  {
    id: 4,
    pembangkit: "IBT 1 -2",
    status: "PO",
    waktu: "22 Januari 2022, 01.43 WIB",
  },
  {
    id: 5,
    pembangkit: "Rencana",
    status: "PO",
    waktu: "22 Januari 2022, 01.43 WIB",
  },
  {
    id: 6,
    pembangkit: "Margin",
    status: "PO",
    waktu: "22 Januari 2022, 01.43 WIB",
  },
];

export const StatusPembangkit = () => {
  return (
    <Card sx={{ height: '500px'}}>
      <CardHeader
        title="Status Pembangkitan"
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{
          variant: "caption",
          sx: { color: "text.disabled" },
        }}
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          "& .MuiCardHeader-action": { mb: 0 },
          "& .MuiCardHeader-content": { mb: [2, 0] },
        }}
      />
      <CardContent>
        <DataGrid autoHeight hideFooter rows={dataMock} columns={columns} />
      </CardContent>
    </Card>
  );
};
