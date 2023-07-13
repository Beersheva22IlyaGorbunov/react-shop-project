import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Container, Grid } from "@mui/material";
import CatalogSkeleton from "../components/skeletons/CatalogSkeleton";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ErrorPage from "./ErrorPage";

const Catalog = () => {
  const [isLoading, error, products] = useProducts();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        index
        element={
          <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {isLoading ? (
                <CatalogSkeleton />
              ) : (
                products.map((product) => (
                  <Grid key={product.id} item xs={3}>
                    <ProductCard
                      product={product}
                      onClickFn={() => navigate(`/catalog/${product.id}`)}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        }
      />
      <Route path=":id" element={<ProductDetails />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Catalog;
