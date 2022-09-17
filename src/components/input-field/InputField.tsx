import { FormControl, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
};

const InputField = ({ label, name, placeholder }: InputFieldProps) => {
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
          <TextField
            {...field}
            autoFocus
            label={label}
            placeholder={placeholder}
            style={{ width: "500px" }}
          />
        )}
      />
      {/* {errors.email && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.email.message}
        </FormHelperText>
      )} */}
    </FormControl>
  );
};

export default InputField;
