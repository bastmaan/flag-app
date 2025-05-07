import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar/SearchBar';
import { useLoaderData } from 'react-router-dom';

const HomePage = () => {
  const data = useLoaderData(); // Här får du datan direkt från loader

  return (
    <Box sx={{ marginTop: 10, maxWidth: { xs: '100%', lg: "1200px" }, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h1">Welcome to the Home Page</Typography>
      <Typography variant="body1">Länder laddade: {data.length}</Typography>
      <SearchBar />
    </Box>
  );
};

export default HomePage;