import { Button, Grid, Typography } from "@mui/material";

import { OutlinedInputField } from "src/components/input-field";

type UploadFileProps = {
  title?: string;
};

type UploadComponentProps = {
  label: string;
  name: string;
};

const UploadComponent = ({ label, name }: UploadComponentProps) => {
  return (
    <Grid item xs={6} sm={6}>
      <OutlinedInputField
        name={name}
        label={label}
        Icon={
          <Button
            variant="outlined"
            component="label"
            style={{ maxHeight: 30 }}
          >
            Pilih File
            <input type="file" hidden onChange={() => null} />
          </Button>
        }
      />
    </Grid>
  );
};

const UploadFile = ({ title }: UploadFileProps) => {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography
          variant="subtitle1"
          sx={{ lineHeight: "2rem", fontWeight: "400" }}
        >
          {title}
        </Typography>
      </Grid>
      <UploadComponent name="w" label="MW" />
      <UploadComponent name="var" label="MVAR" />
    </>
  );
};

export default UploadFile;
