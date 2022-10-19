import { Button, Grid, Typography } from "@mui/material";

import { OutlinedInputField } from "src/components/input-field";

type UploadFileProps = {
  label: string;
  name: string;
};

export const UploadFile = ({ label, name }: UploadFileProps) => {
  return (
    <OutlinedInputField
      name={name}
      label={label}
      Icon={
        <Button variant="outlined" component="label" style={{ maxHeight: 30 }}>
          Pilih File
          <input type="file" hidden onChange={() => null} />
        </Button>
      }
    />
  );
};
