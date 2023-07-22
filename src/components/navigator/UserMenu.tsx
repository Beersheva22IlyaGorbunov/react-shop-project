import { Person } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthSelector, useCartSelector } from "../../redux/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuPoint from "../../model/MenuPoint";
import SignInMenu from "./SignInMenu";

interface Props {
  menuPoints: MenuPoint[];
  rawPoints?: boolean;
}

const UserMenu: React.FC<Props> = ({ menuPoints, rawPoints }) => {
  const user = useAuthSelector();
  const navigate = useNavigate();
  const cart = useCartSelector();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (user != null) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("signin");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user?.uid) {
    return <SignInMenu rawPoints={rawPoints} />;
  }

  return rawPoints ? (
    <Box
      display="flex"
      flexDirection="column"
      position="absolute"
      bottom="0"
      width="100%"
    >
      <Box textAlign="center">
        <Badge
          badgeContent={Object.values(cart).reduce(
            (accum, val) => accum + val,
            0
          )}
          color="secondary"
          max={9}
        >
          <Button onClick={() => navigate("/cart")}>Cart</Button>
        </Badge>
      </Box>
      {menuPoints.map((point) => {
        if (!point.hiddenInMenu) {
          return (
            <Button key={point.title} onClick={() => navigate(point.path)}>
              {point.title}
            </Button>
          );
        } else {
          return null;
        }
      })}
    </Box>
  ) : (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <IconButton
        onClick={() => navigate("/cart")}
        sx={{ "&:hover": { color: "primary.main" }, color: "white" }}
      >
        <Badge
          badgeContent={Object.values(cart).reduce(
            (accum, val) => accum + val,
            0
          )}
          color="secondary"
          max={9}
        >
          <ShoppingCartIcon fontSize="small" />
        </Badge>
      </IconButton>
      <div
        onClick={handleClick}
        style={{ borderRadius: "100%", cursor: "pointer" }}
      >
        <Avatar src={user?.avatarURL}>
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
      >
        {menuPoints.map((point) => {
          if (!point.hiddenInMenu) {
            return (
              <MenuItem
                key={point.title}
                onClick={() => {
                  navigate(point.path);
                  handleClose();
                }}
              >
                {point.title}
              </MenuItem>
            );
          } else {
            return null;
          }
        })}
      </Menu>
    </div>
  );
};

export default UserMenu;
