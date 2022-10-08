import { FormControl, TextField, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

type DatePickerProps = {
  label: string;
  name: string;
};

export const DatePicker = ({ label, name }: DatePickerProps) => {
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicketMui
              value={value}
              label={label}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
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
