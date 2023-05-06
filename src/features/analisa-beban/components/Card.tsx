import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Data } from "src/api/analisa-beban/type";

type CardProps = {
  title: string;
  value?: Data;
};

const CardStatsCharacter = ({ title, value }: CardProps) => {
  return (
    <Card sx={{ overflow: "visible", position: "relative" }}>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-beetwen" }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 1.5, fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {`Puncak Siang ${value?.siang?.jam}`}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "24px", fontWeight: 500 }}
                  >
                    {`${value?.siang?.mw} MW`}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    {`Puncak Malam ${value?.malam?.jam || ""}`}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "24px", fontWeight: 500 }}
                  >
                    {`${value?.malam?.mw} MW`}
                  </Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardStatsCharacter;
