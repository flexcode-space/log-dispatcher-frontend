import { useState, ChangeEvent, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { openModal } from "src/state/modal";
import { WrapperFilter } from "src/components/filter";
import { ModalAddOLS } from "../modal";
import { defenseApi } from "src/api/defense";
import { useSnapshot } from "valtio";
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { defenseSchema, selectData } from "../state/defenseSchema";
import { DefenseSchemaList } from "../types";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { pencatatanDefenseApi } from "src/api/pencatatan-defense";
import dayjs, { Dayjs } from "dayjs";
import { ModalChangeStatus } from "../modal/modal-change-status";
import { MenuRealisasi } from "../components/menu-realisasi";
import { AbilityContext } from "src/layouts/components/acl/Can";

const OLS = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);
  const { data } = useSnapshot(defenseSchema);

  // ** States
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [realisasiField, setRealisasiField] = useState<"a" | "mw">("a");
  const [targetField, setTargetField] = useState<"a" | "mw">("a");
  const [setelahField, setSetelahField] = useState<"a" | "mw">("a");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const { getDefenseList, updateDefense, defenseList, loading, countData } =
    defenseApi();
  const { createPencatanDefense } = pencatatanDefenseApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const debouncedSearch = useDebounce(search, 500);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getOLSList = () => {
    const time = date ? dayjs(date).format("HH:mm") : "";
    if (debouncedSearch) {
      getDefenseList("ols", {
        jam: time,
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getDefenseList("ols", { jam: time, page: page + 1, limit: rowsPerPage });
    }
  };

  const onClickStatus = async (keterangan: string) => {
    await updateDefense("ols", {
      ...data,
      status: !data?.status,
      tanggal: dayjs(data?.tanggal).format("YYYY-MM-DD"),
    }).then(async () => {
      await createPencatanDefense("ols", {
        keterangan: keterangan,
        lokasi: data?.gardu_induk?.nama,
        status: !data?.status,
        subsistem: data?.sub_sistem.nama,
        tahap: data?.tahap.value,
        trip: data?.peralatan_target.nama,
      });
    });

    setReloadPage("ols");
  };

  useEffect(() => {
    getOLSList();
  }, [debouncedSearch, page, rowsPerPage, date]);

  useEffect(() => {
    if (reloadPageSnap.target === "ols") {
      getOLSList();
    }
  }, [reloadPageSnap]);

  return (
    <>
      <ModalAddOLS />
      <ModalChangeStatus onSubmitStatus={onClickStatus} />
      <Grid container spacing={6}>
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
                    <TimePicker
                      value={date}
                      ampm={false}
                      label="Realisasi Jam"
                      onChange={(e) => setDate(e)}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "200px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {ability?.can("create", "defense-schema-page") ? (
                    <Button
                      sx={{ mb: 2 }}
                      variant="contained"
                      onClick={() => openModal("modal-add-ols")}
                      size="small"
                    >
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                      Tambah OLS
                    </Button>
                  ) : null}
                </div>
              </WrapperFilter>
              <TableContainer>
                {loading ? (
                  <FallbackSpinner />
                ) : (
                  <Table>
                    <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                      <TableRow>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Lokasi OLS
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Tahap
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={3}
                        >
                          Setting
                        </TableCell>
                        <TableCell variant="head" size="small" rowSpan={2}>
                          Target Trip
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          rowSpan={2}
                        >
                          Keterangan
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={2}
                        >
                          Realisasi
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={2}
                        >
                          Beban Target Trip
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          colSpan={2}
                        >
                          Beban Stlh Ols Kerja
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          rowSpan={2}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          variant="head"
                          size="small"
                          align="center"
                          rowSpan={2}
                        >
                          Aksi
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head">AMP</TableCell>
                        <TableCell variant="head">Detik</TableCell>
                        <TableCell variant="head">MW</TableCell>
                        <TableCell variant="head" width="90px">
                          <Box
                            display="flex"
                            alignItems="center"
                            alignContent="center"
                          >
                            {realisasiField === "a" ? "I (A)" : "MW"}
                            <MenuRealisasi
                              onChange={(value) => setRealisasiField(value)}
                            />
                          </Box>
                        </TableCell>
                        <TableCell variant="head">% ols</TableCell>
                        <TableCell variant="head" width="90px">
                          <Box
                            display="flex"
                            alignItems="center"
                            alignContent="center"
                          >
                            {targetField === "a" ? "I (A)" : "MW"}
                            <MenuRealisasi
                              onChange={(value) => setTargetField(value)}
                            />
                          </Box>
                        </TableCell>
                        <TableCell variant="head">%</TableCell>
                        <TableCell variant="head" width="90px">
                          <Box
                            display="flex"
                            alignItems="center"
                            alignContent="center"
                          >
                            {setelahField === "a" ? "I (A)" : "MW"}
                            <MenuRealisasi
                              onChange={(value) => setSetelahField(value)}
                            />
                          </Box>
                        </TableCell>
                        <TableCell variant="head">%</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {defenseList.length > 0 &&
                        defenseList.map((list: DefenseSchemaList) => (
                          <>
                            <TableRow>
                              <TableCell
                                sx={{
                                  background: "#d6ebf0",
                                  fontWeight: 500,
                                  fontSize: "20px",
                                }}
                                size="small"
                                colSpan={20}
                              >
                                {list.sub_sistem}
                              </TableCell>
                            </TableRow>
                            {list?.data.map((data) => {
                              return (
                                <>
                                  <TableRow hover key={data.id}>
                                    <TableCell size="small">
                                      {`${data.peralatan?.nama} & ${data?.peralatan2?.nama}`}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.tahap.value}
                                    </TableCell>
                                    <TableCell
                                      size="small"
                                      sx={{ background: "#d6ebf0" }}
                                    >
                                      {data.amp.value}
                                    </TableCell>
                                    <TableCell
                                      size="small"
                                      sx={{ background: "#d6ebf0" }}
                                    >
                                      {data.detik}
                                    </TableCell>
                                    <TableCell
                                      size="small"
                                      sx={{ background: "#d6ebf0" }}
                                    >
                                      {data.mw}
                                    </TableCell>
                                    <TableCell size="small">
                                      {`${data?.gardu_induk.nama}_${data?.peralatan_target?.nama}`}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.keterangan}
                                    </TableCell>
                                    <TableCell size="small">
                                      {realisasiField === "a"
                                        ? data.real_ia
                                        : data?.real_mw}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.real_ols}
                                    </TableCell>
                                    <TableCell size="small">
                                      {targetField === "a"
                                        ? data.target_ia
                                        : data.target_mw}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.target_ols}
                                    </TableCell>
                                    <TableCell size="small">
                                      {setelahField === "a"
                                        ? data.set_ia
                                        : data?.set_mw}
                                    </TableCell>
                                    <TableCell size="small">
                                      {data.set_ols}
                                    </TableCell>
                                    <TableCell size="small">
                                      <Button
                                        variant="contained"
                                        onClick={() => {
                                          if (
                                            ability?.cannot(
                                              "update",
                                              "defense-schema-page"
                                            )
                                          )
                                            return;
                                          selectData(data);
                                          openModal(
                                            "modal-change-status",
                                            data.status
                                              ? "Nonaktifkan"
                                              : "Aktifkan"
                                          );
                                        }}
                                        sx={{
                                          color: "white !important",
                                          bgcolor: data.status
                                            ? "#72E128"
                                            : "#FF4D49",
                                        }}
                                      >
                                        {data.status ? "ON" : "OFF"}
                                      </Button>
                                    </TableCell>
                                    <TableCell size="small">
                                      {ability?.can(
                                        "update",
                                        "defense-schema-page"
                                      ) ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <IconButton
                                            onClick={() => {
                                              openModal(
                                                "modal-add-ols",
                                                data.id
                                              );
                                              selectData(data);
                                            }}
                                          >
                                            <PencilOutline />
                                          </IconButton>
                                        </Box>
                                      ) : null}
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                          </>
                        ))}
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

export default OLS;
