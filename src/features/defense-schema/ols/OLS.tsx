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
import { PencilOutline } from "mdi-material-ui";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import { openModal } from "src/state/modal";
import { WrapperFilter } from "src/components/filter";
import { ModalAddOLS } from "../modal";
import { defenseApi } from "src/api/defense";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { selectData } from "../state/defenseSchema";
import { DefenseSchemaList } from "../types";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";

const OLS = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getDefenseList, defenseList, loading, countData } = defenseApi();

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

  const getOLSList = () => {
    if (debouncedSearch) {
      getDefenseList("ols", { search, page: page + 1, limit: rowsPerPage });
    } else {
      getDefenseList("ols", { page: page + 1, limit: rowsPerPage });
    }
  };

  useEffect(() => {
    getOLSList();
  }, [debouncedSearch, page, rowsPerPage]);

  useEffect(() => {
    if (reloadPageSnap.target === "ols") {
      getOLSList();
    }
  }, [reloadPageSnap]);

  return (
    <>
      <ModalAddOLS />
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
                </div>
              </WrapperFilter>
              <TableContainer>
                {loading ? (
                  <FallbackSpinner />
                ) : (
                  <Table>
                    <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                      <TableRow>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Lokasi OLS
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Tahap
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={3}
                        >
                          Setting
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Target Trip
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          rowSpan={2}
                        >
                          Keterangan
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={2}
                        >
                          Realisasi
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={2}
                        >
                          Beban Target Trip
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={2}
                        >
                          Beban Stlh Ols Kerja
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          rowSpan={2}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          rowSpan={2}
                        >
                          Aksi
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">AMP</TableCell>
                        <TableCell variant="head">Detik</TableCell>
                        <TableCell variant="head">MW</TableCell>
                        <TableCell variant="head">I (A)</TableCell>
                        <TableCell variant="head">% ols</TableCell>
                        <TableCell variant="head">I (A)</TableCell>
                        <TableCell variant="head">%</TableCell>
                        <TableCell variant="head">I (A)</TableCell>
                        <TableCell variant="head">%</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {defenseList.length > 0 &&
                        defenseList.map((list: DefenseSchemaList) => (
                          <>
                            <TableRow>
                              <TableCell
                                sx={{
                                  background: "#d6ebf0",
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
                                  <TableRow key={data.id}>
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
                                      <Chip
                                        label={data.status ? "ON" : "OFF"}
                                        color={
                                          data.status ? "success" : "error"
                                        }
                                      />
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
                                            openModal("modal-add-ols", data.id);
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

export default OLS;
