import { useState } from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
  TextField,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import Plus from "mdi-material-ui/Plus";

type SelectInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  size?: "small" | "medium";
};

const SelectInput = ({
  label,
  name,
  placeholder,
  options,
  size,
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
              size={size}
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
