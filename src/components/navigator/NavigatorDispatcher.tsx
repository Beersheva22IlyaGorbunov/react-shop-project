import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";
import { MenuPoint } from "../../App";

type Props = {
  menuPoints: MenuPoint[];
};

const NavigatorDispatcher: React.FC<Props> = ({ menuPoints }) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => "/" + point.path === location.pathname
    );
    if (index === -1) {
      index = 0;
    }
    navigate("/" + menuPoints[index].path);
    setValue(index);
  }, [menuPoints]);

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => "/" + point.path === location.pathname
    );
    if (index === -1) {
      index = 0;
    }
    setValue(index);
  }, [location.pathname]);

  function handleTabChange(
    newValue: number
  ): void {
      setValue(newValue);
  }

  return (
    <Box>
      {!isNarrow ? (
        <Navigator menuPoints={menuPoints} selectedTab={value} tabChangeFn={handleTabChange} />
      ) : (
        <NavigatorPortrait menuPoints={menuPoints} selectedTab={value} tabChangeFn={handleTabChange} />
      )}
      <Container sx={{ p: 2 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default NavigatorDispatcher;
