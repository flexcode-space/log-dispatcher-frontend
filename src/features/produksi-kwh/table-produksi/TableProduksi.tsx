import { Card, CardContent } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { WrapperFilter } from "src/components/filter";
import { defaultColumns } from "./TableProduksi.constant";

export const TableProduksi: React.FC<{ title?: string; data: any }> = ({
  title,
  data,
}) => {
  return (
    <Card>
      <CardContent>
        <WrapperFilter sx={{ alignItems: "baseline" }}>
          <Typography variant="h6">{title}</Typography>

          <TextField
            size="small"
            value=""
            sx={{ mr: 6, mb: 2 }}
            placeholder="Cari"
            // onChange={(e) => setSearch(e.target.value)}
          />
        </WrapperFilter>
        <DataGrid
          hideFooter
          autoHeight
          rows={data}
          columns={defaultColumns}
        />
      </CardContent>
    </Card>
  );
};
