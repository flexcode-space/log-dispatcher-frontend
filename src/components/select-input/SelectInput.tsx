import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type SelectInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
};

const SelectInput = ({
  label,
  name,
  placeholder,
  options,
}: SelectInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value}
              onChange={onChange}
              autoFocus
              label={label}
              placeholder={placeholder}
            >
              {options?.map(({ value, label }, index) => (
                <MenuItem key={`key-${index}`} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
      {errors?.[name] && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors?.[name].message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
