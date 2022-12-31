import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { Plus, ArrowRight } from "mdi-material-ui";
import Grid from "@mui/material/Grid";

type ShortcutProps = {
  title: string;
  count: number;
  onClick: () => void;
};

export const Shortcut = ({ title, count, onClick }: ShortcutProps) => {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mb="19px"
              onClick={onClick}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="subtitle1">{title}</Typography>
              <ArrowRight />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{count}</Typography>
              <Button variant="outlined" onClick={onClick}>
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
