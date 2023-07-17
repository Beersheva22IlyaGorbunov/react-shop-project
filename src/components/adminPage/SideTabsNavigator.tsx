import { Container, Grid, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MenuPoint from "../../model/MenuPoint";

type Props = {
  menuPoints: MenuPoint[];
};

const PATH_DEEP = 2

const SideTabsNavigator: React.FC<Props> = ({ menuPoints }) => {
  const [value, setValue] = useState<number>(0);
  const location = useLocation()
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => {
        const pathParts = location.pathname.split("/")
        return pathParts[PATH_DEEP] === point.path
      }
    );
    setValue(index)
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={2}>
          <Paper>
            <Tabs
              value={value}
              onChange={(__, newValue) => setValue(newValue)}
              variant="scrollable"
              orientation={isNarrow ? "horizontal" : "vertical"}
            >
              {menuPoints.map((point) => (
                <Tab
                  key={point.title}
                  sx={{ "&:hover": { color: "lightcoral"} }}
                  label={point.title}
                  component={Link}
                  to={point.path}
                />
              ))}
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SideTabsNavigator;
