import { Button, Grid, Typography } from "@mui/material";
import { FieldPath } from "react-hook-form";
import { OutlinedInputField } from "src/components/input-field";
import { FieldValues } from "../../types";

type UploadFileProps = {
  title?: string;
  name: string;
  jenis: string;
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
        disabled={true}
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

const UploadFile = ({ title, name, onChange, jenis }: UploadFileProps) => {
  const label_w = jenis === "mw-mvar" ? "MW" : "KW";
  const label_var = jenis === "mw-mvar" ? "MVAR" : "KVAR";

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
      <UploadComponent onChange={onChange} name={`${name}.w`} label={label_w} />
      <UploadComponent
        onChange={onChange}
        name={`${name}.var`}
        label={label_var}
      />
    </>
  );
};

export default UploadFile;
