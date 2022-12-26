import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import TablePagination from "@mui/material/TablePagination";
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
import {
  ModalAddGangguan,
  ModalKeteranganGangguan,
  ModalDataPadam,
  ModalConfirmationDelete,
} from "./modal";
import { gangguanApi } from "src/api/gangguan";
import { GangguanList } from "./types";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";

const Gangguan = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { getGangguanList, gangguanList } = gangguanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getGangguanList();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "gangguan") {
      getGangguanList();
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <ModalDataPadam />
      <ModalAddGangguan />
      <ModalKeteranganGangguan />
      <ModalConfirmationDelete />
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
                    onClick={() => openModal("modal-add-gangguan")}
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
                          <TableCell>
                            <Box display="flex">
                              <IconButton
                                onClick={() =>
                                  openModal("modal-add-gangguan", list.id)
                                }
                              >
                                <Pencil />
                              </IconButton>
                              <MenuMore data={list} />
                            </Box>
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

export default Gangguan;
