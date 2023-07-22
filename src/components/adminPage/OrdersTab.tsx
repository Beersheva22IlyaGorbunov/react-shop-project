import { Paper, Typography } from '@mui/material'
import useOrdersRx from '../../hooks/admin/useOrdersRx'
import OrdersList from '../OrdersList'

const OrdersTab = () => {
  const [isLoading, error, orders] = useOrdersRx()
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h5'>Orders</Typography>
      <OrdersList
        loading={isLoading}
        isEditable
        adminVersion
        orders={orders}
      />
    </Paper>
  )
}

export default OrdersTab
