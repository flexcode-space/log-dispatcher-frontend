import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardHeader,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { dataMock, columns } from "./NeracaDaya.constant";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const NeracaDaya = () => {
  return (
    <Card sx={{ height: "500px" }}>
      <CardHeader
        title="Neraca Daya"
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{
          variant: "caption",
          sx: { color: "text.disabled" },
        }}
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          "& .MuiCardHeader-action": { mb: 0 },
          "& .MuiCardHeader-content": { mb: [2, 0] },
        }}
        action={
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Pilih Jam"
              ampm={false}
              value={new Date()}
              onChange={() => null}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" sx={{ mb: "5px", fontWeight: 700 }}>
              Subsistem Tanjungjati
            </Typography>
            <DataGrid autoHeight hideFooter rows={dataMock} columns={columns} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" sx={{ mb: "5px", fontWeight: 700 }}>
              Subsistem Tanjungjati
            </Typography>
            <DataGrid autoHeight hideFooter rows={dataMock} columns={columns} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" sx={{ mb: "5px", fontWeight: 700 }}>
              Subsistem Tanjungjati
            </Typography>
            <DataGrid autoHeight hideFooter rows={dataMock} columns={columns} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" sx={{ mb: "5px", fontWeight: 700 }}>
              Subsistem Tanjungjati
            </Typography>
            <DataGrid autoHeight hideFooter rows={dataMock} columns={columns} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NeracaDaya;
