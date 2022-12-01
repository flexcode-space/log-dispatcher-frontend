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
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Pencil } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";
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

const LaporanPoskoApd = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={<Typography variant="h5">Posko APD</Typography>}
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                size="small"
                value={search}
                sx={{ mb: 2 }}
                placeholder="Cari"
                onChange={(e) => setSearch(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={null}
                  label="Pilih Tanggal"
                  onChange={() => null}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal()}
                variant="contained"
              >
                Generate Laporan
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Kondisi Sistem Kelistrikan"
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
                      <TableCellHead>Tanggal</TableCellHead>
                      <TableCellHead>Periode</TableCellHead>
                      <TableCellHead>Pasokan IBT & Transfer</TableCellHead>
                      <TableCellHead>Pasokan Kit</TableCellHead>
                      <TableCellHead>Beban Puncak</TableCellHead>
                      <TableCellHead>Cadangan kit</TableCellHead>
                      <TableCellHead>Status</TableCellHead>
                      <TableCellHead>Keterangan</TableCellHead>
                      <TableCellHead>Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>22 Agustus 2022</TableCell>
                      <TableCell>14.00 - 20.00</TableCell>
                      <TableCell>1538 MW</TableCell>
                      <TableCell>1900 MW</TableCell>
                      <TableCell>4144 MW</TableCell>
                      <TableCell>800 MW</TableCell>
                      <TableCell>Aman & Normal</TableCell>
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

export default LaporanPoskoApd;
