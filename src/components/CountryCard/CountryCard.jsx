import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  // Safety check for country data
  if (!country) return null;

  const handleClick = () => {
    navigate(`/country/${encodeURIComponent(country.name)}`);
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        width: { xs: '345px', md: '264px' },
        height: { xs: '266.5px', md: '266px' },
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          cursor: 'pointer',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '140px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0, 0, 0, 0.05)',
            zIndex: 1
          }
        }
      }}
    >
      <Box sx={{ 
        width: { xs: '345px', md: '264px' },
        height: '140px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: darkMode ? '#2B3743' : '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CardMedia
          component="img"
          image={country.flag}
          alt={`Flag of ${country.name}`}
          onError={(e) => {
            console.error('Failed to load flag for', country.name, ':', country.flag);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Successfully loaded flag for', country.name);
          }}
          sx={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
        {!country.flag && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', p: 2 }}>
            No flag available
          </Typography>
        )}
      </Box>
      <CardContent sx={{ 
        width: { xs: '313px', md: '232px' },
        height: '94.5px',
        pt: '16px',
        pl: '16px',
        pr: 0,
        pb: 0,
        position: 'relative',
        zIndex: 2,
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