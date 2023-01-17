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

const cardPiketFasop = ({ data }: Props) => {
  // ** Vars
  const { title, chipColor, chipText, src } = data;

  return (
    <Card sx={{ overflow: "visible", position: "relative" }}>
      <CardContent sx={{ px: "10px !important" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
            <CustomChip
              skin="light"
              size="small"
              label={chipText}
              color={chipColor}
              sx={{ mb: 5.5, height: 20, fontWeight: 500, fontSize: "0.75rem" }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default cardPiketFasop;

cardPiketFasop.defaultProps = {
  trend: "positive",
  chipColor: "primary",
};
