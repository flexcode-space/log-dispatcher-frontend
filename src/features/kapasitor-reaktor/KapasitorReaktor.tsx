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
import { useSnapshot } from "valtio";
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
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { openModal } from "src/state/modal";
import { WrapperFilter } from "src/components/filter";
import { selectData } from "src/state/kapasitorReaktor";
import { AddLaporan } from "./add-laporan";
import { kapasitorReaktorApi } from "src/api/kapasitorReaktorApi";
import { KapasitorReaktorList } from "./types";
import { ModalEdit } from "./modal";
import { reloadPage } from "src/state/reloadPage";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import ModalDownload from "./modal/ModalDownload";
import { AbilityContext } from "src/layouts/components/acl/Can";

const KapasitorReaktor = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const debouncedSearch = useDebounce(search, 500);

  const { getKapasitorReaktorList, kapasitorReaktorList, loading, countData } =
    kapasitorReaktorApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getKapasitorReaktor = () => {
    if (debouncedSearch) {
      getKapasitorReaktorList({ search, page: page + 1, limit: rowsPerPage });
    } else {
      getKapasitorReaktorList({ page: page + 1, limit: rowsPerPage });
    }
  };

  useEffect(() => {
    getKapasitorReaktor();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    if (reloadPageSnap.target === "kapasitor-reaktor") {
      getKapasitorReaktor();
    }
  }, [reloadPage.id]);

  return (
    <>
      <ModalDownload />
      <ModalEdit />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Kapasitor Reaktor</Typography>}
          />
        </Grid>
        {ability?.can("create", "kapasitor-reaktor-page") ? (
          <Grid item xs={12}>
            <AddLaporan />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value={search}
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
                        <TableCellHead size="small" align="center" colSpan={2}>
                          Jam
                        </TableCellHead>
                        <TableCellHead size="small" align="center" colSpan={2}>
                          Tegangan
                        </TableCellHead>
                        <TableCellHead size="small" rowSpan={2}>
                          Keterangan
                        </TableCellHead>
                        <TableCellHead size="small" align="center" rowSpan={2}>
                          Aksi
                        </TableCellHead>
                      </TableRow>
                      <TableRow>
                        <TableCellHead>Buka</TableCellHead>
                        <TableCellHead>Tutup</TableCellHead>
                        <TableCellHead>Sebelum</TableCellHead>
                        <TableCellHead>Sesudah</TableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {kapasitorReaktorList.map(
                        (list: KapasitorReaktorList, index) => (
                          <TableRow hover key={list.id}>
                            <TableCell size="small">{index + 1}</TableCell>
                            <TableCell size="small">
                              {list.gardu_induk.nama}
                            </TableCell>
                            <TableCell size="small">{list.jam_buka}</TableCell>
                            <TableCell size="small">{list.jam_tutup}</TableCell>
                            <TableCell size="small">
                              {list.tegangan_sebelum}
                            </TableCell>
                            <TableCell size="small">
                              {list.tegangan_sesudah}
                            </TableCell>
                            <TableCell size="small">
                              {list.keterangan}
                            </TableCell>
                            <TableCell size="small">
                              {ability?.can(
                                "update",
                                "kapasitor-reaktor-page"
                              ) ? (
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <IconButton
                                    onClick={() => {
                                      openModal(
                                        "modal-edit-kapasitor-reaktor",
                                        list.id
                                      );
                                      selectData(list as KapasitorReaktorList);
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

export default KapasitorReaktor;
