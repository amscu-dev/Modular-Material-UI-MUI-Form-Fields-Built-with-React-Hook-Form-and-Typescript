import { FormProvider } from "react-hook-form";
import Users from "./Users";
import { useForm } from "react-hook-form";
import type { Schema } from "../types/schema";
import { schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

function UsersProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
}

export default UsersProvider;
