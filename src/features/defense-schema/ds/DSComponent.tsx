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
  IconButton,
  Chip,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import DatePicker from "@mui/lab/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { openModal } from "src/state/modal";

import { WrapperFilter } from "src/components/filter";
import { useSnapshot } from "valtio";
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { defenseApi } from "src/api/defense";
import { ModalAddDS } from "../modal/modal-add-ds";
import { DefenseSchemaList, Data } from "../types";
import { PencilOutline } from "mdi-material-ui";
import { selectData } from "../state/defenseSchema";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { pencatatanDefenseApi } from "src/api/pencatatan-defense";

const DSComponent = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getDefenseList, defenseList, loading, countData } = defenseApi();
  const { createPencatanDefense } = pencatatanDefenseApi();

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

  const getDSList = () => {
    if (debouncedSearch) {
      getDefenseList("DS", { search, page: page + 1, limit: rowsPerPage });
    } else {
      getDefenseList("DS", { page: page + 1, limit: rowsPerPage });
    }
  };

  const onClickStatus = async (data: Data) => {
    await createPencatanDefense("ds", {
      keterangan: data?.keterangan,
      lokasi: data?.gardu_induk?.nama,
      status: !data?.status,
      subsistem: data?.sub_sistem.nama,
      tahap: data?.tahap.value,
      trip: data?.peralatan_target.nama,
    });
    setReloadPage("ds");
  };

  useEffect(() => {
    getDSList();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    if (reloadPageSnap.target === "ds") {
      getDSList();
    }
  }, [reloadPageSnap]);

  return (
    <>
      <ModalAddDS />
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
                  <Button
                    sx={{ mb: 2 }}
                    size="small"
                    variant="contained"
                    onClick={() => openModal("modal-add-ds")}
                  >
                    <IconButton>
                      <Plus />
                    </IconButton>
                    Tambah DS
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
                        <TableCell size="small" rowSpan={2}>
                          Lokasi DS
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
                      {defenseList.length > 0 &&
                        defenseList.map((list: DefenseSchemaList) => (
                          <>
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
                                {list.sub_sistem}
                              </TableCell>
                            </TableRow>
                            {list?.data.map((data) => {
                              return (
                                <>
                                  <TableRow hover key={data.id}>
                                    <TableCell size="small">
                                      {data.gardu_induk.nama}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.tahap.value}
                                    </TableCell>
                                    <TableCell
                                      size="small"
                                      sx={{ background: "#d6ebf0" }}
                                    >
                                      {data.amp.value}
                                    </TableCell>
                                    <TableCell
                                      size="small"
                                      sx={{ background: "#d6ebf0" }}
                                    >
                                      {data.detik}
                                    </TableCell>
                                    <TableCell
                                      size="small"
                                      sx={{ background: "#d6ebf0" }}
                                    >
                                      {data.mw}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.peralatan_target.nama}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.keterangan}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.real_ia}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.real_ols}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.target_ia}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.target_ols}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.set_ia}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.set_ols}
                                    </TableCell>
                                    <TableCell size="small">
                                      <Button
                                        variant="contained"
                                        onClick={() => onClickStatus(data)}
                                        sx={{
                                          color: "white !important",
                                          bgcolor: data.status
                                            ? "#72E128"
                                            : "#FF4D49",
                                        }}
                                      >
                                        {data.status ? "ON" : "OFF"}
                                      </Button>
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
                                            openModal("modal-add-ds", data.id);
                                            selectData(data);
                                          }}
                                        >
                                          <PencilOutline />
                                        </IconButton>
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
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

export default DSComponent;
