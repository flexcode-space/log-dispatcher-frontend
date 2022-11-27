import { useState, useCallback, useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import { DataGrid } from "src/components/table";
import { TIME } from "src/constants/time";

import { defaultColumns, datamock } from "./Air.constant";

const Air = () => {
  const [search, setSearch] = useState<string>("");

  const generateColumsTime = () => {
    const arrayTime: GridColumns<any> = [];

    TIME.map((value, index) => {
      if (index % 2) {
        arrayTime.push({
          flex: 0.25,
          minWidth: 80,
          field: `mw_${value}`,
          headerName: value,
        });
      }
    });
    return arrayTime;
  };

  console.log("datamock", datamock);

  const columns = useMemo(
    () => [
      {
        flex: 0.25,
        minWidth: 200,
        field: "keadaan_air",
        headerName: "Keadaan air",
      },
      ...generateColumsTime(),
      ...defaultColumns,
    ],
    []
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Air</Typography>} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="MRICA"
            action={
              <WrapperFilter>
                <TextField
                  size="small"
                  value={search}
                  sx={{ mr: 6, mb: 2, bgcolor: "#fff" }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePickerMui
                      value={null}
                      label="Pilih Tanggal"
                      onChange={() => null}
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
                    onClick={() => null}
                    variant="contained"
                  >
                    Edit Data
                  </Button>
                </div>
              </WrapperFilter>
            }
          />
          <CardContent>
            <DataGrid hideFooter autoHeight columns={columns} rows={datamock} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Air;
