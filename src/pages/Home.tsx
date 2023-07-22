import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import ProductCard from '../components/ProductCard'
import useProducts from '../hooks/useProducts'
import { useNavigate } from 'react-router-dom'
import { useCartSelector } from '../redux/store'
import RootState from '../model/redux/RootState'
import { useSelector } from 'react-redux'
import generalConfig from '../config/generalConfig.json'
import React from 'react'

interface SlotType {
  title: string
  urls: string[]
}

const Slot: React.FC<SlotType> = ({ title, urls }) => {
  const [products, isLoading] = useProducts(urls)
  const navigate = useNavigate()
  const cart = useCartSelector()
  return (
    <>
      <Typography variant='h5' my={1}>
        {title}
      </Typography>
      <Grid container spacing={2} columns={12}>
        {isLoading
          ? (
            <CircularProgress sx={{ mx: 'auto' }} />
            )
          : (
              products.map((product, index) => {
                return (
                  <Grid key={product.id} item xs={6} sm={4} md={3}>
                    <ProductCard
                      inCart={cart[product.id!] || 0}
                      product={product}
                      onClickFn={() => navigate(`/catalog/${product.id}`)}
                    />
                  </Grid>
                )
              })
            )}
      </Grid>
    </>
  )
}

const Home = () => {
  const settings = useSelector(
    (state: RootState) => state.settingsState.settings
  )
  const theme = useTheme()
  const isSmBreakpoint = useMediaQuery(theme.breakpoints.only('sm'))

  const slots: any = generalConfig.slots

  return (
    <Box mt={-8}>
      <Box
        sx={{
          backgroundImage: `url(${settings?.bannerUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        height='100vh'
        display='flex'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
      >
        {settings?.title && settings?.subtitle && (
          <Stack
            spacing={1}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, .3)',
              backdropFilter: 'blur(3px)',
              borderRadius: 2,
              padding: 2
            }}
          >
            <Typography variant='h2'>{settings?.title}</Typography>
            <Typography variant='h4'>{settings?.subtitle}</Typography>
          </Stack>
        )}
      </Box>
      <Container maxWidth='lg'>
        {slots.map((slot: SlotType) => (
          <Slot
            key={slot.title}
            title={slot.title}
            urls={isSmBreakpoint ? slot.urls.slice(0, 3) : slot.urls}
          />
        ))}

        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1475.592777669832!2d34.805658133238055!3d31.911086649663247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b6e51b6e1de5%3A0xc159edda556fe098!2sTel%20Ran!5e0!3m2!1sen!2sil!4v1689136943880!5m2!1sen!2sil'
          width='100%'
          height='400'
          title='Google maps'
          style={{ border: 0, marginTop: '1rem' }}
          loading='lazy'
        />
      </Container>
    </Box>
  )
}

export default Home
