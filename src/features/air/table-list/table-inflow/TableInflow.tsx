import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyledForm } from "src/components/form";
import { InputField } from "src/components/input-field";
import {
  TableHead,
  TableCellHead,
  TableContainer,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "src/components/table";
import { TIME } from "src/constants/time";
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import { LocalizationProvider } from "@mui/lab";
import { Box, Card, CardContent, Button, TextField } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dayjs, { Dayjs } from "dayjs";
import { pemakaianAir } from "./TableInflow.constant";
import { airApi } from "src/api/airApi";

type ListType = {
  id: string;
  nama: string;
  tipe: string;
  data: [];
};

const TableInflow = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs("2022-12-29"));
  const [search, setSearch] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { getAirList, airList } = airApi();

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const filterValueByName = (name: string): ListType =>
    airList.filter((list: ListType) => list.nama === name)[0];

  useEffect(() => {
    getAirList({ tipe: "inflow", tanggal: dayjs(date).format("YYYY-MM-DD") });
  }, []);

  return (
    <Card>
      <FormProvider {...formMethods}>
        <StyledForm sx={{ width: "100%" }} noValidate onSubmit={() => null}>
          <CardHeader
            title="Inflow & Elevasi MRICA"
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
                      variant="contained"
                    >
                      Edit Data
                    </Button>
                  ) : (
                    <>
                      <Button
                        sx={{ mb: 2 }}
                        onClick={() => setIsEdit(false)}
                        variant="contained"
                      >
                        Batal
                      </Button>
                      <Button
                        sx={{ mb: 2 }}
                        onClick={() => setIsEdit(true)}
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
                    <TableCellHead size="small" minWidth="300px" rowSpan={2}>
                      Keadaan Air
                    </TableCellHead>
                    {TIME.map((value, index) => {
                      if (index % 2) {
                        return (
                          <TableCellHead minWidth="150px" key={index}>
                            {value}
                          </TableCellHead>
                        );
                      }
                    })}
                    <TableCellHead minWidth="150px">Rata - Rata</TableCellHead>
                    <TableCellHead minWidth="150px">Max</TableCellHead>
                    <TableCellHead minWidth="150px">Min</TableCellHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pemakaianAir.map((value) => {
                    const list = filterValueByName(value);
                    console.log("list", list?.data);
                    return (
                      <TableRow key={value}>
                        <TableCell>{value}</TableCell>
                        {TIME.map((time, index) => {
                          const mw = "mw_" + time.replace(".", "");

                          console.log(
                            "time",
                            list?.data ? (list.data as any)[mw] : "-"
                          );

                          if (index % 2) {
                            return (
                              <TableCell key={index} sx={{ p: "0 !important" }}>
                                <Box
                                  display={isEdit ? "" : "none"}
                                  sx={{
                                    "> .MuiFormControl-root": {
                                      mb: 0,
                                    },
                                  }}
                                >
                                  <InputField
                                    type="number"
                                    name={`mw_${time}`}
                                  />
                                </Box>
                                <Box
                                  display={isEdit ? "none" : ""}
                                  sx={{ px: "1rem" }}
                                >
                                  {list?.data ? (list.data as any)[mw] : null}
                                </Box>
                              </TableCell>
                            );
                          }
                        })}
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
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
  );
};

export default TableInflow;
