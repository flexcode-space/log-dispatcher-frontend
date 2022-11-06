import { useState, ChangeEvent, useEffect } from "react";

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
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";
import { bebanApi } from "src/api/beban";
import { IBTList, Data } from "./types";
import { time, showValueBeban } from "./BebanIBTHarian.constant";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian } from "./modal";

const BebanIBTHarian = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { getBebanIBTList, bebanIBTList } = bebanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBebanIBTList({ tanggal: "2022-10-13" });
  }, []);

  return (
    <>
      <ModalSetBebanHarian />

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
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
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
                      <TableCell
                        size="small"
                        rowSpan={2}
                        style={{ minWidth: "100px" }}
                      >
                        UPT
                      </TableCell>
                      <TableCell
                        size="small"
                        rowSpan={2}
                        style={{ minWidth: "250px" }}
                      >
                        Subsistem
                      </TableCell>
                      <TableCell
                        size="small"
                        rowSpan={2}
                        style={{ minWidth: "200px" }}
                      >
                        Gardu Induk
                      </TableCell>
                      <TableCell
                        size="small"
                        rowSpan={2}
                        style={{ minWidth: "200px" }}
                      >
                        Nama IBT
                      </TableCell>
                      <TableCell
                        size="small"
                        rowSpan={2}
                        style={{ minWidth: "100px" }}
                      >
                        Daya (MVA)
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Ratio
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
                      {time.map((value) => (
                        <TableCell size="small" align="center" colSpan={6}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {time.map(() => (
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
                    {bebanIBTList?.map((value: IBTList, index) => {
                      return (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{value.upt}</TableCell>
                          <TableCell>{value.sub_sistem}</TableCell>
                          <TableCell>{value.gardu_induk}</TableCell>
                          <TableCell>{value.data?.nama_ibt}</TableCell>
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

export default BebanIBTHarian;
