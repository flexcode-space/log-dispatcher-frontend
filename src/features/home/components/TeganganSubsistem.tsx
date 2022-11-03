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
    field: "gardu_induk",
    maxWidth: 100,
    headerName: "Gardu Induk",
  },
  {
    flex: 0.25,
    field: "busbar",
    headerName: "Busbar",
  },
  {
    flex: 0.25,
    field: "tertinggi",
    headerName: "Tertinggi",
  },
  {
    flex: 0.25,
    field: "terendah",
    headerName: "Terendah",
  },
];

export const dataMock = [
  {
    id: 1,
    subsistem: "SS Ungaran",
    gardu_induk: "GI CLCAP ",
    busbar: "Busbar 1",
    tertinggi: "155KV",
    terendah: "140KV",
  },
  {
    id: 2,
    subsistem: "SS Ungaran",
    gardu_induk: "GI CLCAP ",
    busbar: "Busbar 1",
    tertinggi: "155KV",
    terendah: "140KV",
  },
  {
    id: 3,
    subsistem: "SS Ungaran",
    gardu_induk: "GI CLCAP ",
    busbar: "Busbar 1",
    tertinggi: "155KV",
    terendah: "140KV",
  },
  {
    id: 4,
    subsistem: "SS Ungaran",
    gardu_induk: "GI CLCAP ",
    busbar: "Busbar 1",
    tertinggi: "155KV",
    terendah: "140KV",
  },
  {
    id: 5,
    subsistem: "SS Ungaran",
    gardu_induk: "GI CLCAP ",
    busbar: "Busbar 1",
    tertinggi: "155KV",
    terendah: "140KV",
  },
];

export const TeganganSubsistem = () => {
  return (
    <Card sx={{}}>
      <CardHeader
        title="Tegangan Subsistem"
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
