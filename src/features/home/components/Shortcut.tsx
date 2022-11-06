import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { Plus, ArrowRight } from "mdi-material-ui";
import Grid from "@mui/material/Grid";

export const Shortcut: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Box>
            <Box display="flex" justifyContent="space-between" mb="19px">
              <Typography variant="subtitle1">{title}</Typography>
              <ArrowRight />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">6</Typography>
              <Button variant="outlined" onClick={() => null}>
                <Plus sx={{ mr: 1 }} />
                Tambah
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
