import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import {
  TableHead,
  TableCellHead,
  TableContainer,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "src/components/table";
import { TIME_GAS } from "./Gas.constant";
import { InputField } from "src/components/input-field";
import { FormProvider, useForm } from "react-hook-form";
import { StyledForm } from "src/components/form";
import { gasApi } from "src/api/gasApi";
import { setReloadPage, reloadPage } from "src/state/reloadPage";
import { GasList } from "./types";
import { useSnapshot } from "valtio";

const Gas = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [search, setSearch] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { createGas, getGasList, gasList } = gasApi();

  const formMethods = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      Object.values(values).map(async (value, index) => {
        Object.keys(value).map((key) => {
          value[key] = value[key] ? parseFloat(value[key]) : 0;
        });

        const payload = {
          ...value,
          jam: TIME_GAS[index],
          tanggal: dayjs(date).format("YYYY-MM-DD"),
        };

        await createGas(payload);
      });

      setIsEdit(false);
      setReloadPage("gas");
    })();
  };

  const filterValueByName = (name: string): GasList =>
    gasList?.filter((list: GasList) => list?.jam === name)[0];

  const styleBox = {
    "> .MuiFormControl-root": {
      mb: 0,
    },
  };

  useEffect(() => {
    getGasList({ tanggal: dayjs(date).format("YYYY-MM-DD") });
  }, [date]);

  useEffect(() => {
    if (reloadPageSnap.target === "gas") {
      getGasList({ tanggal: dayjs(date).format("YYYY-MM-DD") });
    }
  }, [date, reloadPageSnap.id]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Gas</Typography>} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <FormProvider {...formMethods}>
            <StyledForm sx={{ width: "100%" }} noValidate onSubmit={onSubmit}>
              <CardHeader
                title="Monitoring Gas"
                action={
                  <WrapperFilter>
                    <TextField
                      size="small"
                      value={search}
                      sx={{ mr: 6, mb: 2 }}
                      placeholder="Cari"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePickerMui
                          value={date}
                          label="Pilih Tanggal"
                          inputFormat="dd/M/yyyy"
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
                      {!isEdit ? (
                        <Button
                          sx={{ mb: 2 }}
                          onClick={() => setIsEdit(true)}
                          variant="outlined"
                        >
                          Edit Data
                        </Button>
                      ) : (
                        <>
                          <Button
                            sx={{ mb: 2, backgroundColor: "#6D788D" }}
                            onClick={() => setIsEdit(false)}
                            variant="contained"
                          >
                            Batal
                          </Button>
                          <Button
                            sx={{ mb: 2 }}
                            type="submit"
                            variant="contained"
                          >
                            Simpan
                          </Button>
                        </>
                      )}
                    </div>
                  </WrapperFilter>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCellHead rowSpan={2}>Jam</TableCellHead>
                        <TableCellHead align="center" colSpan={2}>
                          SPP
                        </TableCellHead>
                        <TableCellHead align="center" colSpan={4}>
                          KJG
                        </TableCellHead>
                        <TableCellHead align="center" colSpan={4}>
                          JTB
                        </TableCellHead>
                        <TableCellHead rowSpan={2}>Stock CNG</TableCellHead>
                        <TableCellHead rowSpan={2}>Compressor</TableCellHead>
                        <TableCellHead rowSpan={2}>
                          Flow Decanting
                        </TableCellHead>
                        <TableCellHead align="center" colSpan={2}>
                          estimasi cng decanting
                        </TableCellHead>
                      </TableRow>
                      <TableRow>
                        <TableCellHead>Tekanan (PSI)</TableCellHead>
                        <TableCellHead>Flow Sumur</TableCellHead>
                        <TableCellHead>Tekanan (PSI)</TableCellHead>
                        <TableCellHead>Flow Sumur</TableCellHead>
                        <TableCellHead>Flow Serap</TableCellHead>
                        <TableCellHead>Akumulasi</TableCellHead>
                        <TableCellHead>Tekanan (PSI)</TableCellHead>
                        <TableCellHead>Flow Sumur</TableCellHead>
                        <TableCellHead>Flow Serap</TableCellHead>
                        <TableCellHead>Akumulasi</TableCellHead>
                        <TableCellHead>Habis (Jam)</TableCellHead>
                        <TableCellHead>Daily Rate (Jam)</TableCellHead>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {TIME_GAS.map((time, index) => {
                        const list = filterValueByName(time);

                        formMethods.setValue(
                          `[${index}].spp_tekanan`,
                          list?.spp_tekanan
                        );
                        formMethods.setValue(
                          `[${index}].spp_flow`,
                          list?.spp_flow
                        );
                        formMethods.setValue(
                          `[${index}].kjg_tekanan`,
                          list?.kjg_tekanan
                        );
                        formMethods.setValue(
                          `[${index}].kjg_flow`,
                          list?.kjg_flow
                        );
                        formMethods.setValue(
                          `[${index}].kjg_serap`,
                          list?.kjg_serap
                        );
                        formMethods.setValue(
                          `[${index}].kjg_akumulasi`,
                          list?.kjg_akumulasi
                        );
                        formMethods.setValue(
                          `[${index}].jtb_tekanan`,
                          list?.jtb_tekanan
                        );
                        formMethods.setValue(
                          `[${index}].jtb_flow`,
                          list?.jtb_flow
                        );
                        formMethods.setValue(
                          `[${index}].jtb_serap`,
                          list?.jtb_serap
                        );
                        formMethods.setValue(
                          `[${index}].jtb_akumulasi`,
                          list?.jtb_akumulasi
                        );
                        formMethods.setValue(`[${index}].stock`, list?.stock);
                        formMethods.setValue(
                          `[${index}].compressor`,
                          list?.compressor
                        );
                        formMethods.setValue(
                          `[${index}].flow_decanting`,
                          list?.flow_decanting
                        );
                        formMethods.setValue(`[${index}].habis`, list?.habis);
                        formMethods.setValue(`[${index}].daily`, list?.daily);

                        return (
                          <TableRow hover key={time}>
                            <TableCell>{time}</TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].spp_tekanan`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.spp_tekanan}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].spp_flow`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.spp_flow}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].kjg_tekanan`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.kjg_tekanan}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].kjg_flow`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.kjg_flow}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].kjg_serap`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.kjg_serap}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].kjg_akumulasi`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.kjg_akumulasi}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].jtb_tekanan`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.jtb_tekanan}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].jtb_flow`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.jtb_flow}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].jtb_serap`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.jtb_serap}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].jtb_akumulasi`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.jtb_akumulasi}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].stock`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.stock}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].compressor`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.compressor}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].flow_decanting`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.flow_decanting}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].habis`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.habis}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "0 !important" }}>
                              <Box display={isEdit ? "" : "none"} sx={styleBox}>
                                <InputField
                                  type="number"
                                  name={`[${index}].daily`}
                                />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.daily}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </StyledForm>
          </FormProvider>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Gas;
