import React from "react";
import Order from "../model/Order";
import { Box, ListItem, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

type Props = {
  order: Order;
};

const OrderItem: React.FC<Props> = ({ order }) => {
  // const statusesArr = Object.entries(order.statuses).sort((a, b) =>
  //   a[1] < b[1] ? -1 : 1
  // );

  return (
    <ListItem
      sx={{
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: green[500],
        borderRadius: "1rem",
        // display: "flex",
        // flexDirection:"column"
      }}
    >
      <Stack>
      <Box display="flex" gap={1}>
        <Typography>Delivery:</Typography>
        {order.isDelivery ? order.address?.city : "to pickup"}
      </Box>
      
      {
        <Typography variant="h6">
          Order {order.statuses[order.statuses.length - 1]?.status}: {order.statuses[order.statuses.length - 1]?.timestamp.toLocaleString()}
        </Typography>
      }
      </Stack>
    </ListItem>
  );
};

export default OrderItem;
