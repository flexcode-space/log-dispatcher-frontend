import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { formatDecimalNumber } from "src/utils/number";

type CardProps = {
  title: string;
  value: number | string;
  imageUrl?: string;
};

const CardStatsCharacter = ({
  title,
  value,
  imageUrl = "/images/produksi-kwh.png",
}: CardProps) => {
  return (
    <Card sx={{ overflow: "visible", position: "relative" }}>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-beetwen" }}
          >
            <Grid item xs={9} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {title}
              </Typography>
              <Typography variant="subtitle1">Total Produksi</Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "24px", fontWeight: 500 }}
              >
                {value ? formatDecimalNumber(value as number, 2) + " kWh" : "-"}
              </Typography>
            </Grid>
            <Grid item>
              <img src={imageUrl} alt="test" height={105} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardStatsCharacter;
