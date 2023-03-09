import { useState } from "react";
import { Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { WrapperFilter } from "src/components/filter";
import { AddData } from "./add-data";
import { ModalEdit, ModalFilter, ModalDownload } from "./modal";
import { TableList } from "./table-list";
import { openModal } from "src/state/modal";
import { Filter } from "./types";
import { values } from "./modal/ModalFilter/ModalFilter.constant";

const CatatanPembangkitan = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [filter, setFilter] = useState<Filter>({
    derating: { ...values },
    outage: { ...values },
    lain: { ...values },
  });

  const formatDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

  return (
    <>
      <ModalDownload />
      <ModalEdit />
      <ModalFilter filter={filter} onChange={(value) => setFilter(value)} />
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicketMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
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
                size="small"
                sx={{ mb: 2 }}
                variant="outlined"
                onClick={() => openModal("modal-download")}
              >
                <IconButton>
                  <DownloadIcon />
                </IconButton>
                Download laporan
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        <TableList
          title="Pembangkit Derating"
          type="derating"
          date={formatDate}
          filter={filter.derating}
        />
        <TableList
          title="Pembangkit Outage"
          type="outage"
          date={formatDate}
          filter={filter.outage}
        />
        <TableList
          title="Pembangkit RS, NC, Dll"
          type="lain"
          date={formatDate}
          filter={filter.lain}
        />
      </Grid>
    </>
  );
};

export default CatatanPembangkitan;
