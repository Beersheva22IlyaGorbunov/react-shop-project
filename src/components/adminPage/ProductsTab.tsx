import React, { useRef, useState } from "react";
import ProductTable from "./ProductsTable";
import {
  Button,
  ButtonGroup,
  Container,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ProductForm from "../forms/ProductForm";
import Product from "../../model/Product";
import { productService } from "../../config/servicesConfig";
import Products from "./Products";
import useCodeTypeDispatch from "../../hooks/useCodeTypeDispatch";
import CustomModal from "../CustomModal";

const ProductsTab = () => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const codeTypeDispatch = useCodeTypeDispatch();
  const productForm = <ProductForm onSubmit={handleAddProduct} />;
  const formRef = useRef(productForm);

  async function handleAddProduct(
    product: Product,
    images: File[]
  ): Promise<void> {
    const res = {
      success: "",
      error: "",
    };
    try {
      await productService.addProduct(product, images);
      res.success = `Product ${product.name} was added`;
    } catch (e) {
      if (typeof e === "string") {
        res.error = e;
      }
    }
    codeTypeDispatch(res.success, res.error);
  }

  function openModal(form: JSX.Element) {
    formRef.current = form;
    setModalIsVisible(true);
  }

  return (
    <Paper sx={{p: 2}}>
      <Typography  variant='h5'>Products settings</Typography>
      <Button
        variant="contained"
        sx={{ color: "white", my: 2 }}
        onClick={() => openModal(productForm)}
      >
        Add product
      </Button>
      <Products />
      {modalIsVisible && <CustomModal
        closeConfirmationText="All entered data will be lost."
        onClose={() => setModalIsVisible(false)}
      >
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Paper sx={{}}>{formRef.current}</Paper>
        </Container>
      </CustomModal>}
    </Paper>
  );
};

export default ProductsTab;
