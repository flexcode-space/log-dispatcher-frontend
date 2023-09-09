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
} from "./pengaturanUser.constant";
import ModalAdduser from "./modal/ModalAddUser";
import { pengaturanUserApi } from "src/api/pengaturan-user";
import { useContext, useEffect } from "react";
import { CellType } from "src/types";
import { selectData } from "./state/pengaturanUser";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { UserList } from "./types";
import { AbilityContext } from "src/layouts/components/acl/Can";

const PengaturanUser = () => {
  const ability = useContext(AbilityContext);

  // console.log('ability', ability.can('read', 'pengaturan-user-page'))

  const reloadPageSnap = useSnapshot(reloadPage);

  const { pengaturanUserList, loading, getPengaturanUser } =
    pengaturanUserApi();

  const superAdmin: UserList[] = [];
  const user: UserList[] = [];

  pengaturanUserList.forEach((list: UserList) => {
    if (list.hak === 1) {
      superAdmin.push(list);
    } else {
      user.push(list);
    }
  });

  const admincolumns = [
    ...admindefaultColumns,
    {
      flex: 0.15,
      minWidth: 50,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => (
        <>
          {ability?.can("update", "pengaturan-user-page") ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  openModal("modal-add-user", row.id);
                  selectData(row);
                }}
              >
                <Pencil />
              </IconButton>
            </Box>
          ) : null}
        </>
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
      renderCell: ({ row }: CellType) => (
        <>
          {ability?.can("update", "pengaturan-user-page") ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  openModal("modal-add-user", row.id);
                  selectData(row);
                }}
              >
                <Pencil />
              </IconButton>
            </Box>
          ) : null}
        </>
      ),
    },
  ];

  useEffect(() => {
    getPengaturanUser();
  }, [reloadPageSnap.id]);

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
            {ability?.can("create", "pengaturan-user-page") ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal("modal-add-user")}
                  variant="contained"
                >
                  Tambah
                </Button>
              </div>
            ) : null}
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
                rows={superAdmin}
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
                rows={user}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PengaturanUser;
