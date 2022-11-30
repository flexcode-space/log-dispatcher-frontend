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

const LaporanNeracaDaya = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={
                  <Typography variant="h5">Laporan Neraca Daya</Typography>
                }
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
              title="Rencana Beban Subsistem"
              action={
                <Button variant="outlined" size="small" sx={{ height: "40px" }}>
                  Tambah Data
                </Button>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead>Subsistem</TableCellHead>
                      <TableCellHead>DM Pasok</TableCellHead>
                      <TableCellHead>IBT</TableCellHead>
                      <TableCellHead>Beban IBT</TableCellHead>
                      <TableCellHead>Pembangkit</TableCellHead>
                      <TableCellHead>Beban KIT</TableCellHead>
                      <TableCellHead>Keterangan</TableCellHead>
                      <TableCellHead>Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>Ungaran</TableCell>
                      <TableCell>1900 MW</TableCell>
                      <TableCell>IBT 1</TableCell>
                      <TableCell>800 MW</TableCell>
                      <TableCell>PLTGU TBROK</TableCell>
                      <TableCell>200MW</TableCell>
                      <TableCell>2 GT 1 ST</TableCell>
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

export default LaporanNeracaDaya;
