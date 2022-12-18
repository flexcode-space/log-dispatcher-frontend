import { Grid, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { useEffect } from "react";
import catatanPembangkitanApi from "src/api/catatan-pembangkitan/catatanPembangkitanApi";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";
import { DataGrid } from "src/components/table";
import { modal, openModal } from "src/state/modal";
import { CellType } from "src/types";
import { useSnapshot } from "valtio";
import { defaultColumns } from "../KonfigurasiPengaturanTegangan.constant";
// import { selectData } from "../state";
// import { CatatanPembangkitanList } from "../types";

type TableListProps = {
  type: string;
  title: string;
};

const TableList = ({ type, title }: TableListProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { getKonfigurasiList, konfigurasiList } = pengaturanTeganganApi();

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
              openModal("modal-catatan-pembangkit");
              // selectData(row as CatatanPembangkitanList);
            }}
          >
            <PencilOutline />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    getKonfigurasiList({ tipe: type });
  }, []);

  // useEffect(() => {
  //   if (modalSnapshot.isReloadData) {
  //     getCatatanPembangkitanList({ tipe: type });
  //   }
  // }, [modalSnapshot.isReloadData]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <DataGrid
            autoHeight
            rows={konfigurasiList}
            columns={columns}
            hideFooter
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TableList;
