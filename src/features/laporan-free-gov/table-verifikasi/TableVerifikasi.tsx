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
import { openModal } from "src/state/modal";
import { selectData } from "../state/laporanFreeGov";
import { Catatan, TableVerifikasiProps } from "../types";

const TableVerifikasi = ({ combo, catatan }: TableVerifikasiProps) => {
  const filterValueById = (id: string): Catatan =>
    catatan.filter((list: Catatan) => list.id === id)[0];

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
                  <TableCellHead minWidth="500px">Catatan</TableCellHead>
                  <TableCellHead>Aksi</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {combo.length &&
                  combo.map((value) => {
                    const catatan = filterValueById(value?.id);

                    return (
                      <TableRow hover>
                        <TableCell size="small">{value?.nama}</TableCell>
                        <TableCell size="small">{value?.jumlah_on}</TableCell>
                        <TableCell size="small">{value?.jumlah_off}</TableCell>
                        <TableCell size="small">{catatan?.catatan}</TableCell>
                        <TableCell size="small">
                          <IconButton
                            onClick={() => {
                              openModal("modal-laporan-freegov", value.id);
                              selectData(catatan);
                            }}
                          >
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
