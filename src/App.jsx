import React from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import MinNavbar from './components/MinNavbar/MinNavbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
      <MinNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;