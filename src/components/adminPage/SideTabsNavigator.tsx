import { Container, Grid, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuPoint from "../../model/MenuPoint";

type Props = {
  menuPoints: MenuPoint[];
};

const SideTabsNavigator: React.FC<Props> = ({ menuPoints }) => {
  const [value, setValue] = useState<number>(0);

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
        <Grid item xs={2}>
          <Paper>
            <Tabs
              value={value}
              onChange={(__, newValue) => setValue(newValue)}
              orientation="vertical"
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
        <Grid item xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SideTabsNavigator;
