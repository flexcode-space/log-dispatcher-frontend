import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Pencil } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
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
import FilterGreenIcon from "src/assets/icons/filter-green-icon.svg";

const Rekonfigurasi = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Rekonfigurasi</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Catatan Rekonfigurasi Antar Area & Antar Subsistem"
              action={
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ height: "40px" }}
                  >
                    <IconButton>
                      <FilterGreenIcon />
                    </IconButton>
                    Filter
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ height: "40px" }}
                  >
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
                      <TableCellHead>GI/Peralatan</TableCellHead>
                      <TableCellHead>Waktu</TableCellHead>
                      <TableCellHead>Subsistem Awal</TableCellHead>
                      <TableCellHead>Subsistem Akhir</TableCellHead>
                      <TableCellHead>Alasan Rekonfigurasi</TableCellHead>
                      <TableCellHead>Keterangan</TableCellHead>
                      <TableCellHead>Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>GI Ungaran</TableCell>
                      <TableCell>02 Januari 2022, 23.04</TableCell>
                      <TableCell>Ungaran</TableCell>
                      <TableCell>Tanjung Jati</TableCell>
                      <TableCell>Pekerjaan ROH</TableCell>
                      <TableCell>Beban puncak terjadi pukul 21.30</TableCell>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Rekonfigurasi;
