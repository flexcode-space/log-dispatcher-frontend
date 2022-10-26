// ** React Imports
import { useState, ChangeEvent, useEffect } from "react";

// ** MUI Imports
import { Card, CardContent, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
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
import CustomChip from "src/@core/components/mui/chip";

import { WrapperFilter } from "src/components/filter";
import { bebanApi } from "src/api/beban";
import {
  Beban,
  KategoriPembangkit,
  TipeJenisPembangkit,
  DataKategoriPembangkit,
  DataIBT,
  IBT,
} from "src/api/beban/types";
import { time, showValueBeban } from "./BebanHarian.constant";
import { ModalSetBebanHarian } from "./modal";

const BebanHarian = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { getBebanList, bebanList } = bebanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBebanList({ tanggal: "2022-10-13" });
  }, []);

  return (
    <>
      <ModalSetBebanHarian />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Beban Harian</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <Typography variant="h6">Daftar File Laporan</Typography>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <EditIcon />
                    Ubah Data
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
                <Table style={{ width: "auto", tableLayout: "auto" }}>
                  <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColoe: "red", minWidth: "200px" }}
                        size="small"
                        rowSpan={2}
                      >
                        Jenis Pembangkit
                      </TableCell>
                      <TableCell
                        size="small"
                        rowSpan={2}
                        style={{ minWidth: "200px" }}
                      >
                        Pembangkit
                      </TableCell>
                      {time.map((value) => (
                        <TableCell size="small" align="center" colSpan={2}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {time.map(() => (
                        <>
                          <TableCell size="small">MW</TableCell>
                          <TableCell size="small">MX</TableCell>
                        </>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bebanList.map((value: Beban) => {
                      const totalPembangkit = value?.pembangkit.total;

                      return (
                        <>
                          <TableRow>
                            <TableCell
                              size="small"
                              sx={{
                                background: value?.color,
                                color: "#FFFFFF",
                                fontSize: "14px",
                                fontWeight: "700 !important",
                              }}
                              colSpan={time.length * 2 + 2}
                            >
                              {value?.sub_sistem}
                            </TableCell>
                          </TableRow>

                          {value?.pembangkit.tipe_jenis_pembangkit.map(
                            (tipe_jenis_pembangkit: TipeJenisPembangkit) => (
                              <>
                                {tipe_jenis_pembangkit?.kategori_pembangkit.map(
                                  (kategori_pembangkit: KategoriPembangkit) => {
                                    const { total } = kategori_pembangkit;
                                    return (
                                      <>
                                        {kategori_pembangkit.data.map(
                                          (data: DataKategoriPembangkit) => {
                                            return (
                                              <TableRow>
                                                <TableCell size="small">
                                                  <CustomChip
                                                    label={data.jenis}
                                                    skin="light"
                                                    color="primary"
                                                    size="small"
                                                  />
                                                </TableCell>
                                                <TableCell size="small">
                                                  {data.nama}
                                                </TableCell>
                                                {showValueBeban(data.data)}
                                              </TableRow>
                                            );
                                          }
                                        )}
                                        <TableRow
                                          sx={{
                                            background: total.color,
                                          }}
                                        >
                                          <TableCell colSpan={2} size="small">
                                            {total.nama}
                                          </TableCell>
                                          {showValueBeban(total?.data)}
                                        </TableRow>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            )
                          )}

                          {value?.ibt.map((ibt: IBT) => (
                            <>
                              {ibt.data.map((data: DataIBT) => (
                                <TableRow>
                                  <TableCell size="small">
                                    <CustomChip
                                      label={data.jenis}
                                      skin="light"
                                      color="primary"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell size="small">
                                    {data.nama}
                                  </TableCell>
                                  {showValueBeban(data?.data)}
                                </TableRow>
                              ))}
                              <TableRow sx={{ background: ibt.total.color }}>
                                <TableCell size="small" colSpan={2}>
                                  {ibt.total.nama}
                                </TableCell>
                                {showValueBeban(ibt.total?.data)}
                              </TableRow>
                            </>
                          ))}

                          <TableRow sx={{ background: totalPembangkit.color }}>
                            <TableCell colSpan={2} size="small">
                              {totalPembangkit.nama}
                            </TableCell>
                            {showValueBeban(totalPembangkit?.data)}
                          </TableRow>
                        </>
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
