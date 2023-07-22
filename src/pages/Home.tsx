import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import ProductCard from '../components/ProductCard'
import useSettings from '../hooks/useSettings'
import { title } from 'process'
import useProducts from '../hooks/useProducts'
import { useNavigate } from 'react-router-dom'
import { useCartSelector } from '../redux/store'
import RootState from '../model/redux/RootState'
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()
  const settings = useSelector(
    (state: RootState) => state.settingsState.settings
  )
  const theme = useTheme()
  const isSmBreakpoint = useMediaQuery(theme.breakpoints.only('sm'))
  const cart = useCartSelector()
  const slot: any = [
    'Popular',
    [
      '1c13e583-da94-4d09-b588-5e3f9b68e2ff',
      '5e9d8c8e-9a30-4809-a926-2bd3619100ee',
      '89c08261-d971-4390-a275-2e35544df3ef',
      'a4dc9741-c688-44de-810b-eeb0cd7a9187'
    ]
  ]
  const [isLoading, error, slotsData] = useProducts(slot[1])
  console.log(slotsData)
  // const title = "Flowers shop";
  // const subTitle = "We are working for you since 2015";
  // const backgroundImgUrl =
  //   "https://images.squarespace-cdn.com/content/v1/57451c424c2f85ae9b18f48d/ddcb7ab1-22ab-49dd-8da9-9b3b054393a5/Claudia+Lapena+-+4A4B169D-B766-409B-BD76-AAC2590167F7.jpeg";
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
        {!error && (
          <>
            <Typography variant='h5' my={1}>
              {slot[0]}
            </Typography>
            <Grid container spacing={2} columns={12}>
              {slotsData.map((product, index) => {
                if (isSmBreakpoint && index > 2) {
                  return null
                }
                return (
                  <Grid key={product.id} item xs={6} sm={4} md={3}>
                    <ProductCard
                      inCart={cart[product.id!] || 0}
                      product={product}
                      onClickFn={() => navigate(`/catalog/${product.id}`)}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </>
        )}

        <Typography variant='h5' my={1}>
          Top categories
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              inCart={0}
              product={{
                id: '1',
                name: 'Example',
                category: '',
                imgLinks: [],
                description: 'Some description',
                price: 100
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              inCart={0}
              product={{
                id: '1',
                name: 'Example',
                category: '',
                imgLinks: [],
                description: 'Some description',
                price: 100
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              inCart={0}
              product={{
                id: '1',
                name: 'Example',
                category: '',
                imgLinks: [],
                description: 'Some description',
                price: 100
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              inCart={0}
              product={{
                id: '1',
                name: 'Example',
                category: '',
                imgLinks: [],
                description: 'Some description',
                price: 100
              }}
            />
          </Grid>
        </Grid>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1475.592777669832!2d34.805658133238055!3d31.911086649663247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b6e51b6e1de5%3A0xc159edda556fe098!2sTel%20Ran!5e0!3m2!1sen!2sil!4v1689136943880!5m2!1sen!2sil'
          width='100%'
          height='400'
          title='Google maps'
          style={{ border: 0 }}
          loading='lazy'
        />
      </Container>
    </Box>
  )
}

export default Home
