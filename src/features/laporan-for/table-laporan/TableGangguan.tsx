import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, Grid, Button, IconButton } from "@mui/material";
import { CardHeader } from "src/components/card";
import { ArrowRight } from "mdi-material-ui";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import { gangguanApi } from "src/api/gangguan";
import { GangguanList } from "src/features/gangguan/types";

export const TableGangguan = () => {
  const router = useRouter();
  const { getGangguanList, gangguanList } = gangguanApi();

  useEffect(() => {
    getGangguanList();
  }, []);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title="Gangguan"
          action={
            <Button
              variant="outlined"
              size="small"
              sx={{ height: "40px" }}
              onClick={() => router.push("/gangguan")}
            >
              Edit Data
              <IconButton>
                <ArrowRight color="primary" />
              </IconButton>
            </Button>
          }
        />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead rowSpan={2}>No</TableCellHead>
                  <TableCellHead minWidth="150px" rowSpan={2}>
                    Tanggal
                  </TableCellHead>
                  <TableCellHead rowSpan={2}>Lokasi</TableCellHead>
                  <TableCellHead minWidth="200px" rowSpan={2}>
                    Peralatan
                  </TableCellHead>
                  <TableCellHead minWidth="150px" rowSpan={2}>
                    Jenis Gangguan
                  </TableCellHead>
                  <TableCellHead colSpan={6} align="center">
                    Jam
                  </TableCellHead>
                  <TableCellHead minWidth="150px" rowSpan={2}>
                    Rele
                  </TableCellHead>
                  <TableCellHead minWidth="150px" rowSpan={2}>
                    Announciator
                  </TableCellHead>
                  <TableCellHead minWidth="250px" rowSpan={2}>
                    Penyebab dan Akibat
                  </TableCellHead>
                </TableRow>
                <TableRow>
                  <TableCellHead>Trip</TableCellHead>
                  <TableCellHead>Reclose</TableCellHead>
                  <TableCellHead>Buka</TableCellHead>
                  <TableCellHead>Tutup</TableCellHead>
                  <TableCellHead minWidth="120px">Sms Kinerja</TableCellHead>
                  <TableCellHead minWidth="120px">Siap op. pmt</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {gangguanList.length > 0 &&
                  gangguanList.map((list: GangguanList, index: number) => (
                    <TableRow key={list.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{list.tanggal}</TableCell>
                      <TableCell>{list.gardu_induk.nama}</TableCell>
                      <TableCell>{list.peralatan.nama}</TableCell>
                      <TableCell>{list.gangguan_jenis.nama}</TableCell>
                      <TableCell>{list.trip}</TableCell>
                      <TableCell>{list.reclose}</TableCell>
                      <TableCell>{list.buka}</TableCell>
                      <TableCell>{list.tutup}</TableCell>
                      <TableCell>{list.sms_kinerja}</TableCell>
                      <TableCell>{list.siap_op}</TableCell>
                      <TableCell>{list.rele}</TableCell>
                      <TableCell>{list.announciator}</TableCell>
                      <TableCell>{list.penyebab}</TableCell>
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
