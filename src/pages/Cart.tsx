import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useAuthSelector, useCartSelector } from "../redux/store";
import useProducts from "../hooks/useProducts";
import Product from "../model/Product";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  cartService,
  clientService,
  orderService,
  productService,
} from "../config/servicesConfig";
import { OrderStatus } from "../model/Order";

type CartItemModel = Product & { quantity: number };

function CartItem({
  cartItem,
  dividerBefore = false,
  onClickFn,
}: {
  cartItem: CartItemModel;
  dividerBefore?: boolean;
  onClickFn: () => void;
}): JSX.Element {
  return (
    <>
      {dividerBefore && <Divider />}
      <ListItem
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ display: "flex", cursor: "pointer" }} onClick={onClickFn}>
          <Avatar
            sx={{ width: 48, height: 48, mr: 2 }}
            src={cartItem.imgLinks[0]}
            alt={cartItem.name}
          />
          <div>
            <Typography variant="h6">{cartItem.name}</Typography>
            <Typography variant="body2">{cartItem.category}</Typography>
          </div>
        </div>
        <div
          style={{
            marginInlineStart: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <Typography>Price: {cartItem.price}</Typography>
          </div>

          <IconButton>
            <Delete color="warning" />
          </IconButton>
        </div>
      </ListItem>
    </>
  );
}

function getItemsTotal(products: CartItemModel[]): number {
  return products.reduce((accum, item) => (accum += item.quantity), 0);
}

function getPriceTotal(products: CartItemModel[]): number {
  return products.reduce(
    (accum, item) => (accum += item.price * item.quantity),
    0
  );
}

const Cart = () => {
  const navigate = useNavigate();
  const auth = useAuthSelector();
  const cart = useCartSelector();
  const [isLoading, error, products] = useProducts(Object.keys(cart), [cart]);
  const productsInCart: Array<CartItemModel> = useMemo(() => {
    return products
      .filter((product) => cart[product.id!] !== undefined)
      .map((product) => ({
        ...product,
        quantity: cart[product.id!],
      }));
  }, [products, cart]);

  useEffect(() => {}, [cart]);

  async function placeOrder() {
    if (auth?.uid !== undefined) {
      try {
        const products = await productService.getProductsById(
          Object.keys(cart)
        );
        const productsQuantity: CartItemModel[] = products.map((product) => ({
          ...product,
          quantity: cart[product.id!],
        }));
        const client = await clientService.getClient(auth.uid);
        await orderService.placeOrder({
          clientId: auth.uid,
          products: productsQuantity,
          address: client.address,
          statuses: { placed: new Date() },
          isDelivery: false,
        });
        await cartService.clearCart(auth.uid);
      } catch (e: any) {
        console.log(e);
      }
    }
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5">In cart:</Typography>
            <List>
              {productsInCart.map((cartItem, index) => (
                <CartItem
                  key={cartItem.id}
                  dividerBefore={index !== 0}
                  cartItem={cartItem}
                  onClickFn={() => navigate(`/catalog/${cartItem.id}`)}
                />
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>
            <Typography>
              Subtotal ({getItemsTotal(productsInCart)} items):{" "}
              {getPriceTotal(productsInCart)}
            </Typography>
            <Button
              onClick={placeOrder}
              size="small"
              sx={{ mt: 2 }}
              variant="contained"
            >
              Proceed order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
