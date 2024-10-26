import * as React from 'react'
import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import Header from "../components/header";
import Footer from "../components/footer";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Container, CssBaseline} from '@mui/material';
import {SnackbarProvider} from 'notistack';

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
        {/*@ts-ignore*/}
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Header></Header>
          <main>
            <Container>
              <Outlet/>
            </Container>
          </main>
          <Footer></Footer>
          <TanStackRouterDevtools position="bottom-right"/>
          <CssBaseline/>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}
