import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar/SearchBar';
import GetData from '../hooks/getData';

const HomePage = () => {
    
    return (
        <Box  sx={{ marginTop: 10, maxWidth: { xs: '100%', lg: "1200px" }, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h1">Welcome to the Home Page</Typography>
            <GetData />
            <SearchBar />
        </Box>
    );
};

export default HomePage;