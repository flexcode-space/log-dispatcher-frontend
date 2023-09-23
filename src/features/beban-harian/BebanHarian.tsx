// ** React Imports
import { useState, ChangeEvent, useEffect, Fragment, useContext } from "react";

// ** MUI Imports
import DatePicketMui from "@mui/lab/DatePicker";
import { Card, CardContent, Button, IconButton } from "@mui/material";
import { Typography, TextField, Grid } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCellHead,
  TableCell,
  TableBody,
} from "src/components/table";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
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
import { showValueBeban } from "./BebanHarian.constant";
import {
  ModalDownload,
  ModalSetBebanHarian,
  ModalEditBebanHarian,
} from "./modal";
import { TIME } from "src/constants/time";
import FallbackSpinner from "src/@core/components/spinner";
import dayjs, { Dayjs } from "dayjs";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { AbilityContext } from "src/layouts/components/acl/Can";

const BebanHarian = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { getBebanList, bebanList, totalData, loading } = bebanApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBebanList({ tanggal: date ? dayjs(date).format("YYYY-MM-DD") : "" });
  }, [date]);

  useEffect(() => {
    if (reloadPageSnap.target === "beban-harian") {
      getBebanList({ tanggal: date ? dayjs(date).format("YYYY-MM-DD") : "" });
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <ModalSetBebanHarian />
      <ModalEditBebanHarian date={date} />
      <ModalDownload />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "center" }}>
            <Grid item>
              <Typography variant="h5">Beban Harian</Typography>
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicketMui
                  value={date}
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField size="small" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </WrapperFilter>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <Typography variant="h6">Daftar File Laporan</Typography>

                <div style={{ display: "flex", gap: "10px" }}>
                  {ability?.can("update", "beban-harian-page") ? (
                    <>
                      <Button
                        sx={{ mb: 2 }}
                        variant="outlined"
                        onClick={() => openModal("modal-edit")}
                      >
                        <EditIcon />
                        Ubah Data
                      </Button>
                      <Button
                        sx={{ mb: 2 }}
                        variant="outlined"
                        onClick={() => openModal("modal-beban-harian")}
                      >
                        Pindah SS
                      </Button>
                    </>
                  ) : null}
                  <Button
                    sx={{ mb: 2 }}
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
                  <Table style={{ width: "auto", tableLayout: "auto" }}>
                    <TableHead>
                      <TableRow>
                        <TableCellHead minWidth="200px" rowSpan={2}>
                          Jenis Pembangkit
                        </TableCellHead>
                        <TableCellHead minWidth="200px" rowSpan={2}>
                          Pembangkit
                        </TableCellHead>
                        {TIME.map((value) => (
                          <TableCellHead key={value} align="center" colSpan={2}>
                            {value}
                          </TableCellHead>
                        ))}
                      </TableRow>
                      <TableRow>
                        {TIME.map((value) => (
                          <Fragment key={value}>
                            <TableCellHead align="center">MW</TableCellHead>
                            <TableCellHead align="center">MX</TableCellHead>
                          </Fragment>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bebanList.length &&
                        bebanList.map((value: Beban, index) => {
                          const totalPembangkit = value?.pembangkit.total;
                          const totalSubsistem = value?.total;

                          return (
                            <Fragment key={`bebanlist-${index}`}>
                              <TableRow hover>
                                <TableCell
                                  size="small"
                                  sx={{
                                    background: value?.color,
                                    color: "#FFFFFF",
                                    fontSize: "14px",
                                    fontWeight: "700 !important",
                                  }}
                                  colSpan={TIME.length * 2 + 2}
                                >
                                  {value?.sub_sistem}
                                </TableCell>
                              </TableRow>

                              {value?.pembangkit?.tipe_jenis_pembangkit?.map(
                                (
                                  tipe_jenis_pembangkit: TipeJenisPembangkit,
                                  tipeIndex
                                ) => (
                                  <Fragment key={tipeIndex}>
                                    {tipe_jenis_pembangkit?.kategori_pembangkit.map(
                                      (
                                        kategori_pembangkit: KategoriPembangkit,
                                        kategoriIndex
                                      ) => {
                                        const { total } = kategori_pembangkit;
                                        return (
                                          <Fragment
                                            key={`kategori_pembangkit-${kategoriIndex}`}
                                          >
                                            {kategori_pembangkit.data.map(
                                              (
                                                data: DataKategoriPembangkit,
                                                indexData
                                              ) => {
                                                return (
                                                  <TableRow
                                                    key={`data-${indexData}`}
                                                    hover
                                                  >
                                                    <TableCell
                                                      size="small"
                                                      sx={{
                                                        borderRight:
                                                          "1px solid #4c4e641f",
                                                      }}
                                                    >
                                                      <CustomChip
                                                        label={data.jenis}
                                                        skin="light"
                                                        color="primary"
                                                        size="small"
                                                      />
                                                    </TableCell>
                                                    <TableCell
                                                      size="small"
                                                      sx={{
                                                        borderRight:
                                                          "1px solid #4c4e641f",
                                                      }}
                                                    >
                                                      {data.nama}
                                                    </TableCell>
                                                    {showValueBeban(data.data)}
                                                  </TableRow>
                                                );
                                              }
                                            )}
                                            <TableRow
                                              hover
                                              sx={{
                                                background: total.color,
                                              }}
                                            >
                                              <TableCell
                                                colSpan={2}
                                                size="small"
                                              >
                                                {total.nama}
                                              </TableCell>
                                              {showValueBeban(total?.data)}
                                            </TableRow>
                                          </Fragment>
                                        );
                                      }
                                    )}
                                  </Fragment>
                                )
                              )}

                              {value?.ibt &&
                                value?.ibt.map((ibt: IBT) => (
                                  <>
                                    {ibt.data.map((data: DataIBT) => (
                                      <TableRow hover>
                                        <TableCell
                                          size="small"
                                          sx={{
                                            borderRight: "1px solid #4c4e641f",
                                          }}
                                        >
                                          <CustomChip
                                            label={data.jenis}
                                            skin="light"
                                            color="primary"
                                            size="small"
                                          />
                                        </TableCell>
                                        <TableCell
                                          size="small"
                                          sx={{
                                            borderRight: "1px solid #4c4e641f",
                                          }}
                                        >
                                          {data.nama}
                                        </TableCell>
                                        {showValueBeban(data?.data)}
                                      </TableRow>
                                    ))}
                                    <TableRow
                                      hover
                                      sx={{ background: ibt.total.color }}
                                    >
                                      <TableCell size="small" colSpan={2}>
                                        {ibt.total.nama}
                                      </TableCell>
                                      {showValueBeban(ibt.total?.data)}
                                    </TableRow>
                                  </>
                                ))}

                              {value?.transfer &&
                                value?.transfer.map((transfer: IBT) => (
                                  <>
                                    {transfer.data.map((data: DataIBT) => (
                                      <TableRow hover>
                                        <TableCell
                                          size="small"
                                          sx={{
                                            borderRight: "1px solid #4c4e641f",
                                          }}
                                        >
                                          <CustomChip
                                            label={data.jenis}
                                            skin="light"
                                            color="primary"
                                            size="small"
                                          />
                                        </TableCell>
                                        <TableCell
                                          size="small"
                                          sx={{
                                            borderRight: "1px solid #4c4e641f",
                                          }}
                                        >
                                          {data.nama}
                                        </TableCell>
                                        {showValueBeban(data?.data)}
                                      </TableRow>
                                    ))}
                                    <TableRow
                                      hover
                                      sx={{ background: transfer?.total.color }}
                                    >
                                      <TableCell size="small" colSpan={2}>
                                        {transfer?.total?.nama}
                                      </TableCell>
                                      {showValueBeban(transfer?.total?.data)}
                                    </TableRow>
                                  </>
                                ))}

                              <TableRow
                                hover
                                sx={{ background: totalPembangkit.color }}
                              >
                                <TableCell colSpan={2} size="small">
                                  {totalPembangkit?.nama}
                                </TableCell>
                                {showValueBeban(totalPembangkit?.data)}
                              </TableRow>

                              {/* total subsistem */}
                              {totalSubsistem?.nama && (
                                <TableRow
                                  hover
                                  // sx={{ background: totalSubsistem.color }}
                                >
                                  <TableCell colSpan={2} size="small">
                                    {totalSubsistem?.nama}
                                  </TableCell>
                                  {showValueBeban(totalSubsistem?.data)}
                                </TableRow>
                              )}
                            </Fragment>
                          );
                        })}
                      {totalData && (
                        <TableRow hover sx={{ background: totalData?.color }}>
                          <TableCell colSpan={2} size="small">
                            {totalData?.nama}
                          </TableCell>
                          {showValueBeban(totalData?.data)}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
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
