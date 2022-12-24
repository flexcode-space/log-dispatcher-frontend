import { Grid, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { useEffect } from "react";
import catatanPembangkitanApi from "src/api/catatan-pembangkitan/catatanPembangkitanApi";
import { DataGrid } from "@mui/x-data-grid";
import { modal, openModal } from "src/state/modal";
import { CellType } from "src/types";
import { useSnapshot } from "valtio";
import { defaultColumns } from "../CatatanPembangkitan.constant";
import { selectData } from "../state";
import { CatatanPembangkitanList } from "../types";

type TableListProps = {
  type: string;
  title: string;
  actionCard?: React.ReactNode;
  showAction?: boolean;
};

const TableList = ({
  type,
  title,
  actionCard,
  showAction = true,
}: TableListProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { getCatatanPembangkitanList, catatanPembangkitanList } =
    catatanPembangkitanApi();

  const columns = [
    ...defaultColumns,
    ...(showAction
      ? [
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
                    selectData(row as CatatanPembangkitanList);
                  }}
                >
                  <PencilOutline />
                </IconButton>
              );
            },
          },
        ]
      : []),
  ];

  useEffect(() => {
    getCatatanPembangkitanList({ tipe: type });
  }, []);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getCatatanPembangkitanList({ tipe: type });
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={title} action={actionCard} />
        <CardContent>
          <DataGrid
            autoHeight
            rows={catatanPembangkitanList}
            columns={columns}
            hideFooter
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TableList;
