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
import DatePicker from "@mui/lab/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { openModal } from "src/state/modal";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import ModalAdd from "../modal/ModalAdd";

import { WrapperFilter } from "src/components/filter";

const OgsComponent = () => {
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
      <ModalAdd name="OGS" />
      <Grid container spacing={6}>
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={null}
                      label="Tanggal"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "160px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={null}
                      ampm={false}
                      label="Realisasi Jam"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "160px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button size="small" sx={{ mb: 2 }} variant="outlined">
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
                    Tambah OGS
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                    <TableRow>
                      <TableCell size="small" rowSpan={2}>
                        Lokasi OLS
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Tahap
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={3}>
                        Setting
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Target Trip
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Aktif
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Aktivitas perubahan data
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Keteragan
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={2}>
                        Realisasi jam 19:00
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={2}>
                        Beban Target Trip
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={2}>
                        Beban Stlh Ols Kerja
                      </TableCell>
                      <TableCell size="small" align="center" rowSpan={2}>
                        Status
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AMP</TableCell>
                      <TableCell>Detik</TableCell>
                      <TableCell>MW</TableCell>
                      <TableCell>I (A)</TableCell>
                      <TableCell>% ols</TableCell>
                      <TableCell>I (A)</TableCell>
                      <TableCell>%</TableCell>
                      <TableCell>I (A)</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          background: "#666CFF",
                          color: "#FFFFFF",
                          fontWeight: 500,
                          fontSize: "20px",
                        }}
                        size="small"
                        colSpan={20}
                      >
                        Subsistem Tanjungjati
                      </TableCell>
                    </TableRow>
                    {[0, 1, 3, 4, 5].map((index) => (
                      <TableRow>
                        <TableCell size="small">RDRUT - KRAPK</TableCell>
                        <TableCell size="small">1</TableCell>
                        <TableCell size="small" sx={{ background: "#f5f5fe" }}>
                          960
                        </TableCell>
                        <TableCell size="small" sx={{ background: "#f5f5fe" }}>
                          4,5
                        </TableCell>
                        <TableCell size="small" sx={{ background: "#f5f5fe" }}>
                          200
                        </TableCell>
                        <TableCell size="small">GI WLERI : Trafo 2</TableCell>
                        <TableCell size="small">18 Jan 2020</TableCell>
                        <TableCell size="small">
                          Bagus - 7 September 2022,14:21
                        </TableCell>
                        <TableCell size="small">
                          Berdasarkan BA OLS 18-01-14
                        </TableCell>
                        <TableCell size="small">291</TableCell>
                        <TableCell size="small">29</TableCell>
                        <TableCell size="small">291</TableCell>
                        <TableCell size="small">29</TableCell>
                        <TableCell size="small">291</TableCell>
                        <TableCell size="small">29</TableCell>
                        <TableCell size="small">
                          <Chip label="Aktif" color="success" />
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

export default OgsComponent;
