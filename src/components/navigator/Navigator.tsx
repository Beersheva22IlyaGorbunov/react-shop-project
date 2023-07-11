import { AppBar, SxProps, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Theme } from "@emotion/react";
import { MenuPoint } from "../../App";

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
  backgroundColor: "lightgray",
  mt: 2,
  width: "90%",
  borderRadius: 4,
  px: 2,
  left: "5%",
};

const Navigator: React.FC<Props> = ({
  menuPoints,
  selectedTab,
  tabChangeFn,
}) => {

  return (
    <AppBar sx={headerStyle} position="sticky">
      <Tabs
        value={selectedTab}
        onChange={(__, newValue) => tabChangeFn(newValue)}
        aria-label="basic tabs example"
      >
        {menuPoints.map((point) => (
          <Tab
            key={point.title}
            sx={{ "&:hover": { color: "black" } }}
            label={point.title}
            component={Link}
            to={point.path}
          />
        ))}
      </Tabs>
      <UserMenu />
    </AppBar>
  );
};

export default Navigator;
