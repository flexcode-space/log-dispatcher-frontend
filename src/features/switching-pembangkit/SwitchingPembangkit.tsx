import { useState, ChangeEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Card, CardContent, Button, Box } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { DatePicker } from "src/components/date-picker";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import FilterIcon from "src/assets/icons/filter-icon.svg";
import { openModal } from "src/state/modal";

import { StyledForm } from "src/components/form";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian } from "./modal";

const SwitchingPembangkit = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <ModalSetBebanHarian />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Switching Pembangkit</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 8 }}>
                <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                  Tambah Laporan
                </Typography>
              </Box>
              <FormProvider {...formMethods}>
                <StyledForm
                  noValidate
                  onSubmit={() => null}
                  sx={{ width: "100%" }}
                >
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={2.4}>
                      <SelectInput label="Lokasi" name="lokasi" options={[]} />
                    </Grid>
                    <Grid item xs={2.4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Tanggal" name="tanggal" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Tanggal" name="tanggal" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Tanggal" name="tanggal" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                      <SelectInput
                        label="Engergi Primer"
                        name="energi_primer"
                        options={[]}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <SelectInput label="BOPS" name="bops" options={[]} />
                    </Grid>

                    <Grid item xs={4}>
                      <SelectInput label="ACC" name="acc" options={[]} />
                    </Grid>

                    <Grid item xs={4}>
                      <SelectInput
                        label="Pembangkit"
                        name="pembangkit"
                        options={[]}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <InputField name="beban" label="Beban" />
                    </Grid>

                    <Grid item xs={4}>
                      <InputField name="keterangan" label="Keterangan" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" type="submit">
                        Tambah
                      </Button>
                    </Grid>
                  </Grid>
                </StyledForm>
              </FormProvider>
            </CardContent>
          </Card>
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
                    <FilterIcon />
                    Filter
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
                        Lokasi
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        DMN
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        TML
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Trafo
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
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
                      <TableCell size="small" align="center" colSpan={6}>
                        08.00
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={6}>
                        04.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={100}>Arus (A)</TableCell>
                      <TableCell>MW</TableCell>
                      <TableCell>MVAR</TableCell>
                      <TableCell>KWH</TableCell>
                      <TableCell width={100}>% I NOM</TableCell>
                      <TableCell width={120}>% I MAMPU</TableCell>
                      <TableCell width={100}>Arus (A)</TableCell>
                      <TableCell>MW</TableCell>
                      <TableCell>MVAR</TableCell>
                      <TableCell>KWH</TableCell>
                      <TableCell width={100}>% I NOM</TableCell>
                      <TableCell width={120}>% I MAMPU</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Semarang</TableCell>
                      <TableCell>Tanjung Jati</TableCell>
                      <TableCell>Trafo - 1</TableCell>
                      <TableCell>60</TableCell>
                      <TableCell>150/20</TableCell>
                      <TableCell>231</TableCell>
                      <TableCell>231</TableCell>
                      <TableCell>277,2</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                    </TableRow>
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

export default SwitchingPembangkit;
