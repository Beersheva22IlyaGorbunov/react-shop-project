import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface Props {
  name: string
  imgUrl: string
  description: string
}

const placeholderUrl =
  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'

const CategoryCard: React.FC<Props> = ({ name, imgUrl, description }) => {
  return (
    <Card>
      <CardMedia
        component='img'
        // maxHeight="180"
        sx={{ maxHeight: '180' }}
        image={imgUrl[0] ?? placeholderUrl}
        alt={name}
      />
      <CardContent>
        <Typography>{name}</Typography>
        <Typography variant='body1' textAlign='end'>{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
