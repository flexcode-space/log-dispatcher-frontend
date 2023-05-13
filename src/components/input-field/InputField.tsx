import { ReactNode } from "react";
import { FormControl, TextField, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

type InputFieldProps = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  InputLabelProps?: object;
};

interface OutlinedInputFieldProps extends InputFieldProps {
  disabled?: boolean;
  Icon?: ReactNode;
}

export const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  disabled,
  InputLabelProps,
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
            disabled={disabled}
            InputLabelProps={InputLabelProps}
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

export const OutlinedInputField = ({
  label,
  name,
  placeholder,
  type = "text",
  Icon,
  disabled,
}: OutlinedInputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <OutlinedInput
            value={value}
            onBlur={onBlur}
            label={label}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            endAdornment={
              <InputAdornment position="end">{Icon}</InputAdornment>
            }
          />
        )}
      />
      {errors[name] && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors[name].message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const TextArea = ({
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
            multiline
            minRows={3}
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
