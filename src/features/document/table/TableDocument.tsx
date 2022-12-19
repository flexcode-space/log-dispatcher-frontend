import { useEffect } from "react";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import { DeleteOutline, EyeOutline, Download } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { CardHeader } from "src/components/card";
import { DataGrid } from "@mui/x-data-grid";
import { documentApi } from "src/api/document";
import { modal } from "src/state/modal";
import { defaultColumns } from "../Document.constant";
import { TypeDocument } from "../types";

export interface CellType {
  row: any;
}

type TableDocumentProps = {
  title: string;
  type: TypeDocument;
  filter?: {
    search?: string;
    tanggal?: string;
  };
};

const TableDocument = ({ title, type, filter }: TableDocumentProps) => {
  const modalSnapshot = useSnapshot(modal);
  const { getDocumentList, documentList, deleteDocument } = documentApi();

  const onClickDelete = async (id: string) => {
    await deleteDocument({ id });
  };

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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => window.open(row.url, "_blank", "noreferrer")}
            >
              <EyeOutline />
            </IconButton>
            <IconButton
              onClick={() => window.open(row.url, "_blank", "noreferrer")}
            >
              <Download />
            </IconButton>
            <IconButton>
              <DeleteOutline onClick={() => onClickDelete(row.id)} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const getDocument = () => {
    getDocumentList({ tipe: type });
  };

  useEffect(() => {
    getDocument();
  }, [type]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getDocument();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <DataGrid hideFooter autoHeight columns={columns} rows={documentList} />
      </CardContent>
    </Card>
  );
};

export default TableDocument;
