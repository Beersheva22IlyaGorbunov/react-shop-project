import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const title = "Flowers shop";
  const subTitle = "We are working for you since 2015";
  const backgroundImgUrl =
    "https://images.squarespace-cdn.com/content/v1/57451c424c2f85ae9b18f48d/ddcb7ab1-22ab-49dd-8da9-9b3b054393a5/Claudia+Lapena+-+4A4B169D-B766-409B-BD76-AAC2590167F7.jpeg";
  return (
    <Box mt={-8}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        height={"100vh"}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Stack
          spacing={1}
          sx={{
            color: "white",
            backgroundColor: "rgba(0, 0, 0, .3)",
            backdropFilter: "blur(3px)",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h4">{subTitle}</Typography>
        </Stack>
      </Box>
      <Container maxWidth={"lg"}>
        <Typography variant="h5" my={1}>Popular products</Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" my={1}>Top categories</Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
