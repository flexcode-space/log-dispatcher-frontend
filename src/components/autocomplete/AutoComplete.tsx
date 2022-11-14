// ** React Imports
import { useState } from "react";

import { FormControl, TextField, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

interface FilmOptionType {
  year?: number;
  title: string;
  inputValue?: string;
}

type Options = { value: string | number; label: string; inputValue?: string };

type AutocompleteCreatableProps = {
  label: string;
  name: string;
  options: Options[];
};

const filter = createFilterOptions<Options>();

const AutocompleteCreatable = (props: AutocompleteCreatableProps) => {
  const { label, name, options } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  // ** State
  // const [value, setValue] = useState<FilmOptionType | null>(null);

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            freeSolo
            clearOnBlur
            value={value}
            selectOnFocus
            handleHomeEndKeys
            options={options}
            id="autocomplete-free-solo-with-text"
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            renderInput={(params) => <TextField {...params} label={label} />}
            // getOptionLabel={(option) => {
            //   if (typeof option === "string") {
            //     return option;
            //   }
            //   if ((option as Options).inputValue as string) {
            //     return (option as Options).inputValue as string;
            //   }

            //   return option.label as string;
            // }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                // setValue({
                //   title: newValue,
                // });
              } else if (newValue && (newValue as any).inputValue) {
                console.log("newValue", newValue.inputValue);
                // setValue({
                //   title: (newValue as any).inputValue,
                // });
              } else {
                // setValue(newValue);
              }
            }}
            filterOptions={(options: Options[], params: any) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some(
                (option: Options) => inputValue === option.label
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  label: `Tambahkan ${inputValue}`,
                  value: "",
                });
              }

              return filtered;
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default AutocompleteCreatable;
