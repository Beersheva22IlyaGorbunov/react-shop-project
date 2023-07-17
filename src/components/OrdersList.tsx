import { List } from '@mui/material'
import React from 'react'
import Order from '../model/Order';
import OrderItem from './OrderItem';

type Props = {
  loading?: boolean;
  orders: Order[];
};

const OrdersList: React.FC<Props> = ({ loading = false, orders }) => {
  return (
    <List sx={{display: "flex", flexDirection: "column", gap: 1}}>
      {orders.map((order) => <OrderItem order={order} />)}
    </List>
  )
}

export default OrdersList