import { Card, CardContent } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { WrapperFilter } from "src/components/filter";
import { defaultColumns, mockDataMonitoring } from "../AnalisaBeban.constant";

export const TableMonitoring: React.FC<{ title: string }> = ({ title }) => {
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
          rows={mockDataMonitoring()}
          columns={defaultColumns}
        />
      </CardContent>
    </Card>
  );
};
