import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Box,
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
import DownloadGreenIcon from "src/assets/icons/download-green-icon.svg";

import { MenuMore } from "./components";

const Gangguan = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={
                  <Typography variant="h5">
                    Laporan Gangguan dan Tindakan
                  </Typography>
                }
              />
            </Grid>
            <Button sx={{ mb: 2 }} onClick={() => null} variant="outlined">
              <IconButton>
                <DownloadGreenIcon />
              </IconButton>
              Export Laporan Gangguan
            </Button>
          </WrapperFilter>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <WrapperFilter></WrapperFilter>
            <CardHeader
              title={
                <TextField
                  size="small"
                  value={search}
                  sx={{ mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
              action={
                <div style={{ display: "flex", gap: "10px" }}>
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
                    Tambah Pencatatan Gangguan
                  </Button>
                </div>
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
                      <TableCellHead rowSpan={2}>Peralatan</TableCellHead>
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
                      <TableCellHead rowSpan={2}>Aksi</TableCellHead>
                    </TableRow>
                    <TableRow>
                      <TableCellHead>Trip</TableCellHead>
                      <TableCellHead>Reclose</TableCellHead>
                      <TableCellHead>Buka</TableCellHead>
                      <TableCellHead>Tutup</TableCellHead>
                      <TableCellHead minWidth="120px">
                        Sms Kinerja
                      </TableCellHead>
                      <TableCellHead minWidth="120px">
                        Siap op. pmt
                      </TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>1</TableCell>
                      <TableCell>22 November 2022</TableCell>
                      <TableCell>GITET KSGHN</TableCell>
                      <TableCell>PMT 7AB4</TableCell>
                      <TableCell>Hujan Petir</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>13:42</TableCell>
                      <TableCell>13:42</TableCell>
                      <TableCell>13:42</TableCell>
                      <TableCell>13:42</TableCell>
                      <TableCell>13:42</TableCell>
                      <TableCell>Distance Z1 Fasa T </TableCell>
                      <TableCell>Distance Z1 Operated</TableCell>
                      <TableCell>
                        Diperkirakan sambaran petir di 73,8 km dari GITET
                        KESUGIHAN sekitar tower 178-179
                      </TableCell>
                      <TableCell>
                        <Box display="flex">
                          <IconButton>
                            <Pencil />
                          </IconButton>
                          <MenuMore />
                        </Box>
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

export default Gangguan;
