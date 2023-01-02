import { Grid, Card, CardContent, IconButton } from "@mui/material";
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

type TableVerifikasiProps = {
  combo: {
    id: string;
    nama: string;
    jumlah_off: number;
    jumlah_on: number;
  }[];
};

const TableVerifikasi = ({ combo }: TableVerifikasiProps) => {
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
                {combo.map((value) => {
                  return (
                    <TableRow hover>
                      <TableCell size="small">{value?.nama}</TableCell>
                      <TableCell size="small">{value?.jumlah_on}</TableCell>
                      <TableCell size="small">{value?.jumlah_off}</TableCell>
                      <TableCell size="small"></TableCell>
                      <TableCell size="small">
                        <IconButton>
                          <Pencil />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TableVerifikasi;
