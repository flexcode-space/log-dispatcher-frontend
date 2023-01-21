import { useState, ChangeEvent, useEffect } from "react";
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
import { ModalAddUFR } from "../modal";

import { WrapperFilter } from "src/components/filter";
import { DefenseUFRList } from "./types";
import { selectData } from "./state/ufr";
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { useSnapshot } from "valtio";
import { defenseApi } from "src/api/defense";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { pencatatanDefenseApi } from "src/api/pencatatan-defense";

const UfrComponent = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const debouncedSearch = useDebounce(search, 500);

  const { getDefenseList, defenseList, loading, countData } = defenseApi();
  const { createPencatanDefense } = pencatatanDefenseApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickStatus = async (data: DefenseUFRList) => {
    await createPencatanDefense("ufr", {
      gardu_induk: data?.gardu_induk.nama,
      keterangan: data?.keterangan,
      penyulang: data?.penyulang,
      set: data?.set,
      status: !data?.status,
      subsistem: data?.sub_sistem.nama,
      tahap: data?.tahap.value,
      trafo: data?.trafo.nama,
    });
    setReloadPage("ufr");
  };

  const getUFRList = () => {
    if (debouncedSearch) {
      getDefenseList("ufr", { search, page: page + 1, limit: rowsPerPage });
    } else {
      getDefenseList("ufr", { page: page + 1, limit: rowsPerPage });
    }
  };

  useEffect(() => {
    getUFRList();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    if (reloadPageSnap.target === "ufr") {
      getUFRList();
    }
  }, [reloadPageSnap.id]);

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
                    value={search}
                    sx={{ mr: 6, mb: 2 }}
                    placeholder="Cari"
                    onChange={(e) => setSearch(e.target.value)}
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
                    onClick={() => openModal("modal-add-ufr")}
                  >
                    <IconButton>
                      <Plus />
                    </IconButton>
                    Tambah Laporan
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                {loading ? (
                  <FallbackSpinner />
                ) : (
                  <Table>
                    <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                      <TableRow>
                        <TableCell align="center" size="small" colSpan={2}>
                          UFR
                        </TableCell>
                        {/* <TableCell size="small" rowSpan={2}>
                        UPT
                      </TableCell> */}
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
                      {defenseList.length &&
                        defenseList.map(
                          (list: DefenseUFRList, index: number) => (
                            <TableRow hover>
                              <TableCell size="small">
                                {list.tahap.value}
                              </TableCell>
                              <TableCell size="small">{list.set}</TableCell>
                              <TableCell size="small">
                                {list.sub_sistem.nama}
                              </TableCell>
                              <TableCell size="small">
                                {list.gardu_induk.nama}
                              </TableCell>
                              <TableCell size="small">
                                {list.trafo.nama}
                              </TableCell>
                              <TableCell size="small">
                                {list.penyulang}
                              </TableCell>
                              <TableCell size="small">
                                {list.beban_siang}
                              </TableCell>
                              <TableCell size="small">
                                {list.beban_malam}
                              </TableCell>
                              <TableCell size="small">
                                {list.keterangan}
                              </TableCell>
                              <TableCell size="small">
                                {list.ufr_trip}
                              </TableCell>
                              <TableCell size="small">
                                {list.ufr_masuk}
                              </TableCell>
                              <TableCell size="small">{list.ufr_kw}</TableCell>
                              <TableCell size="small"></TableCell>
                              <TableCell size="small">{list.ufr_kwh}</TableCell>
                              <TableCell size="small">
                                {list.penyulang_buka}
                              </TableCell>
                              <TableCell size="small">
                                {list.penyulang_tutup}
                              </TableCell>
                              <TableCell size="small">
                                {list.penyulang_kw}
                              </TableCell>
                              <TableCell size="small"></TableCell>
                              <TableCell size="small">
                                {list.penyulang_kwh}
                              </TableCell>
                              <TableCell size="small">
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <IconButton
                                    onClick={() => {
                                      openModal("modal-add-ufr", list.id);
                                      selectData(list);
                                    }}
                                  >
                                    <PencilOutline />
                                  </IconButton>
                                </Box>
                              </TableCell>
                              <TableCell size="small">
                                <Button
                                  variant="contained"
                                  onClick={() => onClickStatus(list)}
                                  sx={{
                                    color: "white !important",
                                    bgcolor: list.status
                                      ? "#72E128"
                                      : "#FF4D49",
                                  }}
                                >
                                  {list.status ? "ON" : "OFF"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 25, 100]}
                component="div"
                count={countData}
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
