import React, { useState, useEffect } from 'react';
import { Box, Grid, useTheme, Container } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import SkeletonLoaders from '../../components/SkeletonLoaders/SkeletonLoaders.jsx';
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
        
        // Try multiple API endpoints with field specification
        const apiEndpoints = [
            'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital',
            'https://restcountries.com/v3/all?fields=name,flags,population,region,capital',
            'https://restcountries.com/v2/all?fields=name,flag,population,region,capital'
        ];
        
        const tryFetch = async (endpoint) => {
            try {
                console.log(`Trying endpoint: ${endpoint}`);
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                
                console.log(`Response status: ${response.status}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log(`API data received from ${endpoint}:`, data.length, 'countries');
                console.log('First country sample:', data[0]);
                
                // Check if data has the expected structure
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Invalid data structure received');
                }
                
                const formatted = data.map((country) => {
                    // Handle different possible flag structures
                    let flagUrl = '';
                    if (country.flags) {
                        // For v3.1 and v3, prefer svg, fallback to png
                        flagUrl = country.flags.svg || country.flags.png || '';
                    } else if (country.flag) {
                        // For v2, use the flag field directly
                        flagUrl = country.flag;
                    }
                    
                    console.log(`Country: ${country.name?.common || country.name}, Flag URL: ${flagUrl}`);
                    
                    return {
                        name: country.name?.common || country.name || 'Unknown',
                        flag: flagUrl,
                        population: country.population || 0,
                        region: country.region || 'Unknown',
                        capital: country.capital ? (Array.isArray(country.capital) ? country.capital[0] : country.capital) : 'N/A',
                    };
                });
                
                console.log('Formatted countries:', formatted.slice(0, 3));
                setCountries(formatted);
                setLoading(false);
                return true; // Success
                
            } catch (error) {
                console.error(`Error with endpoint ${endpoint}:`, error);
                return false; // Failed
            }
        };
        
        // Try each endpoint until one works
        const attemptFetch = async () => {
            for (const endpoint of apiEndpoints) {
                const success = await tryFetch(endpoint);
                if (success) return;
            }
            // If all endpoints fail
            console.error('All API endpoints failed');
            setLoading(false);
        };
        
        attemptFetch();
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