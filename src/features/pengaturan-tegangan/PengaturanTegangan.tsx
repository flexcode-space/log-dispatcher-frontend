import { useState, ChangeEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TablePagination,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import KonfigurasiIcon from "src/assets/icons/konfigurasi-icon.svg";
import FilterIcon from "src/assets/icons/filter-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { AddLaporan } from "./add-laporan";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { ModalFilter } from "./modal";

const PengaturanTegangan = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <ModalFilter handleClose={handleClose} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">
                Switching Tegangan Hari Khusus
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={3}>
          <AddLaporan />
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal()}
                  >
                    <FilterIcon />
                    Filter
                  </Button>
                  <Button sx={{ mb: 2 }} variant="contained">
                    <DownloadIcon />
                    Download laporan
                  </Button>
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <KonfigurasiIcon />
                    Konfigurasi
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead size="small">Lokasi</TableCellHead>
                      <TableCellHead size="small">Jenis</TableCellHead>
                      <TableCellHead size="small">Jurusan</TableCellHead>
                      <TableCellHead size="small">Open/Close</TableCellHead>
                      <TableCellHead size="small">Waktu</TableCellHead>
                      <TableCellHead size="small">Sebelum</TableCellHead>
                      <TableCellHead size="small">Sesudah</TableCellHead>
                      <TableCellHead size="small">MVAR</TableCellHead>
                      <TableCellHead size="small">Keterangan</TableCellHead>
                      <TableCellHead size="small">Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell size="small">UNGARAN</TableCell>
                      <TableCell size="small">Switching Capasitor</TableCell>
                      <TableCell size="small">Reaktor 4R-2 </TableCell>
                      <TableCell size="small">Open</TableCell>
                      <TableCell size="small">
                        22 Januari 2022, 01.43 WIB
                      </TableCell>
                      <TableCell size="small">
                        22 Januari 2022, 01.43 WIB
                      </TableCell>
                      <TableCell size="small">
                        22 Januari 2022, 01.43 WIB
                      </TableCell>
                      <TableCell size="small">1200</TableCell>
                      <TableCell size="small">
                        PMT 66 KV dan Reaktor 4R-2 dinyatakan rusak.
                      </TableCell>
                      <TableCell size="small">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton onClick={() => null}>
                            <PencilOutline />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={12}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PengaturanTegangan;
