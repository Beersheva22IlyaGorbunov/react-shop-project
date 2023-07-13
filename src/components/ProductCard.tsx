import React from "react";
import Product from "../model/Product";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  product: Product;
  onClickFn?: () => void;
};

const placeholderUrl =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

const ProductCard: React.FC<Props> = ({ product, onClickFn }) => {
  return (
    <Card onClick={onClickFn}>
      <CardMedia
        component="img"
        sx={{ maxHeight: "180", aspectRatio: "1/1" }}
        image={product.imgLinks[0] ?? placeholderUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography variant="body1" textAlign="end">
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
