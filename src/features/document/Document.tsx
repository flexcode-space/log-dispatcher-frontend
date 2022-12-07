import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";

import { listTable } from "./Document.constant";
import ModalAddDocument from "./modal/ModalAddDocument";
import { TableDocument } from "./table";

const Document = () => {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<any>(new Date());

  return (
    <>
      <ModalAddDocument />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">Informasi Dokumen Terkendali</Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
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
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal()}
                variant="contained"
              >
                Unggah Dokumen
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        {listTable.map((value) => (
          <Grid item xs={12} key={`document-${value.title}`}>
            <TableDocument {...value} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Document;
