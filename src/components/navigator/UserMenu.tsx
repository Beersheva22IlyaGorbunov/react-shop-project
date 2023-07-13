import { Person } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthSelector, useCartSelector } from "../../redux/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserMenu = () => {
  const user = useAuthSelector();
  const navigate = useNavigate();
  const cart = useCartSelector();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("signin");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    handleClose();
    navigate("signout");
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <IconButton onClick={() => navigate("/cart")}>
        <Badge
          badgeContent={Object.values(cart).reduce((accum, val) => accum + val, 0)}
          color="secondary"
          max={9}
        >
          <ShoppingCartIcon color="primary" />
        </Badge>
      </IconButton>
      <div
        onClick={handleClick}
        style={{ borderRadius: "100%", cursor: "pointer" }}
      >
        <Avatar>
          <Person />
        </Avatar>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Link to="signout">Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
