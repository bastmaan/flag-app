import React, { useState } from 'react';
import { Box, Grid, useTheme, Container } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useLoaderData, useNavigation } from 'react-router-dom';
import SkeletonLoaders from '../../components/skeletonLoaders/skeletonLoaders';
import CountryCard from '../../components/CountryCard/CountryCard';
import RegionFilter from '../../components/RegionFilter/RegionFilter';

const HomePage = () => {
    const data = useLoaderData();
    const navigation = useNavigation();
    const theme = useTheme();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const filteredCountries = data
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
      });

    const isLoading = navigation.state === 'loading';

    if (isLoading) {
        return <SkeletonLoaders />;
    }

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#202C36' : '#F2F2F2',
      margin: 0,
      padding: 0,
      position: 'relative',
      overflowY: 'auto',
      overflowX: 'hidden',
      zIndex: 0,
      maxWidth: '100%'
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
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            mt: 4,
            width: '100%',
            margin: '0 auto',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2
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
      </Container>
    </Box>
  );
};

export default HomePage; 