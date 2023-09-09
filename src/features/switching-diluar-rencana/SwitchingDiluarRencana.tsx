import { useState, ChangeEvent, useEffect, useContext } from "react";
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
import { switchingLuarRencanaApi } from "src/api/switchingDiluarRencanaApi";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
// import FilterIcon from "src/assets/icons/filter-icon.svg";
import { WrapperFilter } from "src/components/filter";
import { ModalAddSwitching } from "./modal";
import { SwitchingLuarRencanaList } from "./types";
import { openModal } from "src/state/modal";
import { selectData } from "./state";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import FallbackSpinner from "src/@core/components/spinner";
import { useDebounce } from "src/hooks/useDebounce";
import ModalDownload from "./modal/ModalDownload";
import { AbilityContext } from "src/layouts/components/acl/Can";

const SwitchingDiluarRencana = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);

  const {
    getSwitchingLuarRencanaList,
    switchingLuarRencana,
    loading,
    countData,
  } = switchingLuarRencanaApi();

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const debouncedSearch = useDebounce(search, 500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSwitchingLuarRencana = () => {
    if (debouncedSearch) {
      getSwitchingLuarRencanaList({
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getSwitchingLuarRencanaList({ page: page + 1, limit: rowsPerPage });
    }
  };

  useEffect(() => {
    getSwitchingLuarRencana();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    if (reloadPageSnap.target === "switching-luar-rencana") {
      getSwitchingLuarRencanaList();
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <ModalDownload />
      <ModalAddSwitching />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">Switching Diluar Rencana</Typography>
            }
          />
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
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  {/* <Button size="small" sx={{ mb: 2 }} variant="outlined">
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button> */}
                  <Button
                    size="small"
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal("modal-download")}
                  >
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Download laporan
                  </Button>
                  {ability?.can("create", "switching-luar-rencana-page") ? (
                    <Button
                      onClick={() => openModal("modal-switching-luar-rencana")}
                      size="small"
                      sx={{ mb: 2 }}
                      variant="contained"
                    >
                      Tambah Switching
                    </Button>
                  ) : null}
                </div>
              </WrapperFilter>
              <TableContainer>
                {loading ? (
                  <FallbackSpinner />
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCellHead size="small" rowSpan={2}>
                          No
                        </TableCellHead>
                        <TableCellHead size="small" rowSpan={2}>
                          Lokasi
                        </TableCellHead>
                        <TableCellHead size="small" rowSpan={2}>
                          Jurusan
                        </TableCellHead>
                        <TableCellHead size="small" align="center" colSpan={2}>
                          Jam
                        </TableCellHead>
                        <TableCellHead rowSpan={2}>Keterangan</TableCellHead>
                        <TableCellHead align="center" rowSpan={2}>
                          Aksi
                        </TableCellHead>
                      </TableRow>
                      <TableRow>
                        <TableCellHead>Buka</TableCellHead>
                        <TableCellHead>Tutup</TableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {switchingLuarRencana.map(
                        (list: SwitchingLuarRencanaList, index) => (
                          <TableRow hover key={list.id}>
                            <TableCell size="small">{index + 1}</TableCell>
                            <TableCell size="small">
                              {list.gardu_induk.nama}
                            </TableCell>
                            <TableCell size="small">
                              {list.penghantar.nama}
                            </TableCell>
                            <TableCell size="small">{list.jam_buka}</TableCell>
                            <TableCell size="small">{list.jam_tutup}</TableCell>
                            <TableCell size="small">
                              {list.keterangan}
                            </TableCell>
                            <TableCell size="small">
                              {ability?.can(
                                "update",
                                "switching-luar-rencana-page"
                              ) ? (
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <IconButton
                                    onClick={() => {
                                      openModal(
                                        "modal-switching-luar-rencana",
                                        list.id
                                      );
                                      selectData(list);
                                    }}
                                  >
                                    <PencilOutline />
                                  </IconButton>
                                </Box>
                              ) : null}
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

export default SwitchingDiluarRencana;
