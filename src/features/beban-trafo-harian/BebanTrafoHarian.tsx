import { useState, ChangeEvent, useEffect, useMemo, Fragment } from "react";
import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Card, CardContent, Button, IconButton, Box } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import PageHeader from "src/@core/components/page-header";
import {
  TableHead,
  TableCellHead,
  TableRow,
  TableCell,
} from "src/components/table";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";
import { openModal } from "src/state/modal";
import { bebanApi } from "src/api/beban";
import { BebanTrafo } from "./types";
import { showValueBeban } from "./BebanTrafoHarian.constant";

import { WrapperFilter } from "src/components/filter";
import {
  // ModalSetBebanHarian,
  ModalDownload,
  ModalFilter,
} from "./modal";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { InputField } from "src/components/input-field";
import { FormProvider, useForm } from "react-hook-form";
import { StyledForm } from "src/components/form";

const BebanTrafoHarian = () => {
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

  const { getBebanTrafoList, bebanTrafoList, loading, countData } = bebanApi();

  const debouncedSearch = useDebounce(search, 500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formMethods = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO: integrate with BE
      console.log(values);
      setIsEdit(false);
    })();
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getBebanTrafo = () => {
    if (debouncedSearch) {
      getBebanTrafoList({
        tanggal: convertDate(date),
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getBebanTrafoList({
        tanggal: convertDate(date),
        page: page + 1,
        limit: rowsPerPage,
      });
    }
  };

  const renderRowTime = useMemo(
    () =>
      TIME.map((value) => (
        <Fragment key={`row-time-${value}`}>
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
        </Fragment>
      )),
    [filterTable]
  );

  useEffect(() => {
    getBebanTrafo();
  }, [date, debouncedSearch, rowsPerPage, page]);

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
            title={<Typography variant="h5">Beban Trafo Harian</Typography>}
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
                          <Button
                            sx={{ mb: 2 }}
                            variant="outlined"
                            onClick={() => setIsEdit(true)}
                          >
                            <EditIcon />
                            Ubah Arus Mampu
                          </Button>
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
                            <TableCellHead size="small" rowSpan={2}>
                              No
                            </TableCellHead>
                            <TableCellHead rowSpan={2} minWidth="200px">
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
                              I Nom (A)
                            </TableCellHead>
                            <TableCellHead rowSpan={2} minWidth="150px">
                              I Mampu (A)
                            </TableCellHead>
                            <TableCellHead rowSpan={2} minWidth="120px">
                              Setting OCR
                            </TableCellHead>
                            {filterTable.length > 0 &&
                              TIME.map((value) => (
                                <TableCellHead
                                  key={`head-${value}`}
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
                          {bebanTrafoList?.map((value: BebanTrafo, index) => {
                            const name = `[${index}].arus_mampu`;

                            formMethods.setValue(name, value?.arus_mampu, {
                              shouldDirty: true,
                            });

                            return (
                              <TableRow key={`row-${index}`} hover>
                                <TableCell size="small">{index + 1}</TableCell>
                                <TableCell size="small">{value.upt}</TableCell>
                                <TableCell size="small">
                                  {value.sub_sistem}
                                </TableCell>
                                <TableCell size="small">
                                  {value.gardu_induk}
                                </TableCell>
                                <TableCell size="small">
                                  {value.trafo}
                                </TableCell>
                                <TableCell size="small">{`${value.daya} MVA`}</TableCell>
                                <TableCell size="small">
                                  {value.rasio}
                                </TableCell>
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
                          })}
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

export default BebanTrafoHarian;
