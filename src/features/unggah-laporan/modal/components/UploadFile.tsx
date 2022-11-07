import { Button, Grid, Typography } from "@mui/material";
import { FieldPath } from "react-hook-form";
import { OutlinedInputField } from "src/components/input-field";
import { FieldValues } from "../../types";

type UploadFileProps = {
  title?: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: FieldPath<FieldValues>
  ) => void;
};

type UploadComponentProps = {
  label: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: FieldPath<FieldValues>
  ) => void;
};

const UploadComponent = ({ label, name, onChange }: UploadComponentProps) => {
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
            <input
              type="file"
              hidden
              // @ts-ignore
              onChange={(e) => onChange(e, name)}
            />
          </Button>
        }
      />
    </Grid>
  );
};

const UploadFile = ({ title, name, onChange }: UploadFileProps) => {
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
      <UploadComponent onChange={onChange} name={`${name}.w`} label="MW" />
      <UploadComponent onChange={onChange} name={`${name}.var`} label="MVAR" />
    </>
  );
};

export default UploadFile;
