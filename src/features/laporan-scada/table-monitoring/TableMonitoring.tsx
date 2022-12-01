import { Button, Card, CardContent, IconButton } from "@mui/material";
import { Pencil } from "mdi-material-ui";
import { CardHeader } from "src/components/card";
import FilterGreenIcon from "src/assets/icons/filter-green-icon.svg";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";

type TableMonitoringProps = {
  title: string;
};

const TableMonitoring = ({ title }: TableMonitoringProps) => {
  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="outlined" size="small" sx={{ height: "40px" }}>
              <IconButton>
                <FilterGreenIcon />
              </IconButton>
              Filter
            </Button>
            <Button variant="contained" size="small" sx={{ height: "40px" }}>
              Tambah Data
            </Button>
          </div>
        }
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellHead>Tanggal</TableCellHead>
                <TableCellHead>Gardu Induk</TableCellHead>
                <TableCellHead>Bay</TableCellHead>
                <TableCellHead>Keterangan</TableCellHead>
                <TableCellHead>Tanggal Konfirmasi</TableCellHead>
                <TableCellHead>Aksi scada</TableCellHead>
                <TableCellHead>Aset</TableCellHead>
                <TableCellHead>Status</TableCellHead>
                <TableCellHead>Aksi</TableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>21 Agustus 2022</TableCell>
                <TableCell>SRGEN</TableCell>
                <TableCell>BUSBAR 1</TableCell>
                <TableCell>Tegangan berubah-berubah tidak stabil</TableCell>
                <TableCell>24 Agustus 2022</TableCell>
                <TableCell>Di cek dulu</TableCell>
                <TableCell>Di cek dulu</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <IconButton>
                    <Pencil />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TableMonitoring;
