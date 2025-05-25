import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import MinNavbar from './components/MinNavbar/MinNavbar';
import SkeletonLoaders from './components/SkeletonLoaders/SkeletonLoaders';
import './App.css';

const App = () => {
  return (
    <ThemeContextProvider>
      <MinNavbar />
      <Suspense fallback={<SkeletonLoaders />}>
        <Outlet /> {/* Här renderas HomePage */}
      </Suspense>
    </ThemeContextProvider>
  );
};

export default App;