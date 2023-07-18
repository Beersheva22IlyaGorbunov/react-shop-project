import React from "react";
import Product from "../model/Product";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../redux/slices/CartSlice";
import { useAuthSelector, useCartItemSelector } from "../redux/store";
import { cartService } from "../config/servicesConfig";

type Props = {
  product: Product;
  inCart: number;
  onClickFn?: () => void;
};

const placeholderUrl =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

const ProductCard: React.FC<Props> = ({ product, inCart, onClickFn }) => {
  const user = useAuthSelector();

  function handleCartQuantityChange(newQuantity: number): void {
    cartService.updateCartItem(user?.uid || "", product.id!, newQuantity);
  }

  return (
    <Card onClick={onClickFn} sx={{cursor: "pointer"}}>
      <CardMedia
        component="img"
        sx={{ maxHeight: "180", aspectRatio: "1/1" }}
        image={product.imgLinks[0] ?? placeholderUrl}
        alt={product.name}
      />
      <CardContent sx={{ p: 1, pb: 0 }}>
        <Typography noWrap>{product.name}</Typography>
        <Typography variant="body2" textAlign="end">
          {product.price} ₪
        </Typography>
      </CardContent>
      <CardActions onClick={(e) => e.stopPropagation()}>
        <AddToCartButton count={inCart} onClick={handleCartQuantityChange} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
