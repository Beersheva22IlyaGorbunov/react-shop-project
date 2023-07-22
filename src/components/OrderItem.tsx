import React from 'react'
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
import { green, grey } from '@mui/material/colors'
import Address from '../model/Address'
import ProductQuantity from '../model/ProductQuantity'
import { getProductsPrice } from '../helpers/productHelpers'
import { Edit, ExpandMore } from '@mui/icons-material'
import useClient from '../hooks/useClient'
import { getFullName } from '../utils/person'

interface Props {
  order: Order
  isEditable?: boolean
  adminVersion?: boolean
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

const renderProducts = (products: ProductQuantity[], isAdminVersion?: boolean): JSX.Element => {
  return (
    <List disablePadding>
      {products.map((product) => (
        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={`${product.name} x ${product.quantity}`}
            secondary={!isAdminVersion && product.description}
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
  adminVersion = false,
  onRemoveOrder,
  onAddressChange,
  onStatusChange
}) => {
  const [client] = useClient(order.clientId)
  const isFinished = order.statuses[order.statuses.length - 1].status === 'finished'

  return (
    <ListItem
      sx={{
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: isFinished ? grey[300] : green[300],
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        opacity: isFinished ? 0.6 : 1,
        '&:hover': {
          opacity: 1
        }
      }}
    >
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} md={8}>
          <Typography variant='h6'>Order products:</Typography>
          <Box sx={{ marginInlineStart: 1 }}>
            {renderProducts(order.products, adminVersion)}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h6'>Delivery:</Typography>
          <Box sx={{ marginInlineStart: 1 }} position='relative'>
            {onAddressChange != null && (
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
        {adminVersion && (client != null) && (
          <Grid item xs={12}>
            <Typography variant='h6'>Client info:</Typography>
            <Typography>Name: {getFullName(client.firstName, client.surName)}</Typography>
            <Typography>Email: {client.email}</Typography>
            <Typography>Phone: {client.phone}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography>Current status: {order.statuses[order.statuses.length - 1].status}</Typography>
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
        <Box sx={{ alignSelf: 'flex-end', mt: 1 }}>
          {onRemoveOrder != null && (
            <Button onClick={() => onRemoveOrder(order.id!)} color='error' variant='contained'>Delete</Button>
          )}
          {onStatusChange != null && (
            <Button onClick={() => onStatusChange(order)} sx={{ ml: 1 }} color='warning' variant='contained'>Change status</Button>
          )}
        </Box>
      )}
    </ListItem>
  )
}

export default OrderItem
