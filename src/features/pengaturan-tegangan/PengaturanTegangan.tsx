import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { useRouter } from "next/router";
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
import { AddLaporan } from "./add-laporan";
import { openModal, closeModal } from "src/state/modal";

import { ModalEdit, ModalFilter } from "./modal";
import { CardHeader } from "src/components/card";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";
import { PengaturanTeganganList } from "./types";
import dayjs from "dayjs";
import { selectData } from "./state/pengaturanTegangan";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import FallbackSpinner from "src/@core/components/spinner";

const PengaturanTegangan = () => {
  const router = useRouter();
  const reloadPageSnap = useSnapshot(reloadPage);

  const { getPengaturanTeganganList, pengaturanTeganganList, loading } =
    pengaturanTeganganApi();

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    getPengaturanTeganganList();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "pengaturan-tegangan")
      getPengaturanTeganganList();
  }, [reloadPageSnap]);

  return (
    <>
      <ModalFilter handleClose={handleClose} />
      <ModalEdit />
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
            <CardHeader
              title={
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />
              }
              action={
                <div style={{ display: "flex", gap: "10px", height: "50px" }}>
                  {/* <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() =>
                      openModal("modal-filter-pengaturan-tegangan")
                    }
                  >
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button> */}
                  <Button sx={{ mb: 2 }} variant="contained">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Download laporan
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() =>
                      router.push("/pengaturan-tegangan/konfigurasi")
                    }
                  >
                    <IconButton>
                      <KonfigurasiIcon />
                    </IconButton>
                    Konfigurasi
                  </Button>
                </div>
              }
            />
            <CardContent>
              <TableContainer>
                {loading ? (
                  <FallbackSpinner />
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCellHead minWidth="200px" size="small">
                          Lokasi
                        </TableCellHead>
                        <TableCellHead minWidth="150px" size="small">
                          Jenis
                        </TableCellHead>
                        <TableCellHead minWidth="100px" size="small">
                          Jurusan
                        </TableCellHead>
                        <TableCellHead minWidth="100px" size="small">
                          Open/Close
                        </TableCellHead>
                        <TableCellHead minWidth="250px" size="small">
                          Waktu
                        </TableCellHead>
                        <TableCellHead minWidth="100px" size="small">
                          Sebelum
                        </TableCellHead>
                        <TableCellHead minWidth="100px" size="small">
                          Sesudah
                        </TableCellHead>
                        <TableCellHead minWidth="100px" size="small">
                          MVAR
                        </TableCellHead>
                        <TableCellHead minWidth="200px" size="small">
                          Keterangan
                        </TableCellHead>
                        <TableCellHead minWidth="50px" size="small">
                          Aksi
                        </TableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pengaturanTeganganList.length > 0
                        ? pengaturanTeganganList.map(
                            (value: PengaturanTeganganList, index) => (
                              <TableRow hover key={`list-${index}`}>
                                <TableCell size="small">
                                  {value?.gardu_induk?.nama}
                                </TableCell>
                                <TableCell size="small">
                                  {value.jenis}
                                </TableCell>
                                <TableCell size="small">
                                  {value.jurusan}
                                </TableCell>
                                <TableCell size="small">
                                  {value.open_close}
                                </TableCell>
                                <TableCell size="small">
                                  {`${dayjs(value.tanggal).format(
                                    "DD MMMM YYYY"
                                  )}, ${value?.waktu} WIB`}
                                </TableCell>
                                <TableCell size="small">
                                  {value.sebelum}
                                </TableCell>
                                <TableCell size="small">
                                  {value.sesudah}
                                </TableCell>
                                <TableCell size="small">{value.mvar}</TableCell>
                                <TableCell size="small">
                                  {value.keterangan}
                                </TableCell>
                                <TableCell size="small">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <IconButton
                                      onClick={() => {
                                        openModal(
                                          "modal-edit-pengaturan-tegangan",
                                          value.id
                                        );
                                        selectData(
                                          value as PengaturanTeganganList
                                        );
                                      }}
                                    >
                                      <PencilOutline />
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )
                          )
                        : null}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PengaturanTegangan;
