import * as React from 'react'
import {createFileRoute, useRouter} from '@tanstack/react-router'
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {SubmitHandler, useForm} from "react-hook-form";
import {api} from "../../static/js/api";

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

interface IFormInput {
  username: string
  password: string
}

function LoginComponent() {
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
      try {
        api
          .post('http://localhost:8080/api/auth/login', {}, JSON.stringify(data))
          .then((result: any) => {
            if (!(result as any).error) {
              console.log('POST Success!', result)
              enqueueSnackbar("Submission successful!", {variant: "success"});
              void router.navigate({to: '/workouts'})
            } else {
              console.error("Error occurred when logging in user:", (result as any).status, (result as any).error);
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
        username: "",
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
              label="Username"
              type="username"
              {...register("username", {
                required: "Username is required"
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
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
            <Button type="submit" variant="contained">Log in</Button>
          </form>
        </Stack>
      </Box>
    );
  }
