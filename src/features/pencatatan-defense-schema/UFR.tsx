import { useState, ChangeEvent, useEffect } from "react";
import {
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
  Chip,
  IconButton,
} from "@mui/material";
import { WrapperFilter } from "src/components/filter";
import { useSnapshot } from "valtio";
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { pencatatanDefenseApi } from "src/api/pencatatan-defense";
import { Pencatatan } from "./types";
import { DeleteOutline } from "mdi-material-ui";

const UFR = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const {
    getPencatatanDefenseList,
    pencatatanDefenseList,
    loading,
    countData,
    deletePencatanDefense,
  } = pencatatanDefenseApi();

  // ** States
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const debouncedSearch = useDebounce(search, 500);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickDelete = async (id: string) => {
    if (confirm("Hapus Data ini ?")) {
      await deletePencatanDefense("ufr", { id });
      setReloadPage("ufr");
    }
  };

  const getUFRList = () => {
    if (debouncedSearch) {
      getPencatatanDefenseList("ufr", {
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getPencatatanDefenseList("ufr", { page: page + 1, limit: rowsPerPage });
    }
  };

  useEffect(() => {
    getUFRList();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    if (reloadPageSnap.target === "ufr") {
      getUFRList();
    }
  }, [reloadPageSnap]);

  return (
    <>
      <Grid container spacing={6}>
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

                {/* <div style={{ display: "flex", gap: "10px" }}>
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
                          sx={{ width: "200px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    onClick={() => openModal("modal-add-ols")}
                    size="small"
                  >
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Tambah OLS
                  </Button>
                </div> */}
              </WrapperFilter>
              <TableContainer>
                {loading ? (
                  <FallbackSpinner />
                ) : (
                  <Table>
                    <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                      <TableRow>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Subsistem
                        </TableCell>
                        <TableCell
                          variant="head"
                          align="center"
                          size="small"
                          colSpan={2}
                        >
                          UFR
                        </TableCell>
                        <TableCell
                          align="center"
                          variant="head"
                          size="small"
                          colSpan={3}
                        >
                          Lokasi
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Waktu
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Keterangan
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Status
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Aksi
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" size="small">
                          Tahap
                        </TableCell>
                        <TableCell variant="head" size="small">
                          Sett
                        </TableCell>
                        <TableCell variant="head" size="small">
                          Gardu Induk
                        </TableCell>
                        <TableCell variant="head" size="small">
                          Trafo
                        </TableCell>
                        <TableCell variant="head" size="small">
                          Penyulang
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pencatatanDefenseList.length > 0 &&
                        pencatatanDefenseList.map((list: Pencatatan) => (
                          <>
                            <TableRow hover key={list.id}>
                              <TableCell size="small">
                                {list.subsistem}
                              </TableCell>
                              <TableCell size="small">{list.tahap}</TableCell>
                              <TableCell size="small">{list?.set}</TableCell>
                              <TableCell size="small">
                                {list?.gardu_induk}
                              </TableCell>
                              <TableCell size="small">{list?.trafo}</TableCell>
                              <TableCell size="small">
                                {list?.penyulang}
                              </TableCell>
                              <TableCell size="small">
                                {list?.tanggal}
                              </TableCell>
                              <TableCell size="small">
                                {list.keterangan}
                              </TableCell>
                              <TableCell size="small">
                                <Chip
                                  label={list?.status ? "ON" : "OFF"}
                                  color={list?.status ? "success" : "error"}
                                />
                              </TableCell>
                              <TableCell size="small">
                                <IconButton>
                                  <DeleteOutline
                                    onClick={() => onClickDelete(list?.id)}
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
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

export default UFR;
