import React from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import MinNavbar from './components/MinNavbar/MinNavbar';

const App = () => {
  return (
    <ThemeContextProvider>
      <MinNavbar />
      {/* Lägg till andra komponenter här */}
    </ThemeContextProvider>
  );
};

export default App;