import { Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { AddData } from "./add-data";
import { ModalEdit } from "./modal";
import { TableList } from "./table-list";
import { useState } from "react";

const CatatanPembangkitan = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  const formatDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

  return (
    <>
      <ModalEdit />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Catatan Pembangkitan</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <AddData />
        </Grid>
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "baseline" }}>
            <TextField
              size="small"
              value=""
              sx={{ mr: 6, mb: 2 }}
              placeholder="Cari"
              // onChange={(e) => setSearch(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              {/* <Button
                sx={{ mb: 2 }}
                variant="outlined"
                // onClick={() => openModal()}
              >
                <IconButton>
                  <FilterIcon />
                </IconButton>
                Filter
              </Button> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicketMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField size="small" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </div>
          </WrapperFilter>
        </Grid>
        <TableList
          title="Pembangkit Derating"
          type="derating"
          date={formatDate}
        />
        <TableList title="Pembangkit Outage" type="outage" date={formatDate} />
        <TableList
          title="Pembangkit RS, NC, Dll"
          type="lain"
          date={formatDate}
        />
      </Grid>
    </>
  );
};

export default CatatanPembangkitan;
