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
import { defaultColumns, mockData } from "./CatatanPembangkitan.constant";

const CatatanPembangkitan = () => {
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
          <IconButton onClick={() => openModal("modal-catatan-pembangkit")}>
            <PencilOutline />
          </IconButton>
        );
      },
    },
  ];
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
                <IconButton>
                  <FilterIcon />
                </IconButton>
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
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Pembangkit Derating" />
            <CardContent>
              <DataGrid
                autoHeight
                rows={mockData()}
                columns={columns}
                hideFooter
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Pembangkit Outage" />
            <CardContent>
              <DataGrid
                autoHeight
                rows={mockData()}
                columns={columns}
                hideFooter
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Pembangkit RS, NC, Dll" />
            <CardContent>
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
