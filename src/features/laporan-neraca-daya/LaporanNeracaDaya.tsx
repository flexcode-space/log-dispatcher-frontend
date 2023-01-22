import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Pencil } from "mdi-material-ui";
import dayjs, { Dayjs } from "dayjs";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { modal, openModal } from "src/state/modal";
import { CardHeader } from "src/components/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import { ModalAdd, ModalFilter } from "./modal";
import { ModalGenerateLaporan } from "src/components/modal";
import { laporanNeracaDayaApi } from "src/api/laporan-neraca-daya";
import { LaporanNeracaDayaList } from "./types";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { selectData } from "./state/laporanNeracaDaya";

const LaporanNeracaDaya = () => {
  const modalSnapshot = useSnapshot(modal);
  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [filterGenerate, setFilterGenerate] = useState<{
    tanggal: Dayjs | null;
    jam: Dayjs | null;
  }>({
    tanggal: null,
    jam: null,
  });

  const filterDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

  const {
    getLaporanNeracaDayaList,
    laporanNeracaDayaList,
    getLaporanNeracaDayaGenerate,
    laporanNeracaDayaGenerateList,
  } = laporanNeracaDayaApi();

  const onChangeFilter = ({
    tanggal,
    jam,
  }: {
    tanggal: Dayjs | null;
    jam: Dayjs | null;
  }) => {
    setFilterGenerate({ tanggal, jam });
  };

  useEffect(() => {
    getLaporanNeracaDayaList({ tanggal: filterDate });
  }, [date]);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-neraca-daya") {
      getLaporanNeracaDayaList();
    }
  }, [reloadPageSnap.id]);

  useEffect(() => {
    if (modalSnapshot.target === "modal-generate-laporan") {
      getLaporanNeracaDayaGenerate({
        tanggal: filterGenerate?.tanggal
          ? dayjs(filterGenerate.tanggal).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        jam: filterGenerate?.jam
          ? dayjs(filterGenerate.jam).format("HH:mm")
          : "",
      });
    }
  }, [modalSnapshot.isOpen, filterGenerate]);

  return (
    <>
      <ModalAdd />
      <ModalFilter onChangeFilter={onChangeFilter} />
      <ModalGenerateLaporan
        value={laporanNeracaDayaGenerateList}
        title={`Laporan Neraca Daya ${filterGenerate.jam ? "(Per Jam)" : ""}`}
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={
                  <Typography variant="h5">Laporan Neraca Daya</Typography>
                }
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                size="small"
                value={search}
                sx={{ mb: 2 }}
                placeholder="Cari"
                onChange={(e) => setSearch(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={setDate}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal("modal-filter-neraca-daya")}
                variant="contained"
              >
                Generate Laporan
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Rencana Beban Subsistem"
              action={
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ height: "40px" }}
                  onClick={() => openModal("modal-neraca-daya")}
                >
                  Tambah Data
                </Button>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead>Tanggal</TableCellHead>
                      <TableCellHead>Subsistem</TableCellHead>
                      <TableCellHead>DM Pasok</TableCellHead>
                      <TableCellHead>IBT</TableCellHead>
                      <TableCellHead>Beban IBT</TableCellHead>
                      <TableCellHead>Pembangkit</TableCellHead>
                      <TableCellHead>Beban KIT</TableCellHead>
                      <TableCellHead minWidth={250}>Keterangan</TableCellHead>
                      <TableCellHead>Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {laporanNeracaDayaList.length > 0 &&
                      laporanNeracaDayaList.map(
                        (list: LaporanNeracaDayaList) => (
                          <TableRow key={list.id} hover>
                            <TableCell size="small">
                              {dayjs(list.tanggal).format("DD MMMM YYYY")}
                            </TableCell>
                            <TableCell size="small">
                              {list.sub_sistem.nama}
                            </TableCell>
                            <TableCell size="small">{list.dm_pasok}</TableCell>
                            <TableCell size="small">{list.ibt.nama}</TableCell>
                            <TableCell size="small">{list.beban_ibt}</TableCell>
                            <TableCell size="small">
                              {list.pembangkit.nama}
                            </TableCell>
                            <TableCell size="small">{list.beban_kit}</TableCell>
                            <TableCell size="small">
                              {list.keterangan}
                            </TableCell>
                            <TableCell size="small">
                              <IconButton
                                onClick={() => {
                                  openModal("modal-neraca-daya", list.id);
                                  selectData(list as LaporanNeracaDayaList);
                                }}
                              >
                                <Pencil />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LaporanNeracaDaya;
