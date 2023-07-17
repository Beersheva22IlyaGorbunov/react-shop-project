import { AppBar, SxProps, Tab, Tabs } from "@mui/material";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Theme } from "@emotion/react";
import MenuPoint from "../../model/MenuPoint";

type Props = {
  menuPoints: MenuPoint[];
  selectedTab: number;
  rightSlot: ReactNode;
  tabChangeFn: (tabIndex: number) => void;
};

const headerStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, .5)",
  backdropFilter: "blur(3px)",
  mt: 2,
  px: 2,
  borderRadius: 4,
  mx: "auto",
  width: "90%",
};

const Navigator: React.FC<Props> = ({
  menuPoints,
  selectedTab,
  rightSlot,
  tabChangeFn,
}) => {
  return (
    <AppBar sx={headerStyle} position="sticky">
      <Tabs
        value={selectedTab}
        onChange={(__, newValue) => tabChangeFn(newValue)}
        aria-label="basic tabs example"
      >
        {menuPoints.map((point: MenuPoint) => (
          <Tab
            key={point.title}
            sx={{ "&:hover": { color: "lightcoral"}, color: "whitesmoke" }}
            label={point.title}
            component={Link}
            to={point.path}
          />
        ))}
      </Tabs>
      {rightSlot}
    </AppBar>
  );
};

export default Navigator;
