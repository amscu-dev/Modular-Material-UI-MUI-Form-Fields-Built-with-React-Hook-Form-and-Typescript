import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.object({
  name: z.string().min(1, { message: "This field is required!" }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((emailValue) => patterns.email.test(emailValue), {
      message: "Email is not valid!",
    }), // testam cu regex ul si returnam true sau false

  states: z.array(z.string()).min(1).max(2),
});

export type Schema = z.infer<typeof schema>;
