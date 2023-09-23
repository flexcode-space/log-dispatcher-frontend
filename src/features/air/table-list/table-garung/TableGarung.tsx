import { useContext, useEffect, useState } from "react";
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
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import { LocalizationProvider } from "@mui/lab";
import { Box, Card, CardContent, Button, TextField } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dayjs, { Dayjs } from "dayjs";
import { pemakaianAir, time_garung } from "./TableGarung.constant";
import { airApi } from "src/api/airApi";
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { useSnapshot } from "valtio";
import { AbilityContext } from "src/layouts/components/acl/Can";

type ListType = {
  id: string;
  nama: string;
  tipe: string;
  data: {
    average: number;
  };
};

const TableGarung = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [search, setSearch] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { getAirList, airList, createAir } = airApi();

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

        await createAir({
          nama: pemakaianAir[index],
          tanggal: dayjs(date).format("YYYY-MM-DD"),
          tipe: "garung",
          data: value,
        });
      });

      setIsEdit(false);
      setReloadPage("garung");
    })();
  };

  const filterValueByName = (name: string): ListType =>
    airList.filter((list: ListType) => list.nama === name)[0];

  useEffect(() => {
    getAirList({ tipe: "garung", tanggal: dayjs(date).format("YYYY-MM-DD") });
  }, [date]);

  useEffect(() => {
    if (reloadPageSnap.target === "garung") {
      getAirList({ tipe: "garung", tanggal: dayjs(date).format("YYYY-MM-DD") });
    }
  }, [date, reloadPageSnap.id]);

  return (
    <Card>
      <FormProvider {...formMethods}>
        <StyledForm sx={{ width: "100%" }} noValidate onSubmit={onSubmit}>
          <CardHeader
            title="Garung"
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

                  {ability?.can("update", "air-page") ? (
                    <>
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
                    </>
                  ) : null}
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
                    {time_garung.map((value, index) => {
                      return (
                        <TableCellHead minWidth="150px" key={index}>
                          {value}
                        </TableCellHead>
                      );
                    })}
                    <TableCellHead minWidth="150px">Rata - Rata</TableCellHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pemakaianAir.map((value, indexAir) => {
                    const list = filterValueByName(value);
                    return (
                      <TableRow key={value}>
                        <TableCell>{value}</TableCell>
                        {time_garung.map((time, index) => {
                          const mw = "mw_" + time.replace(".", "");

                          const name = `[${indexAir}].${mw}`;

                          formMethods.setValue(
                            name,
                            list?.data ? (list.data as any)[mw] : "",
                            { shouldDirty: true }
                          );

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
                                <InputField type="number" name={name} />
                              </Box>
                              <Box
                                display={isEdit ? "none" : ""}
                                sx={{ px: "1rem" }}
                              >
                                {list?.data ? (list.data as any)[mw] : null}
                              </Box>
                            </TableCell>
                          );
                        })}
                        <TableCell>{list?.data?.average}</TableCell>
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

export default TableGarung;
