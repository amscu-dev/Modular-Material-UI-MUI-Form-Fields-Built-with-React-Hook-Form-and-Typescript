import { Autocomplete } from "@mui/material";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Option = {};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
};

function RHFAutocomplete<T extends FieldValues>({ name }: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={(field, fieldState, formState) => (
        <Autocomplete options={options} />
      )}
    />
  );
}

export default RHFAutocomplete;
