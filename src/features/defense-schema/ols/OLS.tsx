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
import ModalAdd from "../modal/ModalAdd";
import { defenseSchemeOlsApi } from "src/api/defense-scheme";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { defenseScheme } from "./types";

const OLS = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getDefenseSchemeList, defenseScheme } = defenseSchemeOlsApi();
  useEffect(() => {
    getDefenseSchemeList();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-posko") {
      getDefenseSchemeList();
    }
  }, [reloadPageSnap]);
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
      <ModalAdd name="OLS" />
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
                          sx={{ width: "200px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    onClick={() => openModal()}
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
                        Subsistem Tanjungjati
                      </TableCell>
                    </TableRow>
                    {/* {[0, 1, 3, 4, 5].map((index) => ( */}
                    {defenseScheme.length > 0 &&
                      defenseScheme.map((list: defenseScheme) => (
                        <TableRow key={list.id}>
                          <TableCell size="small">
                            {list.gardu_induk.nama}
                          </TableCell>
                          <TableCell size="small">{list.tahap.value}</TableCell>
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
                          <TableCell size="small">{list.keterangan}</TableCell>
                          <TableCell size="small">{list.real_ia}</TableCell>
                          <TableCell size="small">{list.real_ols}</TableCell>
                          <TableCell size="small">{list.target_ia}</TableCell>
                          <TableCell size="small">{list.target_ols}</TableCell>
                          <TableCell size="small">{list.set_ia}</TableCell>
                          <TableCell size="small">{list.set_ols}</TableCell>
                          <TableCell size="small">
                            <Chip label="ON" color="success" />
                          </TableCell>
                          <TableCell size="small">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <IconButton onClick={() => null}>
                                <PencilOutline />
                              </IconButton>
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
      {/* {defenseScheme.length > 0 &&
        defenseScheme.map((list: defenseScheme) => (
          <TableRow key={list.amp_id} hover>
            <TableCell size="small">{list.jenis_peralatan}</TableCell>
          </TableRow>
        ))} */}
    </>
  );
};

export default OLS;
