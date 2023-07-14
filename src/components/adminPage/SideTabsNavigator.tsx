import { Container, Grid, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuPoint from "../../model/MenuPoint";

type Props = {
  menuPoints: MenuPoint[];
};

const SideTabsNavigator: React.FC<Props> = ({ menuPoints }) => {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect(() => {
  //   let index = menuPoints.findIndex(
  //     (point) => location.pathname.split("/")[1] === point.path
  //   );
  //   if (index === -1) {
  //     index = 0;
  //     navigate("/" + menuPoints[index].path);
  //     setValue(index);
  //   }
  // }, []);

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
                  sx={{ "&:hover": { color: "white" } }}
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
