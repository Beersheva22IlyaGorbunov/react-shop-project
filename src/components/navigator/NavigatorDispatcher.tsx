import { Box, Container, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";
import MenuPoint from "../../model/MenuPoint";
import { useAuthSelector } from "../../redux/store";
import UserMenu from "./UserMenu";
import SignInMenu from "./SignInMenu";

type Props = {
  menuPoints: MenuPoint[];
  authMenuPoints: MenuPoint[];
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const NavigatorDispatcher: React.FC<Props> = ({ menuPoints, authMenuPoints }) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthSelector();

  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => location.pathname.split("/")[1] === point.path
    );
    if (index === -1) {
      index = 0;
      navigate("/" + menuPoints[index].path);
      setValue(index);
    }
  }, [menuPoints]);

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => location.pathname.split("/")[1] === point.path
    );
    if (index === -1) {
      index = 0;
    }
    setValue(index);
  }, [location.pathname]);

  function handleTabChange(newValue: number): void {
    setValue(newValue);
  }

  return (
    <Box flexDirection={"column"} display={"flex"} minHeight={"100vh"}>
      {!isNarrow ? (
        <Navigator
          menuPoints={menuPoints}
          selectedTab={value}
          tabChangeFn={handleTabChange}
          rightSlot={user ? <UserMenu menuPoints={authMenuPoints}/> : <SignInMenu />}
        />
      ) : (
        <NavigatorPortrait
          menuPoints={menuPoints}
          selectedTab={value}
          tabChangeFn={handleTabChange}
        />
      )}
      <Outlet />
      <Copyright sx={{ py: 3, mt: "auto" }} />
    </Box>
  );
};

export default NavigatorDispatcher;
