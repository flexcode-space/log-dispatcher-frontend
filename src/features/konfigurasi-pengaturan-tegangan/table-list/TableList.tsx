import { Grid, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { useEffect } from "react";
import catatanPembangkitanApi from "src/api/catatan-pembangkitan/catatanPembangkitanApi";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";
import { DataGrid } from "src/components/table";
import { modal, openModal } from "src/state/modal";
import { reloadPage } from "src/state/reloadPage";
import { CellType } from "src/types";
import { useSnapshot } from "valtio";
import { defaultColumns } from "../KonfigurasiPengaturanTegangan.constant";
import { selectData } from "../state/konfigurasiPengaturanTegangan";
import { KonfigurasiPengaturanTegangan } from "../types";
// import { selectData } from "../state";
// import { CatatanPembangkitanList } from "../types";

type TableListProps = {
  type: string;
  title: string;
};

const TableList = ({ type, title }: TableListProps) => {
  const modalSnapshot = useSnapshot(modal);
  const reloadPageSnap = useSnapshot(reloadPage);

  const { getKonfigurasiList, konfigurasiList } = pengaturanTeganganApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 500,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => {
        return (
          <IconButton
            onClick={() => {
              openModal("modal-add-konfigurasi", row.id);
              selectData(row as KonfigurasiPengaturanTegangan);
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

  useEffect(() => {
    if (reloadPageSnap.target === "modal-add-konfigurasi") {
      getKonfigurasiList({ tipe: type });
    }
  }, [reloadPageSnap]);

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
