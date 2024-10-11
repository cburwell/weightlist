import * as React from 'react'
import {Outlet, createRootRoute} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import Header from "../components/header";
import Footer from "../components/footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Container, CssBaseline} from '@mui/material';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  return (
    <>
      <ThemeProvider theme={theme} defaultMode="dark">
        <Header></Header>
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer></Footer>
        <TanStackRouterDevtools position="bottom-right"/>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}
