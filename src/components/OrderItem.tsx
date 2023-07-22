import React, { useState } from 'react'
import Order from '../model/Order'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { green } from '@mui/material/colors'
import Address from '../model/Address'
import ProductQuantity from '../model/ProductQuantity'
import { getProductsPrice } from '../helpers/productHelpers'
import { Edit, ExpandMore } from '@mui/icons-material'

interface Props {
  order: Order
  isEditable?: boolean
  onRemoveOrder?: (id: string) => void
  onAddressChange?: (order: Order) => void
  onStatusChange?: (order: Order) => void
}

const renderAddress = (address: Address): JSX.Element => {
  return (
    <Stack>
      {Object.entries(address).map(([field, value]) => (
        <Typography key={field}>
          {field}:{value}
        </Typography>
      ))}
    </Stack>
  )
}

const renderProducts = (products: ProductQuantity[]): JSX.Element => {
  return (
    <List disablePadding>
      {products.map((product) => (
        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={`${product.name} x ${product.quantity}`}
            secondary={product.description}
          />
          <Typography ml={1} variant='body2'>
            {product.price * product.quantity}
          </Typography>
        </ListItem>
      ))}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary='Total' />
        <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
          {getProductsPrice(products)}
        </Typography>
      </ListItem>
    </List>
  )
}

const OrderItem: React.FC<Props> = ({
  order,
  isEditable = false,
  onRemoveOrder,
  onAddressChange,
  onStatusChange
}) => {
  return (
    <ListItem
      sx={{
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: green[500],
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant='h6'>Order products:</Typography>
          <Box sx={{ marginInlineStart: 1 }}>
            {renderProducts(order.products)}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h6'>Delivery:</Typography>
          <Box sx={{ marginInlineStart: 1 }} position='relative'>
            {(onAddressChange != null) && (
              <IconButton
                onClick={() => onAddressChange(order)}
                sx={{ position: 'absolute', right: 0 }}
              >
                <Edit />
              </IconButton>
            )}

            {order.isDelivery ? renderAddress(order.address!) : 'from a shop'}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Status history
            </AccordionSummary>
            {order.statuses.map((status, index) => (
              <AccordionDetails key={index}>
                <Typography variant='body2'>
                  Order {status?.status}: {status?.timestamp.toLocaleString()}
                </Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        </Grid>
      </Grid>
      {isEditable && (
        <Box sx={{ alignSelf: 'flex-end' }}>
          {(onRemoveOrder != null) && (
            <Button onClick={() => onRemoveOrder(order.id!)}>Delete</Button>
          )}
          {(onStatusChange != null) && (
            <Button onClick={() => onStatusChange(order)}>Change status</Button>
          )}
        </Box>
      )}
    </ListItem>
  )
}

export default OrderItem
