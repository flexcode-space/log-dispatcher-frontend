import { useState, ChangeEvent, useEffect, useMemo, useContext } from "react";

import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Card, CardContent, Button, IconButton, Box } from "@mui/material";
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
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import FilterIcon from "src/assets/icons/filter-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";

import { WrapperFilter } from "src/components/filter";
import {
  // ModalSetBebanHarian,
  ModalDownload,
  ModalFilter,
} from "./modal";
import { bebanApi } from "src/api/beban";
import { showValueBeban } from "./BebanPenghantarHarian.constant";
import { BebanPenghantarHarian } from "./types";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { FormProvider, useForm } from "react-hook-form";
import { StyledForm } from "src/components/form";
import { InputField } from "src/components/input-field";
import { penghantarApi } from "src/api/penghantar";
import { AbilityContext } from "src/layouts/components/acl/Can";

const BebanPenghantarHarian = () => {
  const ability = useContext(AbilityContext);

  // ** States
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [date, setDate] = useState<any>(new Date());
  const [filterTable, setFilterTable] = useState<string[]>([
    "i_nom",
    "mw",
    "mvar",
    "kwh",
    "percent_i_nom",
    "i_mampu",
  ]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    getBebanPenghantarHarianList,
    bebanPenghantarList,
    loading,
    countData,
  } = bebanApi();

  const { updatePenghantar } = penghantarApi();

  const debouncedSearch = useDebounce(search, 500);

  const formMethods = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      Object.values(values).forEach(async (value, index) => {
        if (typeof value?.arus_mampu === "string") {
          const data = bebanPenghantarList[index] as BebanPenghantarHarian;
          const { scada_b_1, scada_b_2, scada_b_3, amr_point, ...rest } =
            data.penghantar;

          const payload = {
            ...rest,
            id_amr: amr_point,
            scada: { b1: scada_b_1, b2: scada_b_2, b3: scada_b_3 },
            arus_mampu: Number(value?.arus_mampu),
          };
          await updatePenghantar(payload, true);
        }
      });
      setIsEdit(false);
      getBebanPenghantarHarian();
    })();
  };

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

  const renderRowTime = useMemo(
    () =>
      TIME.map(() => (
        <>
          {filterTable.includes("i_nom") && (
            <TableCellHead minWidth="80px">I (A)</TableCellHead>
          )}
          {filterTable.includes("mw") && <TableCellHead>mw</TableCellHead>}
          {filterTable.includes("mvar") && <TableCellHead>mvar</TableCellHead>}
          {filterTable.includes("kwh") && <TableCellHead>KWH</TableCellHead>}
          {filterTable.includes("percent_i_nom") && (
            <TableCellHead minWidth="100px">% i nom</TableCellHead>
          )}
          {filterTable.includes("i_mampu") && (
            <TableCellHead minWidth="120px">% i mampu</TableCellHead>
          )}
        </>
      )),
    [filterTable]
  );

  useEffect(() => {
    getBebanPenghantarHarian();
  }, [date, debouncedSearch, page, rowsPerPage]);

  return (
    <>
      {/* <ModalSetBebanHarian /> */}
      <ModalDownload />
      <ModalFilter
        onChange={(value) => setFilterTable(value)}
        value={filterTable}
      />
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
            <FormProvider {...formMethods}>
              <StyledForm sx={{ width: "100%" }} noValidate onSubmit={onSubmit}>
                <CardContent>
                  <WrapperFilter sx={{ alignItems: "baseline" }}>
                    {!isEdit ? (
                      <>
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
                          {ability?.can("update", "beban-penghantar-harian") ? (
                            <Button
                              sx={{ mb: 2 }}
                              variant="outlined"
                              onClick={() => setIsEdit(true)}
                            >
                              <EditIcon />
                              Ubah Arus Mampu
                            </Button>
                          ) : null}
                          <Button
                            sx={{ mb: 2 }}
                            variant="outlined"
                            onClick={() => openModal("modal-filter")}
                          >
                            <IconButton>
                              <FilterIcon />
                            </IconButton>
                            Filter
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
                      </>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "10px",
                        }}
                      >
                        <Button
                          onClick={() => setIsEdit(false)}
                          variant="outlined"
                        >
                          Batal
                        </Button>
                        <Button type="submit" variant="contained">
                          Simpan
                        </Button>
                      </div>
                    )}
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
                              I nom (A)
                            </TableCellHead>
                            <TableCellHead minWidth="150px" rowSpan={2}>
                              I Mampu (A)
                            </TableCellHead>
                            <TableCellHead minWidth="150px" rowSpan={2}>
                              Setting OCR
                            </TableCellHead>
                            {filterTable.length > 0 &&
                              TIME.map((value) => (
                                <TableCellHead
                                  align="center"
                                  colSpan={filterTable.length}
                                >
                                  {value}
                                </TableCellHead>
                              ))}
                          </TableRow>
                          <TableRow>{renderRowTime}</TableRow>
                        </TableHead>
                        <TableBody>
                          {bebanPenghantarList?.map(
                            (value: BebanPenghantarHarian, index) => {
                              const name = `[${index}].arus_mampu`;

                              formMethods.setValue(name, value?.arus_mampu, {
                                shouldDirty: true,
                              });
                              return (
                                <TableRow hover>
                                  <TableCell size="small">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell size="small">
                                    {value.upt}
                                  </TableCell>
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
                                  <TableCell sx={{ p: "0 !important" }}>
                                    <Box
                                      display={isEdit ? "" : "none"}
                                      sx={{
                                        "> .MuiFormControl-root": {
                                          mb: 0,
                                        },
                                      }}
                                    >
                                      <InputField type="number" name={name} />
                                    </Box>
                                    <Box
                                      display={isEdit ? "none" : ""}
                                      sx={{ px: "1rem" }}
                                    >
                                      {value.arus_mampu}
                                    </Box>
                                  </TableCell>
                                  <TableCell size="small">
                                    {value.setting_ocr}
                                  </TableCell>
                                  {showValueBeban(value.data, filterTable)}
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </TableContainer>
                  {!isEdit && (
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 25, 100]}
                      component="div"
                      count={countData}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </CardContent>
              </StyledForm>
            </FormProvider>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BebanPenghantarHarian;
