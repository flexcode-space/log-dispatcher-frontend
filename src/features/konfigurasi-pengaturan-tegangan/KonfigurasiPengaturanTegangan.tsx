import { Grid, Typography, Button, IconButton } from "@mui/material";
import { PlusCircleOutline } from "mdi-material-ui";
import FilterIcon from "src/assets/icons/filter-icon.svg";
import { openModal } from "src/state/modal";
import { ModalAdd } from "./modal";
import { WrapperFilter } from "src/components/filter";
import { TableList } from "./table-list";
import { TABLE_LIST } from "./KonfigurasiPengaturanTegangan.constant";

const KonfigurasiPengaturanTegangan = () => {
  return (
    <>
      <ModalAdd />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "baseline" }}>
            <Typography variant="h5">
              Konfigurasi Switching Tegangan Hari Khusus
            </Typography>
            <div style={{ display: "flex", gap: "10px", height: "45px" }}>
              <Button sx={{ mb: 2 }} variant="outlined">
                <IconButton>
                  <FilterIcon />
                </IconButton>
                Filter
              </Button>
              <Button
                sx={{ mb: 2 }}
                variant="contained"
                onClick={() => openModal("modal-add-konfigurasi")}
              >
                <IconButton>
                  <PlusCircleOutline sx={{ color: "#ffffff" }} />
                </IconButton>
                Tambah Konfigurasi
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        {TABLE_LIST.map(({ title, type }) => (
          <TableList key={type} title={title} type={type} />
        ))}
      </Grid>
    </>
  );
};

export default KonfigurasiPengaturanTegangan;
