import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from 'react-hook-form';

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
});

interface IFormInput {
  email: string
  password: string
}

function SignupComponent() {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
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
