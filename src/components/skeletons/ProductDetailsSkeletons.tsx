import { ArrowBack } from '@mui/icons-material'
import { Chip, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductDetailsSkeletons = () => {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2} columns={{ xs: 6, sm: 12 }}>
      <Grid item xs={12}>
        <Chip
          icon={<ArrowBack />}
          onClick={() => navigate(-1)}
          label='GO BACK'
        />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant='rectangular' height='50vh' />
      </Grid>
      <Grid item xs={6}>

        <Typography variant='h4'><Skeleton /></Typography>
        <Typography variant='body1' sx={{ color: 'gray' }}>
          <Skeleton />
        </Typography>
        <Typography variant='h5'><Skeleton /></Typography>
        <Skeleton variant='text' sx={{ fontSize: '3rem' }} />
        <Skeleton variant='rounded' sx={{ maxWidth: '140px', height: '40px' }} />
      </Grid>
    </Grid>
  )
}

export default ProductDetailsSkeletons
