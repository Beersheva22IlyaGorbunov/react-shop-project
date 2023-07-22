import { useNavigate, useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct'
import { Chip, Container, Grid, Paper, Typography } from '@mui/material'
import ProductDetailsSkeletons from '../components/skeletons/ProductDetailsSkeletons'
import AddToCartButton from '../components/AddToCartButton'
import { useAuthSelector, useCartItemSelector } from '../redux/store'
import { cartService } from '../config/servicesConfig'
import { ArrowBack } from '@mui/icons-material'
import generalConfig from '../config/generalConfig.json'

const ProductDetails = () => {
  const params = useParams()
  const user = useAuthSelector()
  const [product, isLoading] = useProduct(params.id)
  const cart = useCartItemSelector(params.id || '')
  const navigate = useNavigate()

  return (
    <Container maxWidth='md' sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        {isLoading
          ? (
            <ProductDetailsSkeletons />
            )
          : (
            <Grid container spacing={2} columns={{ xs: 6, sm: 12 }}>
              <Grid item xs={12}>
                <Chip
                  icon={<ArrowBack />}
                  onClick={() => navigate(-1)}
                  label='GO BACK'
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={product?.imgLinks[0]}
                  alt={product?.name}
                  width='100%'
                  style={{ maxHeight: '70vh', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h4'>{product?.name}</Typography>
                <Typography variant='body1' sx={{ color: 'gray' }}>
                  Category: {product?.category}
                </Typography>
                <Typography variant='h5'>{product?.price} {generalConfig.currency}</Typography>
                <Typography variant='caption' sx={{ color: 'gray' }}>
                  Description:
                </Typography>
                <Typography variant='body2'>{product?.description}</Typography>
                <AddToCartButton
                  sx={{ mt: 2 }}
                  count={cart}
                  onClick={async (newValue: number) =>
                    await cartService.updateCartItem(
                      user?.uid || '',
                      product?.id!,
                      newValue
                    )}
                />
              </Grid>
            </Grid>
            )}
      </Paper>
    </Container>
  )
}

export default ProductDetails
