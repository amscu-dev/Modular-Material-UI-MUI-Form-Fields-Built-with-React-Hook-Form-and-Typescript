import { Button, Container, Stack, TextField } from "@mui/material";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { Schema } from "../types/schema";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { Fragment, useEffect } from "react";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/quaries";
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFTextField } from "../../components/RHFTextField";

function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

  const { watch, control, unregister } = useFormContext<Schema>();

  // Asta sau DevTool pentru a urmari datele din formular in timp real.
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  return (
    <Container maxWidth="sm" component="form">
      <Stack sx={{ gap: 2 }}>
        <RHFTextField<Schema> name="name" label="Name" />
        <RHFTextField<Schema> name="email" label="Email" />
        <RHFAutocomplete<Schema>
          name="states"
          label="States"
          options={statesQuery.data}
        />
        <RHFToggleButtonGroup<Schema>
          name="languagesSpoken"
          options={languagesQuery.data}
        />
        <RHFRadioGroup<Schema>
          name="gender"
          options={gendersQuery.data}
          label="Gender"
        />
        <RHFCheckbox<Schema>
          name="skills"
          options={skillsQuery.data}
          label="Skills"
        />
        <RHFDateTimePicker<Schema>
          name="registrationDateAndTime"
          label="Registration Date & Time"
        />
        <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
        <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher ?" />
        {isTeacher && (
          <Button onClick={() => append({ name: "" })} type="button">
            Add new student
          </Button>
        )}
        {fields.map((field, index) => (
          <Fragment>
            <RHFTextField
              name={`students.${index}.name`}
              label="Name"
              key={field.id}
            />
            <Button onClick={() => remove(index)} type="button" color="error">
              Remove
            </Button>
          </Fragment>
        ))}
      </Stack>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button type="submit">New User</Button>
        <Button type="reset">Reset</Button>
      </Stack>
    </Container>
  );
}

export default Users;
