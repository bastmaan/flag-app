import React from 'react';
import { Box, Skeleton, Grid, Paper, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CountrySkeletonLoader = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.default, left: 0, top: 10, position: 'fixed' }}>
      <Box sx={{ maxWidth: '1154px', mx: 'auto', mt: 8, px: 3 }}>
        <Skeleton variant="rectangular" width={1000} height={40} sx={{ mb: 6, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: { xs: 6, md: 4 }, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Flag Skeleton */}
          <Box sx={{ width: { xs: '100%', md: '44%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 6, md: 0 } }}>
            <Paper elevation={3} sx={{ p: 0, bgcolor: theme.palette.background.default, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
              <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} />
            </Paper>
          </Box>
          {/* Info Skeleton */}
          <Box sx={{ width: { xs: '100%', md: '44%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Box sx={{ width: '100%' }}>
              <Skeleton variant="text" width={220} height={48} sx={{ mb: 4 }} />
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="text" width={180} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={140} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={120} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={100} height={28} sx={{ mb: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="text" width={160} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={120} height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={110} height={28} sx={{ mb: 1 }} />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary, fontWeight: 600, fontSize: 16 }}>
                  Border Countries:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="rounded" width={80} height={32} sx={{ borderRadius: 1 }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CountrySkeletonLoader; 