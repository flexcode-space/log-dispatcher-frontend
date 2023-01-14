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
import FilterIcon from "src/assets/icons/filter-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian } from "./modal";
import { bebanApi } from "src/api/beban";
import { showValueBeban } from "./BebanPenghantarHarian.constant";
import { BebanPenghantarHarian } from "./types";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";

const BebanPenghantarHarian = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [date, setDate] = useState<any>(new Date());

  const { getBebanPenghantarHarianList, bebanPenghantarList } = bebanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBebanPenghantarHarianList({ tanggal: convertDate(date) });
  }, [date]);

  return (
    <>
      <ModalSetBebanHarian />

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
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
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
                    onClick={() => openModal()}
                  >
                    Set
                  </Button>
                  <Button sx={{ mb: 2 }} variant="contained">
                    <DownloadIcon />
                    Download laporan
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead rowSpan={2}>No</TableCellHead>
                      <TableCellHead rowSpan={2}>UPT</TableCellHead>
                      <TableCellHead rowSpan={2}>Subsistem</TableCellHead>
                      <TableCellHead minWidth="200px" rowSpan={2}>Gardu Induk</TableCellHead>
                      <TableCellHead minWidth="250px" rowSpan={2}>Penghantar</TableCellHead>
                      <TableCellHead rowSpan={2}>Jenis</TableCellHead>
                      <TableCellHead minWidth="200px" rowSpan={2}>
                        Tegangan operasi
                      </TableCellHead>
                      <TableCellHead minWidth="150px" rowSpan={2}>
                        Arus Nominal (A)
                      </TableCellHead>
                      <TableCellHead minWidth="150px" rowSpan={2}>Arus Mampu (A)</TableCellHead>
                      <TableCellHead minWidth="150px" rowSpan={2}>Setting OCR</TableCellHead>
                      {TIME.map((value) => (
                        <TableCellHead align="center" colSpan={6}>
                          {value}
                        </TableCellHead>
                      ))}
                    </TableRow>
                    <TableRow>
                      {TIME.map(() => (
                        <>
                          <TableCellHead minWidth="100px">arus (a)</TableCellHead>
                          <TableCellHead>mw</TableCellHead>
                          <TableCellHead>mvar</TableCellHead>
                          <TableCellHead>KWH</TableCellHead>
                          <TableCellHead minWidth="100px">% i nom</TableCellHead>
                          <TableCellHead minWidth="120px">% i mampu</TableCellHead>
                        </>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bebanPenghantarList?.map(
                      (value: BebanPenghantarHarian, index) => {
                        return (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{value.upt}</TableCell>
                            <TableCell>{value.sub_sistem}</TableCell>
                            <TableCell>{value.gardu_induk}</TableCell>
                            <TableCell>{value.data.nama_penghantar}</TableCell>
                            <TableCell>{value.data.jenis}</TableCell>
                            <TableCell>{`${value.tegangan} MVA`}</TableCell>
                            <TableCell>{value.arus_nominal}</TableCell>
                            <TableCell>{value.arus_mampu}</TableCell>
                            <TableCell>{value.setting_ocr}</TableCell>
                            {showValueBeban(value.data)}
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

export default BebanPenghantarHarian;
