import React from 'react'
import Product from '../../model/Product'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'

interface Props {
  product: Product
  onRemove: (id: string) => void
  onUpdate: (product: Product) => void
}

const ProductDetailCard: React.FC<Props> = ({ product, onRemove, onUpdate }) => {
  return (
    <Container disableGutters maxWidth='xs' sx={{ p: 2 }}>
      <Typography variant='h6'>{product.name}</Typography>
      <Typography variant='caption'>{product.id}</Typography>
      <img src={product.imgLinks[0]} style={{ width: '100px', height: 'auto', display: 'block' }} alt={product.name} />
      <Typography variant='body2'>{product.description}</Typography>
      <ButtonGroup sx={{ display: 'block', textAlign: 'end' }}>
        <Button onClick={() => onRemove(product.id!)} color='error' variant='contained'>Delete</Button>
        <Button onClick={() => onUpdate(product)} color='warning' variant='contained'>Edit</Button>
      </ButtonGroup>
    </Container>
  )
}

export default ProductDetailCard
