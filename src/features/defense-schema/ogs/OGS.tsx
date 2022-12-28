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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { openModal } from "src/state/modal";

import { WrapperFilter } from "src/components/filter";
import { ModalAddGS } from "../modal/modal-add-ogs";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { defenseApi } from "src/api/defense";
import { DefenseSchemaList } from "../types";
import { PencilOutline } from "mdi-material-ui";
import { selectData } from "../state/defenseSchema";

const OgsComponent = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getDefenseList, defenseList } = defenseApi();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getDefenseList("ogs");
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "ogs") {
      getDefenseList("ogs");
    }
  }, [reloadPageSnap]);

  return (
    <>
      <ModalAddGS />
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
                    onClick={() => openModal("modal-add-ogs")}
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
                        Keterangan
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
                              {list.sub_sistem.nama}
                            </TableCell>
                          </TableRow>
                          <TableRow key={list.id}>
                            <TableCell size="small">
                              {list.gardu_induk.nama}
                            </TableCell>
                            <TableCell size="small">
                              {list.tahap.value}
                            </TableCell>
                            <TableCell
                              size="small"
                              sx={{ background: "#d6ebf0" }}
                            >
                              {list.amp.value}
                            </TableCell>
                            <TableCell
                              size="small"
                              sx={{ background: "#d6ebf0" }}
                            >
                              {list.detik}
                            </TableCell>
                            <TableCell
                              size="small"
                              sx={{ background: "#d6ebf0" }}
                            >
                              {list.mw}
                            </TableCell>
                            <TableCell size="small">
                              {list.peralatan_target.nama}
                            </TableCell>
                            <TableCell size="small">
                              {list.keterangan}
                            </TableCell>
                            <TableCell size="small">{list.real_ia}</TableCell>
                            <TableCell size="small">{list.real_ols}</TableCell>
                            <TableCell size="small">{list.target_ia}</TableCell>
                            <TableCell size="small">
                              {list.target_ols}
                            </TableCell>
                            <TableCell size="small">{list.set_ia}</TableCell>
                            <TableCell size="small">{list.set_ols}</TableCell>
                            <TableCell size="small">
                              <Chip
                                label={list.status ? "ON" : "OFF"}
                                color={list.status ? "success" : "error"}
                              />
                            </TableCell>
                            <TableCell size="small">
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <IconButton
                                  onClick={() => {
                                    openModal("modal-add-ogs", list.id);
                                    selectData(list);
                                  }}
                                >
                                  <PencilOutline />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </>
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
