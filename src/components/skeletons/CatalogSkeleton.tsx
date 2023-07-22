import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const CatalogSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((__, index) => (
        <Grid key={index} minHeight='250px' item xs={6} md={4} lg={3}>
          <Skeleton height='100%' width='100%' variant='rounded' />
        </Grid>
      ))}
    </>
  )
}

export default CatalogSkeleton
