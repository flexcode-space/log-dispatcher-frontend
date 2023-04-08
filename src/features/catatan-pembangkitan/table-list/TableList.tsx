import { Grid, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { PencilOutline } from "mdi-material-ui";
import { useEffect } from "react";
import catatanPembangkitanApi from "src/api/catatan-pembangkitan/catatanPembangkitanApi";
import { DataGrid } from "@mui/x-data-grid";
import { openModal } from "src/state/modal";
import { CellType } from "src/types";
import { useSnapshot } from "valtio";
import { defaultColumns } from "../CatatanPembangkitan.constant";
import { selectData } from "../state";
import { CatatanPembangkitanList, FilterProps } from "../types";
import { reloadPage } from "src/state/reloadPage";
import dayjs from "dayjs";

type TableListProps = {
  type: string;
  title: string;
  actionCard?: React.ReactNode;
  showAction?: boolean;
  date?: string;
  filter?: FilterProps;
};

const TableList = ({
  type,
  title,
  actionCard,
  showAction = true,
  date,
  filter,
}: TableListProps) => {
  const reloadPageSnap = useSnapshot(reloadPage);

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

  const getCatatanPembangkitan = () => {
    if (filter) {
      const { tanggal_mulai, tanggal_akhir, ...rest } = filter;

      const params = {
        ...rest,
        tipe: type,
        tanggal: date,
        tanggal_mulai: tanggal_mulai
          ? dayjs(tanggal_mulai).format("YYYY-MM-DD")
          : "",
        tanggal_akhir: tanggal_akhir
          ? dayjs(tanggal_akhir).format("YYYY-MM-DD")
          : "",
      };

      getCatatanPembangkitanList({ ...params });
    } else {
      getCatatanPembangkitanList({ tipe: type, tanggal: date });
    }
  };

  useEffect(() => {
    getCatatanPembangkitan();
  }, [filter, date]);

  useEffect(() => {
    if (reloadPage.target === "catatan-pembangkitan") {
      getCatatanPembangkitan();
    }
  }, [reloadPageSnap.id]);

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
