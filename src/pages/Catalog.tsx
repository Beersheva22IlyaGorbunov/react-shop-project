import React, { useMemo } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Container, Grid, Typography } from "@mui/material";
import CatalogSkeleton from "../components/skeletons/CatalogSkeleton";
import {
  NavigateFunction,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ErrorPage from "./ErrorPage";
import useCategories from "../hooks/useCategories";
import Product from "../model/Product";

function getCategoryView(
  [category, products]: [string, Product[]],
  navigateFn: NavigateFunction
): JSX.Element {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{category}</Typography>
      </Grid>
      {products.map((product) => (
        <Grid key={product.id} item xs={6} sm={4} md={3} lg={2}>
          <ProductCard
            product={product}
            inCart={0}
            onClickFn={() => navigateFn(`/catalog/${product.id}`)}
          />
        </Grid>
      ))}
    </>
  );
}

const Catalog = () => {
  const [isLoading, error, products] = useProducts();
  const navigate = useNavigate();
  const productsInCategories = useMemo(() => {
    const resObj: { [key: string]: [Product] } = products.reduce<{
      [key: string]: [Product];
    }>((accum, product) => {
      if (accum[product.category]) {
        accum[product.category].push(product);
      } else {
        accum[product.category] = [product];
      }
      return accum;
    }, {} as { [key: string]: [Product] });
    return Object.entries(resObj);
  }, [products]);

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
                productsInCategories.map((elem) =>
                  getCategoryView(elem, navigate)
                )
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
