import { useState } from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type SelectMultipleInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  size?: "small" | "medium";
};

const SelectMultipleInput = ({
  label,
  name,
  placeholder,
  options,
  size,
}: SelectMultipleInputProps) => {
  const [values, setValues] = useState<string[]>([]);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, ...otherOptions } }) => {
          return (
            <>
              <InputLabel>{label}</InputLabel>
              <Select
                multiple
                displayEmpty={true}
                size={size}
                value={values}
                onChange={(event: SelectChangeEvent<string[]>) => {
                  setValues(event.target.value as string[]);
                  onChange(event);
                }}
                autoFocus
                label={label}
                placeholder={placeholder}
                renderValue={(selected) => {
                  return (
                    selected
                      ?.map(
                        (option) =>
                          options?.filter((opt) => opt.value === option)[0]
                            .label
                      )
                      .join(", ") || ""
                  );
                }}
                MenuProps={MenuProps}
                {...otherOptions}
              >
                {options?.map(({ value, label }, index) => (
                  <MenuItem key={`key-${index}`} value={value}>
                    <Checkbox checked={values.indexOf(value as string) > -1} />
                    <ListItemText primary={label} />
                  </MenuItem>
                ))}
              </Select>
            </>
          );
        }}
      />
      {errors?.[name] && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors?.[name].message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectMultipleInput;
