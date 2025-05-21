import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { defaultValues, type Schema } from "../types/schema";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { Fragment, useEffect } from "react";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/quaries";
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFTextField } from "../../components/RHFTextField";
import { useCreateUser, useEditUser } from "../services/mutations";

function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();
  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();
  const { watch, control, unregister, reset, setValue, handleSubmit } =
    useFormContext<Schema>();
  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const userQuery = useUser(id);
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

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [userQuery, reset]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      // create user
      createUserMutation.mutate(data);
    } else {
      //edit user
      editUserMutation.mutate(data);
    }
  };
  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
          <Button type="submit" variant="contained">
            {variant === "create" ? "New User" : "Edit User Data"}
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Users;
