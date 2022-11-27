import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "src/components/table";
import { PencilOutline } from "mdi-material-ui";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { CardHeader } from "src/components/card";
import { AddData } from "./add-data";
import { openModal, closeModal } from "src/state/modal";
import { ModalEdit } from "./modal";
import { defaultColumns, mockData } from "./CatatanPenyaluran.constant";

const CatatanPembangkitan = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: () => {
        return (
          <IconButton onClick={() => openModal()}>
            <PencilOutline />
          </IconButton>
        );
      },
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <ModalEdit handleClose={handleClose} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Catatan Penyaluran</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <AddData />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {/* <CardHeader title="Pembangkit Derating" /> */}
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2, bgcolor: "#ffffff" }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    // onClick={() => openModal()}
                  >
                    <FilterIcon />
                    Filter
                  </Button>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicketMui
                      value={new Date()}
                      label="Pilih Tanggal"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          fullWidth
                          sx={{ bgcolor: "#ffffff" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={mockData()}
                columns={columns}
                hideFooter
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CatatanPembangkitan;
