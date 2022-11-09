import { Button } from "@mui/material";
import { OutlinedInputField } from "src/components/input-field";

type UploadComponentProps = {
  label: string;
  name: string;
  onChange: () => void;
};

export const UploadFile = ({ label, name, onChange }: UploadComponentProps) => {
  return (
    <OutlinedInputField
      name={name}
      label={label}
      Icon={
        <Button variant="outlined" component="label" style={{ maxHeight: 30 }}>
          Pilih File
          <input
            type="file"
            hidden
            // @ts-ignore
            onChange={onChange}
          />
        </Button>
      }
    />
  );
};
