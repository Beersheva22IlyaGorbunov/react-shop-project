import {
  Box,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Typography
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useAuthSelector, useCartSelector } from '../redux/store'
import useProducts from '../hooks/useProducts'
import { ShoppingCartOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  cartService,
} from '../config/servicesConfig'
import ProductQuantity from '../model/ProductQuantity'
import CartItem from '../components/CartItem'
import PlaceOrder from '../components/PlaceOrder'
import { getProductsPrice } from '../helpers/productHelpers'
import generalConfig from "../config/generalConfig.json"

function getItemsTotal (products: ProductQuantity[]): number {
  return products.reduce((accum, item) => (accum += item.quantity), 0)
}

const Cart = () => {
  const navigate = useNavigate()
  const auth = useAuthSelector()
  const cart = useCartSelector()
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
  const [products] = useProducts(Object.keys(cart), [cart])
  const productsInCart: ProductQuantity[] = useMemo(() => {
    return products
      .filter((product) => cart[product.id!] !== undefined)
      .map((product) => ({
        ...product,
        quantity: cart[product.id!]
      }))
  }, [products, cart])

  function handleDeleteItem (id: string) {
    cartService.deleteCartItem(auth?.uid || '', id)
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h5'>In cart:</Typography>
            {productsInCart.length > 0
              ? (
                <List>
                  {productsInCart.map((cartItem, index) => (
                    <CartItem
                      key={cartItem.id}
                      dividerBefore={index !== 0}
                      deleteItemFn={handleDeleteItem}
                      cartItem={cartItem}
                      onClickFn={() => navigate(`/catalog/${cartItem.id}`)}
                    />
                  ))}
                </List>
                )
              : (
                <Box color='GrayText' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10rem' }}>
                  <ShoppingCartOutlined />
                  <Typography>There is no products in your cart yet </Typography>
                </Box>
                )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography>
              Subtotal ({getItemsTotal(productsInCart)} items):{' '}
              {getProductsPrice(productsInCart)} {generalConfig.currency}
            </Typography>
            <Button
              onClick={() => setModalIsVisible(true)}
              disabled={products.length === 0}
              size='small'
              sx={{ mt: 2, color: "white" }}
              variant='contained'
            >
              Proceed order
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {modalIsVisible && <PlaceOrder onModalClose={() => setModalIsVisible(false)} orderProducts={productsInCart} clientId={auth?.uid || ''} />}
    </Container>
  )
}

export default Cart
