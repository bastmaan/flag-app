import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          ...(darkMode
            ? {
                // Custom färger för dark mode
                background: {
                  default: '#202C36', // Mörkare blå
                  paper: '#2B3844', // Mörk blå
                },
                text: {
                  primary: '#F2F2F2', // Vit
                },
              }
            : {
                // Custom färger för light mode
                background: {
                  default: '#F2F2F2', // Vit
                  paper: '#FFFFFF', // Ljus bakgrund
                },
                text: {
                  primary: '#202C36', // Mörkare blå
                },
              }),
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};