import { Card, CardContent, Grid, Box, IconButton } from "@mui/material";
import { CardHeader } from "src/components/card";
import { Pencil } from "mdi-material-ui";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";

type TableLaporanProps = {
  title: string;
};

export const TableLaporan = ({ title }: TableLaporanProps) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead minWidth="180px">
                    Gardu Induk / TET
                  </TableCellHead>
                  <TableCellHead>Bay</TableCellHead>
                  <TableCellHead minWidth="180px">Unit Pelaksana</TableCellHead>
                  <TableCellHead>Waktu mulai</TableCellHead>
                  <TableCellHead>Waktu Akhir</TableCellHead>
                  <TableCellHead>Progress</TableCellHead>
                  <TableCellHead minWidth="200px">
                    Uraian Pekerjaan
                  </TableCellHead>
                  <TableCellHead>Aksi</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {[0, 1].map(() => (
                  <TableRow hover>
                    <TableCell>UNGARAN</TableCell>
                    <TableCell>SUTET BAWEN 2</TableCell>
                    <TableCell>PDKB</TableCell>
                    <TableCell>22 Januari 2022, 01.43 WIB</TableCell>
                    <TableCell>23 Januari 2022, 01.43 WIB</TableCell>
                    <TableCell>90%</TableCell>
                    <TableCell>
                      Pembersihan Isolator T.281, 296, 329, 339-342, 364, 369,
                      372, 380, 382, 396, 399, 404, 423, 444, 454
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => null}>
                          <Pencil />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const TableLain = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Lain - Lain" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead>Tagar</TableCellHead>
                  <TableCellHead>Keterangan</TableCellHead>
                  <TableCellHead>Aksi</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {[0, 1].map(() => (
                  <TableRow hover>
                    <TableCell>Pelepasan Penghantar</TableCell>
                    <TableCell>
                      Pembersihan Isolator T.281, 296, 329, 339-342, 364, 369,
                      372, 380, 382, 396, 399, 404, 423, 444, 454{" "}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => null}>
                          <Pencil />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
