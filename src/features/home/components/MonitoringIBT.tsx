import { Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CardHeader } from "src/components/card";
import { RenderCell } from "src/components/table";
import { CellType } from "src/types";
import { formatDecimalNumber } from "src/utils/number";

export const columns = [
  {
    flex: 0.35,
    field: "subsistem",
    maxWidth: 300,
    headerName: "Subsistem",
  },
  {
    flex: 0.25,
    field: "nama",
    maxWidth: 300,
    headerName: "IBT",
  },
  {
    flex: 0.25,
    field: "percentage",
    headerName: "Beban",
    renderCell: ({ row }: CellType) => {
      const { percentage } = row;
      return <RenderCell>{`${formatDecimalNumber(percentage)} %`}</RenderCell>;
    },
  },
];

export const MonitoringIBT = ({ data = [] }: { data: [] }) => {
  return (
    <Card sx={{}}>
      <CardHeader title="Monitoring IBT" />
      <CardContent>
        <DataGrid autoHeight hideFooter rows={data} columns={columns} />
      </CardContent>
    </Card>
  );
};
