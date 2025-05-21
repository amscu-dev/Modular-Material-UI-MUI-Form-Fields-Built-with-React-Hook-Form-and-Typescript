import { FormProvider } from "react-hook-form";
import Users from "./Users";
import { useForm } from "react-hook-form";
import type { Schema } from "../types/schema";
import { schema, defaultValues } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { DevTool } from "@hookform/devtools";

function UsersProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default UsersProvider;
