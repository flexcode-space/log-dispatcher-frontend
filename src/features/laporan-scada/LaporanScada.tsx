import { Button, IconButton, Grid, Typography } from "@mui/material";
import FilterGreenIcon from "src/assets/icons/filter-green-icon.svg";
import { openModal } from "src/state/modal";
import { ModalAdd } from "./modal";
import { TableMonitoring } from "./table-monitoring";

const LaporanScada = () => {
  return (
    <>
      <ModalAdd />
      <Grid container spacing={6}>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Typography variant="h5">Laporan SCADA</Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="outlined" size="small" sx={{ height: "40px" }}>
              <IconButton>
                <FilterGreenIcon />
              </IconButton>
              Filter
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ height: "40px" }}
              onClick={() => openModal("modal-laporan-scada")}
            >
              Tambah Data
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableMonitoring type="oop" title="Monitoring Scada OOP" />
        </Grid>
        <Grid item xs={12}>
          <TableMonitoring
            type="tidak-sesuai"
            title="Monitoring Telemetering Tidak Sesuai"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LaporanScada;
