import React, { useState } from "react";
import MenuPoint from "../../model/MenuPoint";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  SxProps,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import { ChevronLeft, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

type Props = {
  menuPoints: MenuPoint[];
  selectedTab: number;
  tabChangeFn: (tabIndex: number) => void;
};

const headerStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, .5)",
  backdropFilter: "blur(3px)",
  mt: 1,
  px: 2,
  // borderRadius: 4,
  mx: "auto",
  width: "100%",
};

const NavigatorPortrait: React.FC<Props> = ({
  menuPoints,
  selectedTab,
  tabChangeFn,
}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleMenuClick(index: number): void {
    handleDrawerClose();
    tabChangeFn(index);
  }

  function getTabs(): JSX.Element[] {
    return menuPoints.map((elem) => (
      <Tab
        sx={{ "&:hover": { color: "black" } }}
        key={elem.title}
        label={elem.title}
        component={Link}
        to={elem.path}
      />
    ));
  }

  return (
    <>
      <AppBar
        color="inherit"
        sx={headerStyle}
        position="sticky"
      >
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          color="primary"
        >
          <Menu fontSize="large"/>
        </IconButton>
        <Typography sx={{ ml: "auto", mr: "auto", pr: 3, py: 1.5, color: "white" }} variant="h6">
          {menuPoints[selectedTab]?.title ?? ""}
        </Typography>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton
          sx={{ ml: "auto", width: "40px" }}
          onClick={handleDrawerClose}
        >
          <ChevronLeft />
        </IconButton>
        <Divider />
        <Tabs
          value={selectedTab < menuPoints.length ? selectedTab : 0}
          orientation="vertical"
          onChange={(e, index) => handleMenuClick(index)}
          aria-label="basic tabs example"
        >
          {getTabs()}
        </Tabs>
      </Drawer>
    </>
  );
};

export default NavigatorPortrait;
