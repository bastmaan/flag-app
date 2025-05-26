import React, { useContext } from 'react';
import { AppBar, Box, Typography, Container, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import darkLogo from '../../assets/techover-logo-dark.png'; // Importera din mörka logotyp här
import lightLogo from '../../assets/techover-logo.png'; // Importera din ljusa logotyp här

const MinNavbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      width: '100%',
      position: { xs: 'fixed', md: 'absolute' },
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: (theme) => theme.palette.background.paper,
      zIndex: 10
    }}>
      <Container maxWidth="lg" sx={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              color: (theme) => theme.palette.text.primary,
              fontWeight: 800
            }}
          >
            The Flag App
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <img
            src={darkMode ? lightLogo : darkLogo}
            alt="Logo"
            style={{ height: 24 }}
          />
        </Box>
        <Button 
          onClick={toggleTheme} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: (theme) => theme.palette.text.primary,
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          {darkMode ? <Brightness7 sx={{ fontSize: '20px' }} /> : <Brightness4 sx={{ fontSize: '20px' }} />}
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '14px',
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary
            }}
          > 
            {darkMode ? 'DARK MODE' : 'LIGHT MODE'}
          </Typography>
        </Button>
      </Container>
    </Box>
  );
};

export default MinNavbar;