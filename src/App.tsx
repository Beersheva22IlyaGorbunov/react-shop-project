import React, { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigatorDispatcher from "./components/navigator/NavigatorDispatcher";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { green, purple } from "@mui/material/colors";
import Admin from "./pages/Admin";
import { useAuthSelector } from "./redux/store";
import MenuPoint from "./model/MenuPoint";

const menuPoints: MenuPoint[] = [
  {
    title: "Home",
    element: <Home />,
    order: 1,
    path: "",
    forRoles: ["admin", "user", null],
  },
  {
    title: "Catalog",
    element: <Catalog />,
    order: 2,
    path: "catalog",
    forRoles: ["admin", "user", null],
  },
  {
    title: "Admin",
    element: <Admin />,
    hasChilds: true,
    order: 3,
    path: "admin",
    forRoles: ["admin"],
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ef9a83",
    },
    secondary: {
      main: "#83d8ef",
    },
  },
});

function getMenuPoints(role: string | null): JSX.Element[] {
  return menuPoints
    .filter((point) => point.forRoles.includes(role))
    .map((point, index) => (
      <Route
        key={index}
        index={point.path === ""}
        path={point.hasChilds ? point.path + "/*" : point.path}
        element={point.element}
      />
    ));
}

function App() {
  const user = useAuthSelector();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<NavigatorDispatcher menuPoints={menuPoints} />}
          >
            {getMenuPoints(user?.role ? user.role : null)}
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
