import { useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import { DeleteOutline, EyeOutline, Download } from "mdi-material-ui";
import { CardHeader } from "src/components/card";
import { DataGrid } from "src/components/table";
import { documentApi } from "src/api/document";

import { defaultColumns, datamock } from "../Document.constant";
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
  const { getDocumentList, documentList } = documentApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => null}>
            <EyeOutline />
          </IconButton>
          <IconButton onClick={() => null}>
            <Download />
          </IconButton>
          <IconButton>
            <DeleteOutline onClick={() => null} />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getDocumentList({ tipe: type });
  }, [type]);

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
