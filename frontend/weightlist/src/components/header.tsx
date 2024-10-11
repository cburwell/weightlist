import {
  AppBar, Avatar, Box, Button, Container,
  FormControl,
  FormControlLabel,
  FormLabel, IconButton, Menu, MenuItem,
  Radio,
  RadioGroup,
  Switch, Toolbar, Tooltip, Typography,
  useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useColorScheme} from "@mui/material/styles";
import {Link} from "@tanstack/react-router";
import * as React from "react";
import {useEffect} from "react";
import {DarkMode, LightMode} from "@mui/icons-material";

export default function Header() {
  const {mode, setMode} = useColorScheme();
  const leftPages = ['Workouts', 'Exercises'];
  const rightPages = ['Log in', 'Sign up'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  let modeIcon = mode == "dark" ? <LightMode/> : <DarkMode/>;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleMode = () => {
    if (mode == "dark") {
      setMode("light");
      modeIcon = <LightMode/>;
    }
    else {
      setMode("dark");
      modeIcon = <DarkMode/>;
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WEIGHTLIST
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            >
              {leftPages.map((page) => (
                <Button key={page} component={Link} to={"/" + page.replace(/\s/g, "").toLowerCase()}>
                  <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                </Button>
              ))}
              {rightPages.map((page) => (
                <Button key={page} component={Link} to={"/" + page.replace(/\s/g, "").toLowerCase()}>
                  <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                </Button>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {leftPages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={"/" + page.replace(/\s/g, "").toLowerCase()}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page}
              </Button>
            ))}
            <div className="spacer"></div>
            {rightPages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={"/" + page.replace(/\s/g, "").toLowerCase()}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="light / dark mode toggle"
              onClick={toggleMode}
              color="inherit"
            >
              {modeIcon}
            </IconButton>
          </Box>
          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="User Profile Picture" src="/static/images/default_prof_pic.jpg"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}