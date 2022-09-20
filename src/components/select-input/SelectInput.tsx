import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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
  } = useForm();

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={(field) => (
          <>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
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
    </FormControl>
  );
};

export default SelectInput;
