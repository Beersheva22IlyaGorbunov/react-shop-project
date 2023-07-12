import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  initial?: string;
  onSubmit: (category: string) => void;
};

const CategoryForm: React.FC<Props> = ({ initial, onSubmit }) => {
  const [category, setCategory] = useState<string>(initial ?? "");

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(category);
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);
  }

  return (
    <Box p={2} component={"form"} onSubmit={handleFormSubmit}>
      <Typography variant="h5" mb={2}>
        {initial ? "Edit" : "Add"} category
      </Typography>
      <TextField
        fullWidth
        required
        name="name"
        size="small"
        label="Category name"
        variant="standard"
        value={category}
        onChange={handleCategoryChange}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default CategoryForm;
