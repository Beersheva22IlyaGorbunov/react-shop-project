import { Box, CircularProgress, List } from "@mui/material";
import React, { useState } from "react";
import Order from "../model/Order";
import OrderItem from "./OrderItem";
import Confirmation from "./common/Confirmation";
import { orderService } from "../config/servicesConfig";

type Props = {
  loading?: boolean;
  orders: Order[];
  isEditable?: boolean;
};

const OrdersList: React.FC<Props> = ({
  loading = false,
  orders,
  isEditable = false,
}) => {
  const [removeOrderId, setRemoveOrderId] = useState<string>("");

  function removeOrder(id: string) {
    orderService.deleteOrder(id);
  }

  function handleRemoveOrder(id: string): void {
    setRemoveOrderId(id);
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ mx: "auto" }} />
      </Box>
    );
  }

  return (
    <>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            onRemoveOrder={handleRemoveOrder}
            isEditable={isEditable}
            order={order}
          />
        ))}
      </List>
      {removeOrderId && (
        <Confirmation
          title={"Delete order?"}
          body={`You are going to delete order with id: ${removeOrderId}. Are you sure?`}
          onSubmit={function (): void {
            removeOrder(removeOrderId);
            setRemoveOrderId("");
          }}
          onCancel={function (): void {
            setRemoveOrderId("");
          }}
        />
      )}
    </>
  );
};

export default OrdersList;
