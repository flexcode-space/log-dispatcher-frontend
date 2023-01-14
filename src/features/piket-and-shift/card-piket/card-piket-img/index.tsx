import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";

// ** Types Imports
import { CardPiketProps } from "src/features/piket-and-shift/card-piket/types";

interface Props {
  data: CardPiketProps;
}

const CardPiket = ({ data }: Props) => {
  // ** Vars
  const { title, chipColor, chipText, src, stats, trend, trendNumber } = data;

  return (
    <Card sx={{ overflow: "visible", position: "relative" }}>
      <CardContent sx={{ pb: "0 " }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1.5, fontWeight: 600, whiteSpace: "nowrap" }}
            >
              {title}
            </Typography>
            <CustomChip
              skin="light"
              size="small"
              label={chipText}
              color={chipColor}
              sx={{ mb: 5.5, fontWeight: 500, fontSize: "0.75rem" }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={src || "/images/card-stats-img-1.png"}
              alt={title}
              height={95}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardPiket;

CardPiket.defaultProps = {
  trend: "positive",
  chipColor: "primary",
};
