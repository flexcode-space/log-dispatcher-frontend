// ** React Imports
import { useEffect, useState } from "react";

import { FormControl, TextField, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { switchingPembangkitApi } from "src/api/switching-pembangkit";
import { showValueBeban } from "src/features/beban-harian/BebanHarian.constant";

type Options = { value: string | number; label: string; inputValue?: string };

type AutoCompletePersonProps = {
  label: string;
  name: string;
};

const filter = createFilterOptions<Options>();

const AutoCompletePerson = (props: AutoCompletePersonProps) => {
  const { label, name } = props;

  const { getPersonList, personList } = switchingPembangkitApi();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log("personList", personList);

  const options: Options[] = personList.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  useEffect(() => {
    console.log("ini jalan");
    getPersonList();
  }, []);

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <Autocomplete
            freeSolo
            clearOnBlur
            value={value}
            options={options}
            selectOnFocus
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, newValue) => {
              // console.log("newValue", newValue);
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

              console.log(inputValue !== "" && !isExisting)
              if (inputValue !== "" && !isExisting) {
                console.log('masuk kesini')
                filtered.push({
                  inputValue,
                  label: `${inputValue}`,
                  value: "",
                });
              }

              console.log("filtered", filtered);

              return filtered;
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default AutoCompletePerson;
