import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";
import useSettings from "../hooks/useSettings";
import { title } from "process";

const Home = () => {
  const settings = useSettings();
  // const title = "Flowers shop";
  // const subTitle = "We are working for you since 2015";
  // const backgroundImgUrl =
  //   "https://images.squarespace-cdn.com/content/v1/57451c424c2f85ae9b18f48d/ddcb7ab1-22ab-49dd-8da9-9b3b054393a5/Claudia+Lapena+-+4A4B169D-B766-409B-BD76-AAC2590167F7.jpeg";
  return (
    <Box mt={-8}>
      <Box
        sx={{
          backgroundImage: `url(${settings?.bannerUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        height={"100vh"}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {settings?.title && settings.subtitle && (
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
            <Typography variant="h2">{settings?.title}</Typography>
            <Typography variant="h4">{settings?.subtitle}</Typography>
          </Stack>
        )}
      </Box>
      <Container maxWidth={"lg"}>
        <Typography variant="h5" my={1}>
          Popular products
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                imgLinks: [],
                category: "",
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
                category: "",
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
                category: "",
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
                category: "",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" my={1}>
          Top categories
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6} sm={4} md={3}>
            <ProductCard
              product={{
                id: "1",
                name: "Example",
                category: "",
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
                category: "",
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
                category: "",
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
                category: "",
                imgLinks: [],
                description: "Some description",
                price: 100,
              }}
            />
          </Grid>
        </Grid>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1475.592777669832!2d34.805658133238055!3d31.911086649663247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b6e51b6e1de5%3A0xc159edda556fe098!2sTel%20Ran!5e0!3m2!1sen!2sil!4v1689136943880!5m2!1sen!2sil"
          width="100%"
          height="400"
          title="Google maps"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </Container>
    </Box>
  );
};

export default Home;
