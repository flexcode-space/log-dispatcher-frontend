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
import dayjs from "dayjs";
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
import { openModal } from "src/state/modal";
import { ModalFilter, ModalEdit } from "./modal";
import { switchingPembangkitApi } from "src/api/switching-pembangkit";
import { Filter, SwitchingPembangkitList } from "./types";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { selectData } from "./state/switchingPembangkit";
import FallbackSpinner from "src/@core/components/spinner";
import { useDebounce } from "src/hooks/useDebounce";
import ModalDownload from "./modal/ModalDownload";
import { MenuPengaturan } from "./components/menu-pengaturan";
import { ModalAddPerson } from "./modal/modal-add-person";

const SwitchingPembangkit = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [filter, setFilter] = useState<Filter>({} as Filter);

  const {
    getSwitchingPembangkitList,
    switchingPembangkitList,
    loading,
    countData,
  } = switchingPembangkitApi();

  const debouncedSearch = useDebounce(search, 500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSwitchingPembangkit = () => {
    const formatTanggal = filter.tanggal
      ? dayjs(filter.tanggal).format("YYYY-MM-DD")
      : "";
    const params = Object.keys(filter).length
      ? {
          ...filter,
          tanggal: formatTanggal,
        }
      : {
          tanggal: formatTanggal,
          limit: rowsPerPage,
          page: page + 1,
        };

    if (debouncedSearch) {
      getSwitchingPembangkitList({
        search,
        ...params,
      });
    } else {
      getSwitchingPembangkitList({ ...params });
    }
  };

  useEffect(() => {
    getSwitchingPembangkit();
  }, [debouncedSearch, page, rowsPerPage, filter]);

  useEffect(() => {
    if (reloadPageSnap.target === "switching-pembangkit") {
      getSwitchingPembangkit();
    }
  }, [reloadPageSnap]);

  return (
    <>
      <ModalFilter
        filter={filter}
        onChange={(value: Filter) => setFilter(value)}
      />
      <ModalAddPerson />
      <ModalDownload />
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
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px", height: "45px" }}>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() =>
                      openModal("modal-filter-switching-pembangkit")
                    }
                  >
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button>
                  <MenuPengaturan />
                  <Button
                    size="small"
                    sx={{ height: "40px" }}
                    variant="contained"
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
                        <TableCellHead>BOPS</TableCellHead>
                        <TableCellHead>ACC</TableCellHead>
                        <TableCellHead>Pembangkit</TableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {switchingPembangkitList.length > 0 &&
                        switchingPembangkitList?.map(
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
                                <TableCell size="small">
                                  {list.tanggal}
                                </TableCell>
                                <TableCell size="small" sx={timeColor}>
                                  {list.waktu_perintah}
                                </TableCell>
                                <TableCell size="small" sx={timeColor}>
                                  {list.waktu_real}
                                </TableCell>
                                <TableCell size="small" sx={operatorColor}>
                                  {list.operator_bops.nama}
                                </TableCell>
                                <TableCell size="small" sx={operatorColor}>
                                  {list.operator_acc.nama}
                                </TableCell>
                                <TableCell size="small" sx={operatorColor}>
                                  {list.operator_pembangkit.nama}
                                </TableCell>
                                <TableCell size="small">
                                  {list.energi_primer}
                                </TableCell>
                                <TableCell size="small">
                                  {list.status}
                                </TableCell>
                                <TableCell size="small">
                                  <Chip label={list.dispatch} color="success" />
                                </TableCell>
                                <TableCell size="small">
                                  {list.keterangan}
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
                                          "modal-edit-switching-pembangkit",
                                          list.id
                                        );
                                        selectData(
                                          list as SwitchingPembangkitList
                                        );
                                      }}
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

export default SwitchingPembangkit;
