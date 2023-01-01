import { Grid, Button, Card, CardContent, IconButton } from "@mui/material";
import { Pencil } from "mdi-material-ui";
import { CardHeader } from "src/components/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";

const TableVerifikasi = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Verifikasi FreeGov Harian" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead>Lokasi</TableCellHead>
                  <TableCellHead>Jumlah ON</TableCellHead>
                  <TableCellHead>Jumlah Off</TableCellHead>
                  <TableCellHead>Catatan</TableCellHead>
                  <TableCellHead>Aksi</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell size="small">PLTU Tambalorok U1</TableCell>
                  <TableCell size="small">10</TableCell>
                  <TableCell size="small">38</TableCell>
                  <TableCell size="small">
                    Tegangan berubah-berubah tidak stabil
                  </TableCell>
                  <TableCell size="small">
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
    </Grid>
  );
};

export default TableVerifikasi;
