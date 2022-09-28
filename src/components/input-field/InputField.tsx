import { FormControl, TextField, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

export const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
}: InputFieldProps) => {
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
          <TextField
            type={type}
            value={value}
            onChange={onChange}
            autoFocus
            label={label}
            placeholder={placeholder}
          />
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
