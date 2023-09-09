import { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Pencil } from "mdi-material-ui";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { WrapperFilter } from "src/components/filter";
import { DataGrid } from "@mui/x-data-grid";
import { openModal } from "src/state/modal";

import { defaultColumns } from "./TableList.constant";
import dayjs, { Dayjs } from "dayjs";
import { selectData, selectType } from "../state/batubara";
import { CellType } from "src/types";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { batubaraApi } from "src/api/batubara";
import { BatubaraList } from "../types";
import { AbilityContext } from "src/layouts/components/acl/Can";

type TableListProps = {
  type: string;
};

const TableList = ({ type }: TableListProps) => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const filterDate = dayjs(date).format("YYYY-MM-DD");

  const { getBatubaraList, batubaraList } = batubaraApi();

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
          <IconButton
            onClick={() => {
              openModal("modal-add-batubara", row.id);
              selectData(row as BatubaraList);
              selectType(type);
            }}
          >
            <Pencil />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getBatubaraList({ tipe: type, tanggal: filterDate });
  }, [date]);

  useEffect(() => {
    if (reloadPageSnap.target === "batubara") {
      getBatubaraList({ tipe: type, tanggal: filterDate });
    }
  }, [reloadPageSnap.id]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <WrapperFilter>
            <TextField
              size="small"
              value={search}
              sx={{ mr: 6, mb: 2 }}
              placeholder="Cari"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              {ability?.can("create", "batubara-page") ? (
                <Button
                  sx={{ mb: 2 }}
                  onClick={() => {
                    openModal("modal-add-batubara");
                    selectType(type);
                  }}
                  variant="outlined"
                >
                  Tambah Data
                </Button>
              ) : null}
            </div>
          </WrapperFilter>
          <DataGrid
            hideFooter
            autoHeight
            columns={columns}
            rows={batubaraList}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TableList;
