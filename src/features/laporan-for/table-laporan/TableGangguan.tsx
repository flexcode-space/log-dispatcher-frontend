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

export const TableGangguan = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title="Gangguan"
          action={
            <Button variant="outlined" size="small" sx={{ height: "40px" }}>
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
                  <TableCellHead>Gardu Induk</TableCellHead>
                  <TableCellHead>Peralatan Instalasi</TableCellHead>
                  <TableCellHead>Status</TableCellHead>
                  <TableCellHead>Jam Gangguan</TableCellHead>
                  <TableCellHead>Jam Normal</TableCellHead>
                  <TableCellHead>Keterangan</TableCellHead>
                  <TableCellHead>Beban Padam</TableCellHead>
                  <TableCellHead>SRT</TableCellHead>
                  <TableCellHead>Defense Schema</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>PATI</TableCell>
                  <TableCell>SUTT Kulo 2</TableCell>
                  <TableCell>TRIP</TableCell>
                  <TableCell>01.43 WIB</TableCell>
                  <TableCell>01.43 WIB</TableCell>
                  <TableCell>
                    Kendala indikasi di hot well pump abnormal
                  </TableCell>
                  <TableCell>200 MW</TableCell>
                  <TableCell>20 Menit</TableCell>
                  <TableCell>
                    IBT UNGAR 1-2 Tahap 1 GI WLERI : Trafo 2{" "}
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
