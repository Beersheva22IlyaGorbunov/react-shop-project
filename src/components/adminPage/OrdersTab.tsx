import { Button, Paper, Typography } from '@mui/material'
import React from 'react'
import OrdersTable from './OrdersTable'
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
        // orders={orders.sort((a, b) =>
        //   a.statuses[a.statuses.length][1] < b.statuses[b.statuses.length][1]
        //     ? -1
        //     : 1
        // )}
        orders={orders}
      />
    </Paper>
  )
}

export default OrdersTab
