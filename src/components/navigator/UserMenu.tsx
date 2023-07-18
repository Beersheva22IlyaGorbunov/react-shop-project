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
import MenuPoint from "../../model/MenuPoint";

type Props = {
  menuPoints: MenuPoint[];
};

const UserMenu: React.FC<Props> = ({ menuPoints }) => {
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
      <IconButton onClick={() => navigate("/cart")} sx={{ "&:hover": { color: "primary.main" }, color: "white" }}>
        <Badge
          badgeContent={Object.values(cart).reduce(
            (accum, val) => accum + val,
            0
          )}
          color="secondary"
          max={9}
        >
          <ShoppingCartIcon />
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
        {menuPoints.map((point) => (
          <MenuItem key={point.title} onClick={() => navigate(point.path)}>{point.title}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserMenu;
