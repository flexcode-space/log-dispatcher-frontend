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
import { bebanApi } from "src/api/beban";
import { IBTList } from "./types";
import { showValueBeban } from "./BebanIBTHarian.constant";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian, ModalDownload } from "./modal";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";

const BebanIBTHarian = () => {
  // ** States
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [date, setDate] = useState<any>(new Date());

  const debouncedSearch = useDebounce(search, 500);

  const { getBebanIBTList, bebanIBTList, loading, countData } = bebanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getBebanIBT = () => {
    if (debouncedSearch) {
      getBebanIBTList({
        tanggal: convertDate(date),
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getBebanIBTList({
        tanggal: convertDate(date),
        page: page + 1,
        limit: rowsPerPage,
      });
    }
  };

  useEffect(() => {
    getBebanIBTList({ tanggal: convertDate(date) });
  }, [date, debouncedSearch, page, rowsPerPage]);

  return (
    <>
      <ModalSetBebanHarian />
      <ModalDownload />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Beban IBT Harian</Typography>}
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
                        <TableCellHead size="small" rowSpan={2}>
                          No
                        </TableCellHead>
                        <TableCellHead
                          size="small"
                          rowSpan={2}
                          minWidth="200px"
                        >
                          UPT
                        </TableCellHead>
                        <TableCellHead
                          size="small"
                          rowSpan={2}
                          minWidth="250px"
                        >
                          Subsistem
                        </TableCellHead>
                        <TableCellHead
                          size="small"
                          rowSpan={2}
                          minWidth="200px"
                        >
                          Gardu Induk
                        </TableCellHead>
                        <TableCellHead
                          size="small"
                          rowSpan={2}
                          minWidth="200px"
                        >
                          Nama IBT
                        </TableCellHead>
                        <TableCellHead
                          size="small"
                          rowSpan={2}
                          minWidth="120px"
                        >
                          Daya (MVA)
                        </TableCellHead>
                        <TableCellHead size="small" rowSpan={2}>
                          Ratio
                        </TableCellHead>
                        <TableCellHead
                          minWidth="150px"
                          size="small"
                          rowSpan={2}
                        >
                          Arus Nominal (A)
                        </TableCellHead>
                        <TableCellHead
                          minWidth="150px"
                          size="small"
                          rowSpan={2}
                        >
                          Arus Mampu (A)
                        </TableCellHead>
                        <TableCellHead
                          minWidth="120px"
                          size="small"
                          rowSpan={2}
                        >
                          Setting OCR
                        </TableCellHead>
                        {TIME.map((value) => (
                          <TableCellHead
                            size="small"
                            align="center"
                            colSpan={6}
                          >
                            {value}
                          </TableCellHead>
                        ))}
                      </TableRow>
                      <TableRow>
                        {TIME.map(() => (
                          <>
                            <TableCellHead minWidth="100px" size="small">
                              arus (a)
                            </TableCellHead>
                            <TableCellHead size="small">mw</TableCellHead>
                            <TableCellHead size="small">mvar</TableCellHead>
                            <TableCellHead size="small">KWH</TableCellHead>
                            <TableCellHead minWidth="100px" size="small">
                              % i nom
                            </TableCellHead>
                            <TableCellHead minWidth="120px" size="small">
                              % i mampu
                            </TableCellHead>
                          </>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bebanIBTList?.map((value: IBTList, index) => {
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
                              {value.data?.nama_ibt}
                            </TableCell>
                            <TableCell size="small">{`${value.daya} MVA`}</TableCell>
                            <TableCell size="small">{value.rasio}</TableCell>
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
                      })}
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

export default BebanIBTHarian;
