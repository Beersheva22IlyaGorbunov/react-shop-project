import OrdersList from '../components/OrdersList'
import useClientOrders from '../hooks/useClientOrders'
import { useAuthSelector } from '../redux/store'
import { CircularProgress, Container, Paper, Typography } from '@mui/material'

const Orders = () => {
  const user = useAuthSelector()
  const [orders, isLoading] = useClientOrders(user?.uid || '')
  return (
    <Container maxWidth='lg' sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h5'>My orders:</Typography>
        {isLoading ? <CircularProgress sx={{ mx: 'auto' }} /> : <OrdersList orders={orders} />}
      </Paper>
    </Container>
  )
}

export default Orders
