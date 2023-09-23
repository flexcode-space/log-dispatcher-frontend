import { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, TextField } from "@mui/material";
import { DeleteOutline, EyeOutline, Download } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { CardHeader } from "src/components/card";
import { DataGrid } from "@mui/x-data-grid";
import { documentApi } from "src/api/document";
import { modal } from "src/state/modal";
import { defaultColumns } from "../Document.constant";
import { TypeDocument } from "../types";
import { useDebounce } from "src/hooks/useDebounce";
import { AbilityContext } from "src/layouts/components/acl/Can";

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
  const ability = useContext(AbilityContext);

  const modalSnapshot = useSnapshot(modal);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

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
            {ability?.can("read", "document") ? (
              <IconButton
                onClick={() => window.open(row.url, "_blank", "noreferrer")}
              >
                <Download />
              </IconButton>
            ) : null}
            {ability?.can("delete", "document-page") ? (
              <IconButton>
                <DeleteOutline onClick={() => onClickDelete(row.id)} />
              </IconButton>
            ) : null}
          </Box>
        );
      },
    },
  ];

  const getDocument = () => {
    if (debouncedSearch) {
      getDocumentList({ search, tipe: type });
    } else {
      getDocumentList({ tipe: type });
    }
  };

  useEffect(() => {
    getDocument();
  }, [type, debouncedSearch]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getDocument();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <TextField
            size="small"
            value={search}
            sx={{ mr: 6, mb: 2 }}
            placeholder="Cari"
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
      <CardContent>
        <DataGrid hideFooter autoHeight columns={columns} rows={documentList} />
      </CardContent>
    </Card>
  );
};

export default TableDocument;
