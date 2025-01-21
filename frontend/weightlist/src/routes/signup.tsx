import * as React from 'react'
import {createFileRoute, useRouter} from '@tanstack/react-router'
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from 'react-hook-form';
import {api} from "../../static/js/api";
import {useSnackbar} from "notistack";

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
});

interface IFormInput {
  username: string
  email: string
  password: string
  roles: string[]
}

function SignupComponent() {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.username = data.email;
    data.roles = ["ROLE_USER"];
    try {
      api
        .post('http://localhost:8080/api/auth/signup', {}, JSON.stringify(data))
        .then((result: any) => {
          if (!(result as any).error) {
            console.log('POST Success!', result)
            enqueueSnackbar("Submission successful!", {variant: "success"});
            void router.navigate({to: '/login'})
          } else {
            console.error("Error occurred when creating user:", (result as any).status, (result as any).error);
            enqueueSnackbar("Submission error", {variant: "error"});
          }
        });
    } catch (e: any) {
      console.log(e);
      enqueueSnackbar(e.message, {variant: "error"});
    }
  }

  const {
    register,
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<IFormInput>({
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "80vh",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      width: "auto",
    }}>
      <Stack component={Paper} sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        width: "auto",
        p: 4,
        gap: "20px",
      }}>
        <Typography variant="h4" sx={{m: 4}}>
          Weightlist
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required"
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be between 8 - 20 characters"
              },
              maxLength: {
                value: 20,
                message: "Password must be between 8 - 20 characters"
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <Button type="submit" variant="contained">Sign Up</Button>
        </form>
      </Stack>
    </Box>
  );
}
