import {
  Box,
  CircularProgress,
  Container,
  List,
  Modal,
  Paper,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import Order from '../model/Order'
import OrderItem from './OrderItem'
import Confirmation from './common/Confirmation'
import { orderService } from '../config/servicesConfig'
import AddressForm from './forms/AddressForm'
import StatusUpdateForm from './forms/StatusUpdateForm'

interface Props {
  loading?: boolean
  orders: Order[]
  isEditable?: boolean
  adminVersion?: boolean
}

const OrdersList: React.FC<Props> = ({
  loading = false,
  orders,
  isEditable = false,
  adminVersion = false
}) => {
  const [removeOrderId, setRemoveOrderId] = useState<string>('')
  const [fieldToUpdate, setFieldToUpdate] = useState<'address' | 'status'>()
  const [orderToUpdate, setOrderToUpdate] = useState<Order>()

  async function removeOrder (id: string) {
    await orderService.deleteOrder(id)
    setRemoveOrderId('')
  }

  function handleRemoveOrder (id: string): void {
    setRemoveOrderId(id)
  }

  async function handleOrderUpdate (order: Order) {
    await orderService.updateOrder(order)
    setFieldToUpdate(undefined)
    setOrderToUpdate(undefined)
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress sx={{ mx: 'auto' }} />
      </Box>
    )
  }

  return (
    <>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography>Orders</Typography>
        {orders.filter((order) => order.statuses[order.statuses.length - 1].status !== 'finished').map((order) => (
          <OrderItem
            key={order.id}
            onRemoveOrder={handleRemoveOrder}
            onAddressChange={(order) => {
              setOrderToUpdate(order)
              setFieldToUpdate('address')
            }}
            onStatusChange={(order) => {
              setOrderToUpdate(order)
              setFieldToUpdate('status')
            }}
            isEditable={isEditable}
            order={order}
            adminVersion={adminVersion}
          />
        ))}
        <Typography>Orders archive</Typography>
        {orders.filter((order) => order.statuses[order.statuses.length - 1].status === 'finished').map((order) => (
          <OrderItem
            key={order.id}
            onRemoveOrder={handleRemoveOrder}
            onAddressChange={(order) => {
              setOrderToUpdate(order)
              setFieldToUpdate('address')
            }}
            onStatusChange={(order) => {
              setOrderToUpdate(order)
              setFieldToUpdate('status')
            }}
            isEditable={isEditable}
            order={order}
          />
        ))}
      </List>
      {removeOrderId && (
        <Confirmation
          title='Delete order?'
          body={`You are going to delete order with id: ${removeOrderId}. Are you sure?`}
          onSubmit={function (): void {
            removeOrder(removeOrderId)
          }}
          onCancel={function (): void {
            setRemoveOrderId('')
          }}
        />
      )}
      {(orderToUpdate != null) && fieldToUpdate === 'address' && (
        <Modal
          onClose={() => setOrderToUpdate(undefined)}
          open={!!orderToUpdate}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Container disableGutters maxWidth='xs'>
            <Paper sx={{ p: 2 }}>
              <AddressForm
                onSubmit={async (address) =>
                  await handleOrderUpdate({ ...orderToUpdate, address })}
                initial={orderToUpdate.address}
              />
            </Paper>
          </Container>
        </Modal>
      )}
      {(orderToUpdate != null) && fieldToUpdate === 'status' && (
        <Modal
          onClose={() => setOrderToUpdate(undefined)}
          open={!!orderToUpdate}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Container disableGutters maxWidth='xs'>
            <Paper sx={{ p: 2 }}>
              <StatusUpdateForm
                initial={orderToUpdate}
                onSubmit={async (status) =>
                  await handleOrderUpdate({
                    ...orderToUpdate,
                    statuses: [...orderToUpdate.statuses,
                      { status, timestamp: new Date() }]
                  })}
              />
            </Paper>
          </Container>
        </Modal>
      )}
    </>
  )
}

export default OrdersList
