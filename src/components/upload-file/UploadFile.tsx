import { Button } from "@mui/material";
import { FieldPath, FieldValues } from "react-hook-form";
import { OutlinedInputField } from "src/components/input-field";

type UploadFileProps<T extends FieldValues> = {
  label: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: FieldPath<T>
  ) => void;
};

export const UploadFile = <T extends FieldValues>({
  label,
  name,
  onChange,
}: UploadFileProps<T>) => {
  return (
    <OutlinedInputField
      name={name}
      label={label}
      disabled={true}
      Icon={
        <Button variant="outlined" component="label" style={{ maxHeight: 30 }}>
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
  );
};
