import { useState, ChangeEvent, useEffect } from "react";

import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Card, CardContent, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
// import TableRow from "@mui/material/TableRow";
// import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import PageHeader from "src/@core/components/page-header";
import {
  TableHead,
  TableCellHead,
  TableRow,
  TableCell,
} from "src/components/table";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import FilterIcon from "src/assets/icons/filter-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";
import { bebanApi } from "src/api/beban";
import { BebanTrafo } from "./types";
import { showValueBeban } from "./BebanTrafoHarian.constant";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian } from "./modal";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";

const BebanHarian = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [date, setDate] = useState<any>(new Date());

  const { getBebanTrafoList, bebanTrafoList } = bebanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBebanTrafoList({ tanggal: convertDate(date) });
  }, [date]);

  return (
    <>
      <ModalSetBebanHarian />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Beban Trafo Harian</Typography>}
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
                  <TableHead>
                    <TableRow>
                      <TableCellHead size="small" rowSpan={2}>
                        No
                      </TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="100px">
                        UPT
                      </TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="250px">
                        Subsistem
                      </TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="200px">
                        Gardu Induk
                      </TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="200px">
                        Trafo
                      </TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="150px">
                        Daya (MVA)
                      </TableCellHead>
                      <TableCellHead rowSpan={2}>Ratio</TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="150px">
                        Arus Nominal (A)
                      </TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="150px">Arus Mampu (A)</TableCellHead>
                      <TableCellHead rowSpan={2} minWidth="120px">Setting OCR</TableCellHead>
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
                    {bebanTrafoList?.map((value: BebanTrafo, index) => {
                      return (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{value.upt}</TableCell>
                          <TableCell>{value.sub_sistem}</TableCell>
                          <TableCell>{value.gardu_induk}</TableCell>
                          <TableCell>{value.trafo}</TableCell>
                          <TableCell>{`${value.daya} MVA`}</TableCell>
                          <TableCell>{value.rasio}</TableCell>
                          <TableCell>{value.arus_nominal}</TableCell>
                          <TableCell>{value.arus_mampu}</TableCell>
                          <TableCell>{value.setting_ocr}</TableCell>
                          {showValueBeban(value.data)}
                        </TableRow>
                      );
                    })}
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

export default BebanHarian;
