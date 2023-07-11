import React from "react";
import Product from "../model/Product";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  product: Product;
};

const placeholderUrl =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        // maxHeight="180"
        sx={{maxHeight: "180"}}
        image={product.imgLinks[0] ?? placeholderUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography variant="body1" textAlign="end">{product.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
