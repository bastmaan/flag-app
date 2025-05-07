import React, { useContext } from 'react';
import { AppBar, Box, Typography, Container, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../../context/ThemeContext';
import darkLogo from '../../assets/techover-logo-dark.png'; // Importera din mörka logotyp här
import lightLogo from '../../assets/techover-logo.png'; // Importera din ljusa logotyp här

const MinNavbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box>
      <AppBar position="fixed" sx={{ width: '100%', height: {xs: 56, md: 64} , backgroundColor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.text.primary }}>
        <Container
          maxWidth="lg"
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ANPASSA TILL MOBILA STORLEKAR */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
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
          <Button onClick={toggleTheme} color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            <Typography variant="body1"> 
              {/* FIXA MED STORLEKEN PÅ TEXTEN FÖR ATT PASSA DESIGNEN */}
              {darkMode ? 'DARK MODE' : 'LIGHT MODE'}
            </Typography>
          </Button>
        </Container>
      </AppBar>
    </Box>
  );
};

export default MinNavbar;