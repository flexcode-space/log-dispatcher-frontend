import { Grid, Typography, Button, IconButton } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { openModal } from "src/state/modal";
import ModalDownload from "./modal/ModalDownload";
import { TableInflow } from "./table-list";
import { TableGarung } from "./table-list/table-garung";

const Air = () => {
  return (
    <>
      <ModalDownload />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <PageHeader title={<Typography variant="h5">Air</Typography>} />
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableInflow />
        </Grid>
        <Grid item xs={12}>
          <TableGarung />
        </Grid>
      </Grid>
    </>
  );
};

export default Air;
