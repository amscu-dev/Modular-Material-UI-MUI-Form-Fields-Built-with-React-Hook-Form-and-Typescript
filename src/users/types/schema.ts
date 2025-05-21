import { z } from "zod";
import { patterns } from "../../constants";

// type Type1 = {};
// type Type2 = {};
// type Type3 = {};
// type Type4 = Type1 & (Type2 | Type3); -- discriminated union types

export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: "This field is required!" }),
      email: z
        .string()
        .min(1, { message: "This field is required" })
        .refine((emailValue) => patterns.email.test(emailValue), {
          message: "Email is not valid!",
        }), // testam cu regex ul si returnam true sau false

      states: z.array(z.string()).min(1).max(2),
      languagesSpoken: z.array(z.string()),
      gender: z.string().min(1),
      skills: z.array(z.string()).max(2),
      registrationDateAndTime: z.date(),
      salaryRange: z.array(z.number()).min(2).max(2),
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("update"), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),

        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
      }),
    ])
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  email: "",
  name: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  salaryRange: [0, 2000],
  isTeacher: false,
};
