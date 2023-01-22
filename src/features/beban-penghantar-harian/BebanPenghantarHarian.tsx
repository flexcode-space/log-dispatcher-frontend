import { useState, ChangeEvent, useEffect } from "react";

import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Card, CardContent, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import PageHeader from "src/@core/components/page-header";
import DownloadIcon from "src/assets/icons/download-icon.svg";
// import FilterIcon from "src/assets/icons/filter-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian, ModalDownload } from "./modal";
import { bebanApi } from "src/api/beban";
import { showValueBeban } from "./BebanPenghantarHarian.constant";
import { BebanPenghantarHarian } from "./types";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";

const BebanPenghantarHarian = () => {
  // ** States
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [date, setDate] = useState<any>(new Date());

  const {
    getBebanPenghantarHarianList,
    bebanPenghantarList,
    loading,
    countData,
  } = bebanApi();

  const debouncedSearch = useDebounce(search, 500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getBebanPenghantarHarian = () => {
    if (debouncedSearch) {
      getBebanPenghantarHarianList({
        tanggal: convertDate(date),
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getBebanPenghantarHarianList({
        tanggal: convertDate(date),
        page: page + 1,
        limit: rowsPerPage,
      });
    }
  };

  useEffect(() => {
    getBebanPenghantarHarian();
  }, [date, debouncedSearch, page, rowsPerPage]);

  return (
    <>
      <ModalSetBebanHarian />
      <ModalDownload />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">Beban Penghantar Harian</Typography>
            }
          />
        </Grid>
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
                    <DatePicketMui
                      value={date}
                      inputFormat="dd/M/yyyy"
                      onChange={(e) => setDate(e)}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "250px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {/* <Button sx={{ mb: 2 }} variant="outlined">
                    <FilterIcon />
                    Filter
                  </Button> */}
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <EditIcon />
                    Ubah Arus Mampu
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal("modal-beban-harian")}
                  >
                    Set
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    onClick={() => openModal("modal-download")}
                  >
                    <DownloadIcon />
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
                        <TableCellHead rowSpan={2}>No</TableCellHead>
                        <TableCellHead minWidth="200px" rowSpan={2}>
                          UPT
                        </TableCellHead>
                        <TableCellHead minWidth="200px" rowSpan={2}>
                          Subsistem
                        </TableCellHead>
                        <TableCellHead minWidth="200px" rowSpan={2}>
                          Gardu Induk
                        </TableCellHead>
                        <TableCellHead minWidth="250px" rowSpan={2}>
                          Penghantar
                        </TableCellHead>
                        <TableCellHead rowSpan={2}>Jenis</TableCellHead>
                        <TableCellHead minWidth="200px" rowSpan={2}>
                          Tegangan operasi
                        </TableCellHead>
                        <TableCellHead minWidth="150px" rowSpan={2}>
                          Arus Nominal (A)
                        </TableCellHead>
                        <TableCellHead minWidth="150px" rowSpan={2}>
                          Arus Mampu (A)
                        </TableCellHead>
                        <TableCellHead minWidth="150px" rowSpan={2}>
                          Setting OCR
                        </TableCellHead>
                        {TIME.map((value) => (
                          <TableCellHead align="center" colSpan={6}>
                            {value}
                          </TableCellHead>
                        ))}
                      </TableRow>
                      <TableRow>
                        {TIME.map(() => (
                          <>
                            <TableCellHead minWidth="100px">
                              arus (a)
                            </TableCellHead>
                            <TableCellHead>mw</TableCellHead>
                            <TableCellHead>mvar</TableCellHead>
                            <TableCellHead>KWH</TableCellHead>
                            <TableCellHead minWidth="100px">
                              % i nom
                            </TableCellHead>
                            <TableCellHead minWidth="120px">
                              % i mampu
                            </TableCellHead>
                          </>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bebanPenghantarList?.map(
                        (value: BebanPenghantarHarian, index) => {
                          return (
                            <TableRow hover>
                              <TableCell size="small">{index + 1}</TableCell>
                              <TableCell size="small">{value.upt}</TableCell>
                              <TableCell size="small">
                                {value.sub_sistem}
                              </TableCell>
                              <TableCell size="small">
                                {value.gardu_induk}
                              </TableCell>
                              <TableCell size="small">
                                {value.data.nama_penghantar}
                              </TableCell>
                              <TableCell size="small">
                                {value.data.jenis}
                              </TableCell>
                              <TableCell size="small">{`${value.tegangan} MVA`}</TableCell>
                              <TableCell size="small">
                                {value.arus_nominal}
                              </TableCell>
                              <TableCell size="small">
                                {value.arus_mampu}
                              </TableCell>
                              <TableCell size="small">
                                {value.setting_ocr}
                              </TableCell>
                              {showValueBeban(value.data)}
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

export default BebanPenghantarHarian;
