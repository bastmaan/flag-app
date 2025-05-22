import React, { useState, useEffect, Suspense } from 'react';
import { Box, Grid, useTheme, Container } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import SkeletonLoaders from '../../components/skeletonLoaders/skeletonLoaders';
import CountryCard from '../../components/CountryCard/CountryCard';
import RegionFilter from '../../components/RegionFilter/RegionFilter';

const HomePage = () => {
    const theme = useTheme();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                const formatted = data.map((country) => ({
                    name: country.name.common,
                    flag: country.flags.svg,
                    population: country.population,
                    region: country.region,
                    capital: country.capital ? country.capital[0] : 'N/A',
                }));
                setCountries(formatted);
                setLoading(false);
            });
    }, []);

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const filteredCountries = countries
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
      });

    return (
      <Box className='home-page' sx={{ 
        width: '100%',
        maxWidth: '100vw',
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#202C36' : '#F2F2F2',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 0,
        boxSizing: 'border-box'
      }}>
        <Container maxWidth="lg" disableGutters sx={{ pt: 10, position: 'relative', width: '100%', px: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            mb: 4,
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}>
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <RegionFilter 
              selectedRegion={selectedRegion} 
              onRegionChange={handleRegionChange} 
            />
          </Box>
          {loading ? (
            <SkeletonLoaders />
          ) : (
            <Grid 
              container 
              spacing={4} 
              sx={{ 
                width: '100%',
                margin: 0,
                paddingRight: 0,
                justifyContent: { xs: 'center', md: 'flex-start' },
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2,
                boxSizing: 'border-box'
              }}
            >
              {filteredCountries.map((country, index) => (
                <Grid 
                  item 
                  key={`${country.name}-${index}`}
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    width: 'auto',
                    mb: 4
                  }}
                >
                  <CountryCard country={country} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    );
};

export default HomePage; 