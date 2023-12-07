import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { toast } from 'react-toastify';

export default function Navbarr() {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        toast.success('Logout Succesfully', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/')
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='bg-slate-800'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='cursor-pointer' onClick={() => navigate('/category')}>
            Quiz App
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <WavingHandIcon /> Hello {user}
          </Typography>
          <Button variant='contained' className='bg-slate-900' onClick={logout} endIcon={<LogoutIcon />}> Logout </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}