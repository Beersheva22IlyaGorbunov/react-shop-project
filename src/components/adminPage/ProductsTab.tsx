import React, { useRef, useState } from "react";
import ProductTable from "./ProductsTable";
import {
  Button,
  ButtonGroup,
  Container,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import ProductForm from "../forms/ProductForm";
import Product from "../../model/Product";
import { productService } from "../../config/servicesConfig";
import CategoryForm from "../forms/CategoryForm";
import ActionResult from "../../model/ActionResult";
import Products from "./Products";

const ProductsTab = () => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const productForm = <ProductForm onSubmit={handleAddProduct}/>
  const categoryForm = <CategoryForm onSubmit={handleAddCategory} />
  const formRef = useRef(productForm)

  function handleAddCategory(category: string) {
    console.log(category)
  }

  async function handleAddProduct(product: Product, images: File[]): Promise<ActionResult> {
    const res: ActionResult = {
      status: 'success',
      message: 'Product was added succesfully'
    }
    try {
      await productService.addProduct(product, images);
    } catch (e) {
      if (typeof e === "string") {
        res.message = e
        res.status = "error"
      }
    }
    return res;
  }

  function openModal(form: JSX.Element) {
    formRef.current = form;
    setModalIsVisible(true)
  }

  return (
    <Stack spacing={1}>
      <div>
        <ButtonGroup variant="contained">
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => openModal(productForm)}
          >
            Add product
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => openModal(categoryForm)}
          >
            Add category
          </Button>
        </ButtonGroup>
      </div>
      <Products />
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
      >
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Paper sx={{}}>
            {formRef.current}
          </Paper>
        </Container>
      </Modal>
    </Stack>
  );
};

export default ProductsTab;
