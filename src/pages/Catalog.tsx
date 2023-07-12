import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Container, Grid } from "@mui/material";
import CatalogSkeleton from "../components/CatalogSkeleton";

const Catalog = () => {
  const [isLoading, error, products] = useProducts();

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {isLoading ? (
          <CatalogSkeleton />
        ) : (
          products.map((product) => (
            <Grid key={product.id} item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Catalog;
