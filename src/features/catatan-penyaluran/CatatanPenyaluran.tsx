import { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PencilOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { catatanPenyaluranApi } from "src/api/catatan-penyaluran";
import { selectData } from "src/state/catatanPenyaluran";
import { AddData } from "./add-data";
import { openModal, closeModal, modal } from "src/state/modal";
import { ModalEdit } from "./modal";
import { defaultColumns } from "./CatatanPenyaluran.constant";
import { CellType } from "src/types";
import { CatatanPenyaluranList } from "./types";
import { reloadPage } from "src/state/reloadPage";

const CatatanPembangkitan = () => {
  const modalSnap = useSnapshot(modal);
  const reloadPageSnap = useSnapshot(reloadPage);

  const { getCatatanPenyaluranList, catatanPenyaluranList } =
    catatanPenyaluranApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => {
        return (
          <IconButton
            onClick={() => {
              openModal("modal-catatan-penyaluran");
              selectData(row as CatatanPenyaluranList);
            }}
          >
            <PencilOutline />
          </IconButton>
        );
      },
    },
  ];

  const handleClose = () => {
    closeModal();
  };

  const getCatatanPenyaluran = () => {
    getCatatanPenyaluranList();
  };

  useEffect(() => {
    getCatatanPenyaluran();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "catatan-penyaluran") {
      getCatatanPenyaluran();
    }
  }, [reloadPageSnap.id]);

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
                      value={new Date()}
                      label="Pilih Tanggal"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField size="small" {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={catatanPenyaluranList}
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
