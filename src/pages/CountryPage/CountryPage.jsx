import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Button, CircularProgress, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CountrySkeletonLoader from '../../components/SkeletonLoaders/CountrySkeletonLoader';

const CountryPage = () => {
  const theme = useTheme();
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
      .then(res => res.json())
      .then(async data => {
        const c = data[0];
        setCountry(c);
        // Hämta grannländers namn
        if (c.borders && c.borders.length > 0) {
          const bordersRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${c.borders.join(',')}`);
          const bordersData = await bordersRes.json();
          setBorderCountries(bordersData.map(b => b.name.common));
        } else {
          setBorderCountries([]);
        }
        setLoading(false);
      });
  }, [countryName]);

  if (loading || !country) {
    return <CountrySkeletonLoader />;
  }

  // Extrahera info
  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;
  const tld = country.tld ? country.tld.join(', ') : '-';
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => c.name).join(', ')
    : '-';
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : '-';

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.default, left: 0, top: 10, position: 'fixed'}}>
      <Box sx={{ maxWidth: '1154px', mx: 'auto', mt: 8, px: 3 }}>
        <Button onClick={() => navigate(-1)} sx={{ mb: 6, color: theme.palette.text.primary, borderColor: theme.palette.text.primary, marginTop: 4, fontWeight: 600, fontSize: 16, '&:hover': { borderColor: theme.palette.text.primary, bgcolor: theme.palette.action.hover } }}>
          &#8592; Back
        </Button>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: { xs: 6, md: 4 }, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Flag */}
          <Box sx={{ width: { xs: '100%', md: '44%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 6, md: 0 } }}>
            <Paper elevation={3} sx={{ p: { xs: 0, sm: 0 }, bgcolor: theme.palette.background.default, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 10, p: 0 }}
              />
            </Paper>
          </Box>
          {/* Info */}
          <Box sx={{ width: { xs: '100%', md: '44%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, textAlign: { xs: 'center', md: 'left' }, color: theme.palette.text.primary, fontSize: { xs: 32, md: 40 } }}>
                {country.name.common}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Native name:</strong> {nativeName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Population:</strong> {country.population.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Region:</strong> {country.region}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Capital:</strong> {country.capital ? country.capital[0] : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Top Level Domain:</strong> {tld}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Currencies:</strong> {currencies}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontSize: 16 }}>
                    <strong>Language:</strong> {languages}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontWeight: 600, fontSize: 16 }}>
                  Border Countries:
                </Typography>
                {borderCountries.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
                    {borderCountries.map((name) => (
                      <Chip
                        key={name}
                        label={name}
                        clickable
                        size="small"
                        onClick={() => navigate(`/country/${encodeURIComponent(name)}`)}
                        sx={{ fontWeight: 600, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, fontSize: 14, px: 1.5, borderRadius: 1, boxShadow: 1, '&:hover': { bgcolor: theme.palette.action.hover } }}
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>Inga grannländer</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CountryPage; 