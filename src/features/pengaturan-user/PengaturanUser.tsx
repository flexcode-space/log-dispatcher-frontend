import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Pencil } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";
import { CardHeader } from "src/components/card";
import {
  admindefaultColumns,
  userdefaultColumns,
  datamock,
} from "./pengaturanUser.constant";
import ModalAdduser from "./modal/ModalAddUser";

const PengaturanUser = () => {
  const admincolumns = [
    ...admindefaultColumns,
    {
      flex: 0.15,
      minWidth: 50,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: () => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => null}>
            <Pencil />
          </IconButton>
        </Box>
      ),
    },
  ];
  const usercolumns = [
    ...userdefaultColumns,
    {
      flex: 0.15,
      minWidth: 50,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: () => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => null}>
            <Pencil />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <>
      <ModalAdduser />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={<Typography variant="h5">Pengaturan User</Typography>}
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal()}
                variant="contained"
              >
                Tambah
              </Button>
            </div>
          </WrapperFilter>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Super Admin" action={[]} />
            <CardContent>
              <DataGrid
                hideFooter
                autoHeight
                columns={admincolumns}
                rows={datamock}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 10 }}>
          <Card>
            <CardHeader title="User" action={[]} />
            <CardContent>
              <DataGrid
                hideFooter
                autoHeight
                columns={usercolumns}
                rows={datamock}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PengaturanUser;
