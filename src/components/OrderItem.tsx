import React, { useState } from "react";
import Order from "../model/Order";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Address from "../model/Address";
import ProductQuantity from "../model/ProductQuantity";
import { getProductsPrice } from "../helpers/productHelpers";
import Confirmation from "./common/Confirmation";

type Props = {
  order: Order;
  isEditable?: boolean;
  onRemoveOrder?: (id: string) => void;
};

const renderAddress = (address: Address): JSX.Element => {
  return (
    <Stack>
      {Object.entries(address).map(([field, value]) => (
        <Typography key={field}>
          {field}:{value}
        </Typography>
      ))}
    </Stack>
  );
};

const renderProducts = (products: ProductQuantity[]): JSX.Element => {
  return (
    <List disablePadding>
      {products.map((product) => (
        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={product.name}
            secondary={product.description}
          />
          <Typography variant="body2">{product.price}</Typography>
        </ListItem>
      ))}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {getProductsPrice(products)}
        </Typography>
      </ListItem>
    </List>
  );
};

const OrderItem: React.FC<Props> = ({
  order,
  isEditable = false,
  onRemoveOrder,
}) => {

  return (
    <ListItem
      sx={{
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: green[500],
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Order products:</Typography>
          <Box sx={{ marginInlineStart: 1 }}>
            {renderProducts(order.products)}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Delivery:</Typography>
          <Box sx={{ marginInlineStart: 1 }}>
            {order.isDelivery ? renderAddress(order.address!) : "from a shop"}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Order {order.statuses[order.statuses.length - 1]?.status}:{" "}
            {order.statuses[
              order.statuses.length - 1
            ]?.timestamp.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      {isEditable && (
        <Box sx={{ alignSelf: "flex-end" }}>
          {onRemoveOrder && <Button onClick={() => onRemoveOrder(order.id!)}>Delete</Button>}
          <Button>Update</Button>
        </Box>
      )}
    </ListItem>
  );
};

export default OrderItem;
