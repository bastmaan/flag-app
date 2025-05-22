import React, { useState, useEffect, useRef } from 'react';
import { FormControl, Select, MenuItem, Box, useTheme } from '@mui/material';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      // Vänta tills MUI sätter overflow: hidden, och slå sen över det
      setTimeout(() => {
        document.body.style.overflow = 'scroll';
      }, 0);
    } else {
      document.body.style.overflow = '';
    }

    // Återställ vid unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
        width: { xs: '50%', md: '264px' },
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
        px: 2,
        py: 1.2,
        marginRight: '15px'
      }}
    >
      <FormControl fullWidth variant="standard">
        <Select
          inputRef={selectRef}
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          disableUnderline
          displayEmpty
          sx={{ color: theme.palette.text.primary }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                width: selectRef.current ? (selectRef.current.offsetWidth + 32) : '264px',
                position: 'fixed',
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
