import { useState, ChangeEvent, useEffect } from "react";
import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Card, CardContent, Button, Box } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import { FormProvider, useForm } from "react-hook-form";
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
// import FilterIcon from "src/assets/icons/filter-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";
import { bebanApi } from "src/api/beban";
import { TeganganBusbar, Data } from "./types";
import { showValueBeban } from "./TeganganBusbar.constant";

import { WrapperFilter } from "src/components/filter";
import { ModalDownload, ModalSetBebanHarian } from "./modal";
import { convertDate } from "src/utils/date";
import { TIME } from "src/constants/time";
import { useDebounce } from "src/hooks/useDebounce";
import FallbackSpinner from "src/@core/components/spinner";
import { StyledForm } from "src/components/form";
import { InputField } from "src/components/input-field";

const TeganganBusbar = () => {
  // ** States
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [date, setDate] = useState<any>(new Date());
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { getTeganganBusbarList, teganganBusbarList, loading, countData } =
    bebanApi();

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

  const getTeganganBusbar = () => {
    if (debouncedSearch) {
      getTeganganBusbarList({
        tanggal: convertDate(date),
        search,
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getTeganganBusbarList({
        tanggal: convertDate(date),
        page: page + 1,
        limit: rowsPerPage,
      });
    }
  };

  useEffect(() => {
    getTeganganBusbar();
  }, [date, debouncedSearch, page, rowsPerPage]);

  return (
    <>
      <ModalSetBebanHarian />
      <ModalDownload />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Tegangan Busbar</Typography>}
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
                            onClick={() => openModal("modal-beban-harian")}
                          >
                            Set
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
                            <TableCellHead
                              size="small"
                              rowSpan={2}
                              minWidth="200px"
                            >
                              UPT
                            </TableCellHead>
                            <TableCellHead
                              size="small"
                              rowSpan={2}
                              minWidth="250px"
                            >
                              Subsistem
                            </TableCellHead>
                            <TableCellHead
                              size="small"
                              rowSpan={2}
                              minWidth="200px"
                            >
                              Gardu Induk
                            </TableCellHead>
                            <TableCellHead
                              size="small"
                              rowSpan={2}
                              minWidth="200px"
                            >
                              Tegangan operasi
                            </TableCellHead>
                            <TableCellHead
                              size="small"
                              rowSpan={2}
                              minWidth="150px"
                            >
                              Arus Nominal (A)
                            </TableCellHead>
                            <TableCellHead
                              size="small"
                              rowSpan={2}
                              minWidth="150px"
                            >
                              Arus Mampu (A)
                            </TableCellHead>
                            {TIME.map((value) => (
                              <TableCellHead
                                size="small"
                                align="center"
                                colSpan={2}
                              >
                                {value}
                              </TableCellHead>
                            ))}
                          </TableRow>
                          <TableRow>
                            {TIME.map(() => (
                              <>
                                <TableCellHead minWidth="120px" size="small">
                                  Busbar 1 (V)
                                </TableCellHead>
                                <TableCellHead minWidth="120px" size="small">
                                  Busbar 2 (V)
                                </TableCellHead>
                              </>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {teganganBusbarList?.map(
                            (value: TeganganBusbar, index) => {
                              const name = `[${index}].arus_mampu`;

                              formMethods.setValue(name, value?.arus_mampu, {
                                shouldDirty: true,
                              });

                              return (
                                <TableRow hover>
                                  <TableCell>
                                    {index + 1}
                                  </TableCell>
                                  <TableCell>
                                    {value.upt}
                                  </TableCell>
                                  <TableCell>
                                    {value.sub_sistem}
                                  </TableCell>
                                  <TableCell>
                                    {value.gardu_induk}
                                  </TableCell>
                                  <TableCell>
                                    {value.tegangan}
                                  </TableCell>
                                  <TableCell>
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
                                  {showValueBeban(value.data)}
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

export default TeganganBusbar;
