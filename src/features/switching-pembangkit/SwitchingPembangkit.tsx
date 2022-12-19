import { useState, ChangeEvent, useEffect } from "react";
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
  Chip,
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
import DownloadIcon from "src/assets/icons/download-icon.svg";
import FilterIcon from "src/assets/icons/filter-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { AddLaporan } from "./add-laporan";
import { openModal, closeModal } from "src/state/modal";
import { ModalFilter, ModalEdit } from "./modal";
import { switchingPembangkitApi } from "src/api/switching-pembangkit";
import { SwitchingPembangkitList } from "./types";

const SwitchingPembangkit = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { getSwitchingPembangkitList, switchingPembangkitList } =
    switchingPembangkitApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    getSwitchingPembangkitList();
  }, []);

  return (
    <>
      <ModalFilter handleClose={handleClose} />
      <ModalEdit />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Switching Pembangkit</Typography>}
          />
        </Grid>
        <Grid item xs={3}>
          <AddLaporan />
        </Grid>
        <Grid item xs={9}>
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

                <div style={{ display: "flex", gap: "10px", height: "45px" }}>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal()}
                  >
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button>
                  <Button sx={{ mb: 2 }} variant="contained">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Download laporan
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead size="small" rowSpan={2}>
                        No
                      </TableCellHead>
                      <TableCellHead size="small" rowSpan={2}>
                        Switching
                      </TableCellHead>
                      <TableCellHead size="small" rowSpan={2}>
                        Pembangkit
                      </TableCellHead>
                      <TableCellHead
                        minWidth="200px"
                        size="small"
                        align="center"
                        rowSpan={2}
                      >
                        Tanggal
                      </TableCellHead>
                      <TableCellHead size="small" align="center" colSpan={2}>
                        Waktu
                      </TableCellHead>
                      <TableCellHead size="small" align="center" colSpan={3}>
                        Operator
                      </TableCellHead>
                      <TableCellHead rowSpan={2}>Energi Primer</TableCellHead>
                      <TableCellHead rowSpan={2}>Status</TableCellHead>
                      <TableCellHead rowSpan={2}>Dispatch</TableCellHead>
                      <TableCellHead rowSpan={2}>Keterangan</TableCellHead>
                      <TableCellHead align="center" rowSpan={2}>
                        Aksi
                      </TableCellHead>
                    </TableRow>
                    <TableRow>
                      <TableCellHead>Perintah</TableCellHead>
                      <TableCellHead>Real</TableCellHead>
                      <TableCellHead>BPOS</TableCellHead>
                      <TableCellHead>ACC</TableCellHead>
                      <TableCellHead>Pembangkit</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {switchingPembangkitList?.map(
                      (list: SwitchingPembangkitList, index: number) => {
                        const timeColor = {
                          bgcolor: "rgba(255, 77, 73, 0.05)",
                        };
                        const operatorColor = {
                          bgcolor: "rgba(38, 198, 249, 0.05)",
                        };

                        return (
                          <TableRow hover key={list.id}>
                            <TableCell size="small">{index + 1}</TableCell>
                            <TableCell size="small">{list.jenis}</TableCell>
                            <TableCell size="small">
                              {list.pembangkit.nama}
                            </TableCell>
                            <TableCell size="small">{list.tanggal}</TableCell>
                            <TableCell size="small" sx={timeColor}>
                              {list.waktu_perintah}
                            </TableCell>
                            <TableCell size="small" sx={timeColor}>
                              {list.waktu_real}
                            </TableCell>
                            <TableCell size="small" sx={operatorColor}>
                              {list.operator_bops}
                            </TableCell>
                            <TableCell size="small" sx={operatorColor}>
                              {list.operator_acc}
                            </TableCell>
                            <TableCell size="small" sx={operatorColor}>
                              {list.operator_pembangkit}
                            </TableCell>
                            <TableCell size="small">
                              {list.energi_primer}
                            </TableCell>
                            <TableCell size="small">{list.status}</TableCell>
                            <TableCell size="small">
                              <Chip label={list.dispatch} color="success" />
                            </TableCell>
                            <TableCell size="small">
                              {list.keterangan}
                            </TableCell>
                            <TableCell size="small">
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <IconButton
                                  onClick={() =>
                                    openModal("modal-edit-switching-pembangkit")
                                  }
                                >
                                  <PencilOutline />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={switchingPembangkitList.length || 0}
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

export default SwitchingPembangkit;
