import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Container, Grid, Paper, Typography } from "@mui/material";
import ProductDetailsSkeletons from "../components/skeletons/ProductDetailsSkeletons";

const ProductDetails = () => {
  const params = useParams();
  const [isLoading, error, product] = useProduct(params.id);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        {isLoading ? (
          <ProductDetailsSkeletons />
        ) : (
          <Grid container spacing={2} columns={{xs: 6, sm: 12}}>
            <Grid item xs={6}>
              <img src={product?.imgLinks[0]} width={"100%"}></img>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">{product?.name}</Typography>
              <Typography variant="body1" sx={{ color: "gray" }}>
                Category: {product?.category}
              </Typography>
              <Typography variant="h5">{product?.price}</Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                Description:
              </Typography>
              <Typography variant="body2">{product?.description}</Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default ProductDetails;
