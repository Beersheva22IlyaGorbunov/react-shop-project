import React, { useState } from "react";
import ProductTable from "./ProductTable";
import { Button, Container, Modal, Paper, Stack } from "@mui/material";
import ProductForm from "../forms/ProductForm";
import Product from "../../model/Product";
import { productService } from "../../config/servicesConfig";

const ProductsTab = () => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  function handleAddProduct(product: Product, images: File[]) {
    console.log(product, images)
    productService.addProduct(product, images)
  }
  
  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        sx={{ color: "white" }}
        onClick={() => setModalIsVisible(true)}
      >
        Add product
      </Button>
      <ProductTable products={[]} />
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
      >
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Paper sx={{}}>
            <ProductForm onSubmit={handleAddProduct}/>
          </Paper>
        </Container>
      </Modal>
    </Stack>
  );
};

export default ProductsTab;
