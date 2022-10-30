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
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import FilterIcon from "src/assets/icons/filter-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { AddLaporan } from "./add-laporan";

const KapasitorReaktor = () => {
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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Kapasitor Reaktor</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <AddLaporan />
        </Grid>
        <Grid item xs={12}>
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
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <FilterIcon />
                    Filter
                  </Button>
                  <Button sx={{ mb: 2 }} variant="contained">
                    <DownloadIcon />
                    Download laporan
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                    <TableRow>
                      <TableCell size="small" rowSpan={2}>
                        No
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Lokasi
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={2}>
                        Jam
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={2}>
                        Tegangan
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Keterangan
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Aksi
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Buka</TableCell>
                      <TableCell>Tutup</TableCell>
                      <TableCell>Sebelum</TableCell>
                      <TableCell>Sesudah</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>PLTU RBANG</TableCell>
                      <TableCell>07:02</TableCell>
                      <TableCell>07:22</TableCell>
                      <TableCell>Dika</TableCell>
                      <TableCell>Bagus</TableCell>
                      <TableCell>200 MW</TableCell>
                      <TableCell>
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

export default KapasitorReaktor;
