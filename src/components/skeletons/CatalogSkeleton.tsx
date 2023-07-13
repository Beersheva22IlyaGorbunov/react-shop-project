import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const CatalogSkeleton = () => {
  return (
    <>
      <Grid item xs={12}>
        <Skeleton variant="text" width="50%" sx={{lineHeight: "3rem"}}/>
      </Grid>
      {Array.from({length: 10}).map((__, index) => (
        <Grid key={index} minHeight="180px" item xs={6} sm={4} md={3} lg={2}>
          <Skeleton height="100%" width="100%" variant='rounded' />
        </Grid>
      ))}
    </>
  )
}

export default CatalogSkeleton