import React from 'react'
import Product from '../model/Product'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import AddToCartButton from './AddToCartButton'
import { useAuthSelector } from '../redux/store'
import { cartService } from '../config/servicesConfig'
import generalConfig from "../config/generalConfig.json"

interface Props {
  product: Product
  inCart: number
  onClickFn?: () => void
}

const placeholderUrl =
  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'

const ProductCard: React.FC<Props> = ({ product, inCart, onClickFn }) => {
  const user = useAuthSelector()

  function handleCartQuantityChange (newQuantity: number): void {
    cartService.updateCartItem(user?.uid || '', product.id!, newQuantity)
  }

  return (
    <Card onClick={onClickFn} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component='img'
        sx={{ maxHeight: '180', aspectRatio: '1/1' }}
        image={product.imgLinks[0] ?? placeholderUrl}
        alt={product.name}
      />
      <CardContent sx={{ p: 1, pb: 0 }}>
        <Typography noWrap>{product.name}</Typography>
        <Typography variant='body2' textAlign='end'>
          {product.price} {generalConfig.currency}
        </Typography>
      </CardContent>
      <CardActions onClick={(e) => e.stopPropagation()}>
        <AddToCartButton fullWidth count={inCart} onClick={handleCartQuantityChange} />
      </CardActions>
    </Card>
  )
}

export default ProductCard
