import React from 'react'
import OrdersList from '../components/OrdersList'
import useClientOrders from '../hooks/useClientOrders'
import { useAuthSelector } from '../redux/store'
import { Container, Paper, Typography } from '@mui/material'

const Orders = () => {
  const user = useAuthSelector()
  const [isLoading, error, orders] = useClientOrders(user?.uid || '')
  return (
    <Container maxWidth='lg' sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h5'>My orders:</Typography>
        <OrdersList orders={orders} />
      </Paper>
    </Container>
  )
}

export default Orders
