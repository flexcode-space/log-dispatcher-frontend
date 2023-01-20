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
import { openModal } from "src/state/modal";
import { selectData } from "../state/laporanPekerjaan";

type TableLaporanProps = {
  title: string;
  type: string;
  filter?: {
    date?: string;
  };
};

type TableLainProps = {
  filter?: {
    date?: string;
  };
};

export const TableLaporan = ({ title, type, filter }: TableLaporanProps) => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getLaporanPekerjaanList, laporanPekerjaanList } =
    laporanPekerjaanApi();

  useEffect(() => {
    getLaporanPekerjaanList({ tipe: type, ...filter });
  }, [filter]);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-pekerjaan") {
      getLaporanPekerjaanList({ tipe: type, ...filter });
    }
  }, [reloadPageSnap.id, filter]);

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
                      <TableCell size="small">
                        {list.gardu_induk.nama}
                      </TableCell>
                      <TableCell size="small">{list.bay}</TableCell>
                      <TableCell size="small">{list.unit_pelaksana}</TableCell>
                      <TableCell size="small">{list.waktu_mulai}</TableCell>
                      <TableCell size="small">{list.waktu_akhir}</TableCell>
                      <TableCell size="small">{list.progress}</TableCell>
                      <TableCell size="small">
                        {list.uraian_pekerjaan}
                      </TableCell>
                      <TableCell size="small">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            onClick={() => {
                              openModal("modal-laporan-pekerjaan", list.id);
                              selectData(list);
                            }}
                          >
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

export const TableLain = ({ filter }: TableLainProps) => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getLaporanPekerjaanList, laporanPekerjaanList } =
    laporanPekerjaanApi();

  useEffect(() => {
    getLaporanPekerjaanList({ tipe: "lain", ...filter });
  }, [filter]);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-pekerjaan") {
      getLaporanPekerjaanList({ tipe: "lain", ...filter });
    }
  }, [reloadPageSnap.id, filter]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Lain - Lain" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead minWidth="300px">Tagar</TableCellHead>
                  <TableCellHead minWidth="600px">Keterangan</TableCellHead>
                  <TableCellHead>Aksi</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {laporanPekerjaanList.length > 0 &&
                  laporanPekerjaanList.map((list: LaporanPekerjaanList) => (
                    <TableRow hover key={list.id}>
                      <TableCell>{list.tagar}</TableCell>
                      <TableCell>{list.keterangan}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            onClick={() => {
                              openModal("modal-laporan-pekerjaan", list.id);
                              selectData(list);
                            }}
                          >
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
