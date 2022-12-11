import { useState, ChangeEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import { PencilOutline } from "mdi-material-ui";
import { openModal } from "src/state/modal";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";
import ModalAddUFR from "../modal/ModalAddUFR";

import { WrapperFilter } from "src/components/filter";

const UfrComponent = () => {
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

  return (
    <>
      <ModalAddUFR />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <TextField
                    size="small"
                    value=""
                    sx={{ mr: 6, mb: 2 }}
                    placeholder="Cari"
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button sx={{ mb: 2 }} size="small" variant="outlined">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Download Laporan
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    size="small"
                    variant="contained"
                    onClick={() => openModal()}
                  >
                    <IconButton>
                      <Plus />
                    </IconButton>
                    Tambah Laporan
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                    <TableRow>
                      <TableCell align="center" size="small" colSpan={2}>
                        UFR
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        UPT
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Subsistem
                      </TableCell>
                      <TableCell align="center" size="small" colSpan={3}>
                        Lokasi
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Beban Siang
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Beban Malam
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Keteragan
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={5}>
                        UFR Kerja
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={5}>
                        Penyulang Pengganti
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Aksi
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Status
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tahap</TableCell>
                      <TableCell>Sett</TableCell>
                      <TableCell>GI</TableCell>
                      <TableCell>Trafo</TableCell>
                      <TableCell>Penyulang</TableCell>
                      <TableCell>Trip</TableCell>
                      <TableCell>Masuk</TableCell>
                      <TableCell>KW</TableCell>
                      <TableCell>Lama</TableCell>
                      <TableCell>KWH</TableCell>
                      <TableCell>Dibuka</TableCell>
                      <TableCell>Ditutup</TableCell>
                      <TableCell>KW</TableCell>
                      <TableCell>Lama</TableCell>
                      <TableCell>KWH</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[0, 1, 3, 4, 5].map((index) => (
                      <TableRow>
                        <TableCell size="small">1</TableCell>
                        <TableCell size="small">49</TableCell>
                        <TableCell size="small">Semarang</TableCell>
                        <TableCell size="small">Ungaran</TableCell>
                        <TableCell size="small">WLERI</TableCell>
                        <TableCell size="small">2</TableCell>
                        <TableCell size="small">WLI.03</TableCell>
                        <TableCell size="small">6,1</TableCell>
                        <TableCell size="small">150 KV</TableCell>
                        <TableCell size="small">Weleri 1</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">07:02</TableCell>
                        <TableCell size="small">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton onClick={() => null}>
                              <PencilOutline />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell size="small">
                          <Chip label="ON" color="success" />
                        </TableCell>
                      </TableRow>
                    ))}
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

export default UfrComponent;
