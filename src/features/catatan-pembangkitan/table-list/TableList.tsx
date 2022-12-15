import { Grid, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { useEffect } from "react";
import catatanPembangkitanApi from "src/api/catatan-pembangkitan/catatanPembangkitanApi";
import { DataGrid } from "src/components/table";
import { openModal } from "src/state/modal";
import { defaultColumns } from "../CatatanPembangkitan.constant";

type TableListProps = {
  type: string;
  title: string;
};

const TableList = ({ type, title }: TableListProps) => {
  const { getCatatanPembangkitanList, catatanPembangkitanList } =
    catatanPembangkitanApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: () => {
        return (
          <IconButton onClick={() => openModal("modal-catatan-pembangkit")}>
            <PencilOutline />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    getCatatanPembangkitanList({ tipe: type });
  }, []);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={title} />
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
