import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const CountryCard = ({ country }) => {
  // Safety check for country data
  if (!country) return null;

  return (
    <Card sx={{ 
      width: { xs: '345px', md: '264px' },
      height: { xs: '266.5px', md: '266px' },
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.3)',
      '&:hover': {
        cursor: 'pointer',
        '& .MuiCardContent-root': {
          bgcolor: 'rgba(255, 255, 255, 0.05)'
        }
      }
    }}>
      <Box sx={{ 
        width: { xs: '345px', md: '264px' },
        height: '140px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          image={country.flag}
          alt={`Flag of ${country.name}`}
          sx={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </Box>
      <CardContent sx={{ 
        width: { xs: '313px', md: '232px' },
        height: '94.5px',
        pt: '16px',
        pl: '16px',
        pr: 0,
        pb: 0,
        '&:last-child': {
          pb: 0
        }
      }}>
        <Typography gutterBottom sx={{ fontSize: '18px' }} component="div">
          {country.name}
        </Typography>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Region:</strong> {country.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Capital:</strong> {country.capital}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard; 