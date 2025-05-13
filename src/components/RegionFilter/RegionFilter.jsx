import React from 'react';
import { FormControl, Select, MenuItem, Box, useTheme } from '@mui/material';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const theme = useTheme();
  const regions = [
    { value: '', label: 'All Regions' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' }
  ];

  return (
    <Box
      sx={{
        width: { xs: '50%', md: 200 },
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
        px: 2,
        py: 1.2,
      }}
    >
      <FormControl fullWidth variant="standard">
        <Select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          disableUnderline
          displayEmpty
          sx={{ color: theme.palette.text.primary }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                width: '200px',
                position: 'fixed',
                left: 'auto !important',
                right: 'auto !important'
              },
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            slotProps: {
              paper: {
                style: {
                  marginTop: '8px'
                }
              }
            }
          }}
        >
          {regions.map((region) => (
            <MenuItem key={region.value} value={region.value}>
              {region.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RegionFilter; 