import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
    field: "ibt",
    maxWidth: 100,
    headerName: "IBT",
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
    ibt: "IBT-1",
    beban: "55%",
  },
  {
    id: 2,
    subsistem: "Ungaran",
    ibt: "IBT-1",
    beban: "55%",
  },
  {
    id: 3,
    subsistem: "Ungaran",
    ibt: "IBT-1",
    beban: "55%",
  },
  {
    id: 4,
    subsistem: "Ungaran",
    ibt: "IBT-1",
    beban: "55%",
  },
];

export const MonitoringIBT = () => {
  return (
    <Card sx={{ }}>
      <CardHeader
        title="Monitoring IBT"
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
