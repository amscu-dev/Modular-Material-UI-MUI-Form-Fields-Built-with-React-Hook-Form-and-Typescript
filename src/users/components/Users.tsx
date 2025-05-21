import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { Schema } from "../types/schema";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { useEffect } from "react";

function Users() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Schema>();

  // Asta sau DevTool pentru a urmari datele din formular in timp real.
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={[
          { id: "1", label: "Califonia" },
          { id: "2", label: "Texas" },
          { id: "3", label: "Seattle" },
          { id: "4", label: "New Orlens" },
        ]}
      />
    </Stack>
  );
}

export default Users;
