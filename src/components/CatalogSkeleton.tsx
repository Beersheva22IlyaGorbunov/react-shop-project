import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const CatalogSkeleton = () => {
  return (
    <>
      <Grid item xs={12}>
        <Skeleton variant="text" sx={{lineHeight: "3rem"}}/>
      </Grid>
      {Array.from({length: 10}).map((__, index) => (
        <Grid key={index} minHeight="180px" item xs={3}>
          <Skeleton height="100%" width="100%" variant='rounded' />
        </Grid>
      ))}
    </>
  )
}

export default CatalogSkeleton