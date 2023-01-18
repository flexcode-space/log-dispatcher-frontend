import { Grid, Typography, Button } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";

import { listTable } from "./Document.constant";
import ModalAddDocument from "./modal/ModalAddDocument";
import { TableDocument } from "./table";

const Document = () => {
  return (
    <>
      <ModalAddDocument />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={6}>
              <PageHeader
                title={
                  <Typography variant="h5">
                    Informasi Dokumen Terkendali
                  </Typography>
                }
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal("modal-add-document")}
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
