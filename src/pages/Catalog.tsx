import React, { useEffect, useMemo, useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CatalogSkeleton from "../components/skeletons/CatalogSkeleton";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ErrorPage from "./ErrorPage";
import Product from "../model/Product";
import { useCartSelector } from "../redux/store";
import { Tune } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import generalConfig from "../config/generalConfig.json";

const CATEGORY_PARAM = "category";
const MIN_PRICE_PARAM = "minPrice";
const MAX_PRICE_PARAM = "maxPrice";

const FilterPanel = ({
  minPrice,
  maxPrice,
  categories,
  onChange,
}: {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  onChange: (fn: (products: Product[]) => Product[]) => void;
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterIsVisible, setFilterIsVisible] = useState<boolean>(false);
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  const [checkedCategories, setCheckedCategories] = useState<{
    [category: string]: boolean;
  }>(
    categories.reduce(
      (accum, category) => ({ ...accum, [category]: false }),
      {}
    )
  );

  useEffect(() => {
    const selectedCategory = searchParams.getAll(CATEGORY_PARAM);
    selectedCategory.forEach((category) =>
      setCheckedCategories((state) => ({
        ...state,
        [category]: true,
      }))
    );

    const paramsMinPrice = searchParams.get(MIN_PRICE_PARAM);
    if (paramsMinPrice && !isNaN(+paramsMinPrice)) {
      setPriceRange((prev) =>
        prev.map((item, index) => (index === 0 ? +paramsMinPrice : item))
      );
    }
    const paramsMaxPrice = searchParams.get(MAX_PRICE_PARAM);
    if (paramsMaxPrice && !isNaN(+paramsMaxPrice)) {
      setPriceRange((prev) =>
        prev.map((item, index) => (index === 1 ? +paramsMaxPrice : item))
      );
    }
  }, []);

  function pricePredicate(product: Product): boolean {
    if (minPrice !== priceRange[0] || maxPrice !== priceRange[1]) {
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    }
    return true;
  }

  function categoriesPredicate(product: Product): boolean {
    if (
      Object.values(checkedCategories).every((isChecked) => isChecked) ||
      Object.values(checkedCategories).every((isChecked) => !isChecked)
    ) {
      return true;
    }
    return checkedCategories[product.category];
  }

  useEffect(() => {
    function filterFn(products: Product[]) {
      return products.filter((product) =>
        [pricePredicate, categoriesPredicate].every((pred) => pred(product))
      );
    }
    onChange(filterFn);
  }, [priceRange, checkedCategories]);

  const handleCategoriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedCategories((state) => ({
      ...state,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <>
      <Paper
        sx={
          isNarrow
            ? {
                p: 2,
                backgroundColor: "white",
                position: "fixed",
                zIndex: 10,
                bottom: filterIsVisible ? 10 : "-100%",
                left: 10,
                right: 10,
              }
            : { p: 2 }
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" mb={1}>
            Filtering
          </Typography>
          {isNarrow && (
            <IconButton onClick={() => setFilterIsVisible(false)}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Typography variant="h6">Price, {generalConfig.currency}</Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <TextField
            size="small"
            variant="outlined"
            type="number"
            value={priceRange[0]}
            inputProps={{
              style: { paddingLeft: ".5rem", paddingRight: ".5rem" },
            }}
            onChange={(e) =>
              setPriceRange((prev) =>
                prev.map((item, index) =>
                  index === 0 ? +e.target.value : item
                )
              )
            }
          />
          <Typography sx={{ mx: 1 }}>-</Typography>
          <TextField
            size="small"
            variant="outlined"
            type="number"
            inputProps={{
              style: { paddingLeft: ".5rem", paddingRight: ".5rem" },
            }}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange((prev) =>
                prev.map((item, index) =>
                  index === 1 ? +e.target.value : item
                )
              )
            }
          />
        </Box>

        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          min={minPrice}
          max={maxPrice}
          size="small"
          onChange={(__, value) => setPriceRange(value as number[])}
          valueLabelDisplay="auto"
        />
        <Divider />
        <Typography variant="h6">Categories</Typography>
        <FormGroup>
          {categories.map((category, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={checkedCategories[category]}
                  onChange={handleCategoriesChange}
                  name={category}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </Paper>
      {isNarrow && (
        <IconButton
          onClick={() => setFilterIsVisible((isVisible) => !isVisible)}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "primary.main",
            display: { xs: "block", md: "hidden" },
            position: "fixed",
            bottom: 10,
            right: 10,
          }}
        >
          <Tune />
        </IconButton>
      )}
    </>
  );
};

const Catalog = () => {
  const [products, isLoading] = useProducts();
  const navigate = useNavigate();
  const cart = useCartSelector();
  const [displayableProducts, setDisplayableProducts] = useState<Product[]>([]);
  const [minPrice, maxPrice] = useMemo(
    () =>
      products.reduce(
        (accum, item) => {
          if (item.price < accum[0]) {
            accum[0] = item.price;
          }
          if (item.price > accum[1]) {
            accum[1] = item.price;
          }
          return accum;
        },
        [products[0]?.price || 0, products[0]?.price || 0]
      ),
    [products]
  );

  useEffect(() => {
    setDisplayableProducts(products);
  }, [products]);

  const categories = useMemo(() => {
    return Object.keys(
      products.reduce<{ [key: string]: undefined }>((accum, product) => {
        return { ...accum, [product.category]: undefined };
      }, {})
    );
  }, [products]);

  function handleFilterFunc(fn: (products: Product[]) => Product[]) {
    setDisplayableProducts(fn(products));
  }

  return (
    <Routes>
      <Route
        index
        element={
          <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item sm={4} md={3}>
                {isLoading ? (
                  <Skeleton variant="rounded" height="300px" />
                ) : (
                  <FilterPanel
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onChange={handleFilterFunc}
                    categories={categories}
                  />
                )}
              </Grid>
              <Grid item container xs={12} sm={8} md={9} spacing={2}>
                {isLoading ? (
                  <CatalogSkeleton />
                ) : (
                  displayableProducts.map((product) => (
                    <Grid key={product.id} item xs={6} md={4} lg={3}>
                      <ProductCard
                        product={product}
                        inCart={cart[product.id!] || 0}
                        onClickFn={() => navigate(`/catalog/${product.id}`)}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
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
