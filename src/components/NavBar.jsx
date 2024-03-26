import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Outlet, useNavigate } from 'react-router';
import logo from "../assets/img/navbarLogo.png"
import rick from "../assets/img/rick.png"
import morty from "../assets/img/morty.png"
import { colors } from '../styles/globalStlye';



const pages = [
  {
    title: "Home",
    url: '/'
  },

];

const NavBar = () => {


  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (

    <AppBar position='static' sx={{ backgroundColor: colors.navbarBgColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }} >
            <img
              loading='lazy'
              src={rick}
              alt="rickandmorty"
              width='100px'
              style={{ padding: 5 }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }} >
            <img
              loading='lazy'
              src={morty}
              alt="rickandmorty"
              width='100px'
              style={{ padding: 5 }}
            />
          </Box>

        </Toolbar>

      </Container>



      <Box>
        <Outlet />
      </Box>


    </AppBar>

  )
}

export default NavBar