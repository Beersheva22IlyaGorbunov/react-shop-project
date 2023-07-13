import { Button, Container, Modal, Paper, Typography } from "@mui/material";
import useCategories from "../../hooks/useCategories";
import CategoriesTable from "./CategoriesTable";
import { useState } from "react";
import CategoryForm from "../forms/CategoryForm";
import ActionResult from "../../model/ActionResult";
import Category from "../../model/Category";
import { categoryService } from "../../config/servicesConfig";

const CategoriesTab = () => {
  const [isLoading, error, categories] = useCategories();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  async function handleAddCategory(
    category: Category,
    file?: File
  ): Promise<ActionResult> {
    const res: ActionResult = {
      status: "success",
      message: "Category was added succesfully",
    };
    try {
      await categoryService.addCategory(category, file);
    } catch (e) {
      if (typeof e === "string") {
        res.message = e;
        res.status = "error";
      }
    }
    return res;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Categories settings</Typography>
      <Button
        variant="contained"
        sx={{ color: "white" }}
        onClick={() => setModalIsVisible(true)}
      >
        Add category
      </Button>
      <CategoriesTable loading={isLoading} categories={categories} />
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
      >
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <Paper>
            <CategoryForm onSubmit={handleAddCategory} />
          </Paper>
        </Container>
      </Modal>
    </Paper>
  );
};

export default CategoriesTab;
