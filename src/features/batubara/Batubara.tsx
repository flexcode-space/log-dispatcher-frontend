import { Button, Grid, IconButton, Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import ModalAddData from "./modal/ModalAddData";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { TableList } from "./table-list";
import { openModal } from "src/state/modal";
import ModalDownload from "./modal/ModalDownload";

const Batubara = () => {
  return (
    <>
      <ModalDownload />
      <ModalAddData />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <PageHeader
                title={<Typography variant="h5">Batubara</Typography>}
              />
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
        <TableList type="batubara" />

        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">HSD - MFO</Typography>} />
        </Grid>

        <TableList type="hsd" />
      </Grid>
    </>
  );
};

export default Batubara;
