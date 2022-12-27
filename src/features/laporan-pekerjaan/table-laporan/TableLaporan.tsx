import { useEffect } from "react";
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
import { laporanPekerjaanApi } from "src/api/laporan-pekerjaan";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { LaporanPekerjaanList } from "../types";

type TableLaporanProps = {
  title: string;
  type: string;
};

export const TableLaporan = ({ title, type }: TableLaporanProps) => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getLaporanPekerjaanList, laporanPekerjaanList } =
    laporanPekerjaanApi();

  useEffect(() => {
    getLaporanPekerjaanList({ tipe: type });
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-pekerjaan") {
      getLaporanPekerjaanList({ tipe: type });
    }
  }, [reloadPageSnap.id]);

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
                {laporanPekerjaanList.length > 0 &&
                  laporanPekerjaanList.map((list: LaporanPekerjaanList) => (
                    <TableRow hover key={list.id}>
                      <TableCell>{list.gardu_induk.nama}</TableCell>
                      <TableCell>{list.bay}</TableCell>
                      <TableCell>{list.unit_pelaksana}</TableCell>
                      <TableCell>{list.waktu_mulai}</TableCell>
                      <TableCell>{list.waktu_akhir}</TableCell>
                      <TableCell>{list.progress}</TableCell>
                      <TableCell>{list.uraian_pekerjaan}</TableCell>
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
