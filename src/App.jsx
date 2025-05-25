import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import MinNavbar from './components/MinNavbar/MinNavbar';
import './App.css';

const App = () => {
  return (
    <ThemeContextProvider>
      <MinNavbar />
        <Outlet /> {/* Här renderas HomePage */}
    </ThemeContextProvider>
  );
};

export default App;