import React from 'react';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <Box sx={{ 
      width: { xs: '100%', md: '400px' },
      position: 'relative'
    }}>
      <TextField
        fullWidth
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            padding: '15px 15px 15px 45px',
          },
        }}
      />
      <SearchIcon 
        sx={{ 
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'text.secondary'
        }} 
      />
    </Box>
  );
};

export default SearchBar;