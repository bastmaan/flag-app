import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#202C36' : '#F2F2F2',
            paper: darkMode ? '#2B3844' : '#FFFFFF',
          },
          text: {
            primary: darkMode ? '#F2F2F2' : '#202C36',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'none',
                overflowY: 'scroll !important',
                margin: 0,
                backgroundColor: darkMode ? '#202C36' : '#F2F2F2',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                transition: 'none',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                transition: 'none',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                transition: 'none',
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                transition: 'none',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                transition: 'none',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle('darkmode', darkMode);
    document.body.classList.toggle('lightmode', !darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};