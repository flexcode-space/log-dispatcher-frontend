import { useState, ChangeEvent, useEffect } from "react";

import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Card, CardContent, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
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
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <FilterIcon />
                    Filter
                  </Button>
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
                  <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                    <TableRow>
                      <TableCell size="small" rowSpan={2}>
                        No
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        UPT
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Subsistem
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Gardu Induk
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Penghantar
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Jenis
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Tegangan operasi
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Arus Nominal (A)
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Arus Mampu (A)
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Setting OCR
                      </TableCell>
                      {TIME.map((value) => (
                        <TableCell size="small" align="center" colSpan={6}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {TIME.map(() => (
                        <>
                          <TableCell size="small">arus (a)</TableCell>
                          <TableCell size="small">mw</TableCell>
                          <TableCell size="small">mvar</TableCell>
                          <TableCell size="small">KWH</TableCell>
                          <TableCell size="small">% i nom</TableCell>
                          <TableCell size="small">% i mampu</TableCell>
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
