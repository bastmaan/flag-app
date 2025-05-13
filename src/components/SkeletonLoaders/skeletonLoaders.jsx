import React from 'react';
import { Grid, Card, Skeleton, Box } from '@mui/material';

const SkeletonLoaders = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {[...Array(8)].map((_, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 276, height: 400 }}>
              <Skeleton variant="rectangular" height={160} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonLoaders; 