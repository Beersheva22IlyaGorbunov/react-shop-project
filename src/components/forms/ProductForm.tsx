import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Product from "../../model/Product";

type Props = {
  onSubmit: (product: Product, images: File[]) => void;
  initial?: Product;
};

const emptyProduct: Product = {
  name: "",
  category: "",
  description: "",
  price: 0,
  imgLinks: [],
};

const ProductForm: React.FC<Props> = ({ onSubmit, initial = emptyProduct }) => {
  const categories = ["Spring", "Celebrations"];
  const [product, setProduct] = useState<Product>(initial);
  const [files, setFiles] = useState<File[]>([]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setProduct((prev) => ({
      ...prev,
      name,
    }));
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const price = +e.target.value;
    setProduct((prev) => ({
      ...prev,
      price,
    }));
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    setProduct((prev) => ({
      ...prev,
      description,
    }));
  }

  function handleCategoryChange(e: SelectChangeEvent) {
    const category = e.target.value;
    setProduct((prev) => ({
      ...prev,
      category,
    }));
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files instanceof FileList) {
      setFiles(Array.from(e.currentTarget.files));
    } else {
      setFiles([]);
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(product, files);
  }

  return (
    <Box p={2} component={"form"} onSubmit={handleFormSubmit}>
      <Typography variant="h5" mb={2}>
        {initial ? "Edit" : "Add"} product
      </Typography>
      <Grid container spacing={1} columns={12}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            name="name"
            size="small"
            label="Name"
            variant="standard"
            value={product.name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            name="price"
            size="small"
            label="Price"
            variant="standard"
            value={product.price}
            onChange={handlePriceChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            name="description"
            size="small"
            label="Description"
            variant="standard"
            value={product.description}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            required
            variant="standard"
            margin="dense"
            fullWidth
            size="small"
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              required
              value={product.category}
              label="category"
              name="category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: "flex", alignItems: "center", gap: 1, mt: 1}}>
      <Button variant="contained" component="label">
        Upload File
        <input
          onChange={handleFilesChange}
          accept="image/png, image/jpeg"
          multiple
          name="images"
          type="file"
          hidden
        />
      </Button>
      {files.length > 0 && <Typography>{files.length} {files.length === 1 ? "was" : "were"} files added</Typography>}
      </Box>
      <Box mt={1} textAlign={"end"}>
        <Button type="reset" variant="outlined" color="warning">
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ color: "white", marginInlineStart: 1 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
