import { Box, Button } from "@mui/material";
import React from "react";

type Props = {
  count: number;
  onClick: (newValue: number) => void;
};

const AddToCartButton: React.FC<Props> = ({ count, onClick }) => {
  return count === 0 ? (
    <Button onClick={() => onClick(1)} variant="outlined" fullWidth sx={{ textAlign: "center" }}>
      Add to cart
    </Button>
  ) : (
    <Box
      sx={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "primary.main",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}
    >
      <Button onClick={() => onClick(count - 1)}>-</Button>
      {count}
      <Button onClick={() => onClick(count + 1)}>+</Button>
    </Box>
  );
};

export default AddToCartButton;
