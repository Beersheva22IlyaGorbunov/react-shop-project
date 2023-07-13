import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigatorDispatcher from "./components/navigator/NavigatorDispatcher";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Admin from "./pages/Admin";
import { useAuthSelector } from "./redux/store";
import MenuPoint from "./model/MenuPoint";
import SignOut from "./pages/SignOut";
import Orders from "./pages/Orders";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
    hasChilds: true,
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

const authMenuPoints: MenuPoint[] = [
  {
    title: "Orders",
    element: <Orders />,
    order: 1,
    path: "orders",
    forRoles: ["admin", "user"],
  },
  // {
  //   title: "Profile",
  //   element: <Profile />,
  //   order: 2,
  //   path: "profile",
  //   forRoles: ["admin", "user", null],
  // },
  {
    title: "Signout",
    element: <SignOut />,
    hasChilds: true,
    order: 3,
    path: "signout",
    forRoles: ["admin", "user"],
  },
]

const anonimMenuPoints: MenuPoint[] = [
  {
    title: "Sign In",
    element: <SignIn />,
    order: 1,
    path: "signin",
    forRoles: [null],
  },
  // {
  //   title: "Profile",
  //   element: <Profile />,
  //   order: 2,
  //   path: "profile",
  //   forRoles: ["admin", "user", null],
  // },
  {
    title: "Sign Up",
    element: <SignUp />,
    hasChilds: true,
    order: 3,
    path: "signup",
    forRoles: [null],
  },
]

function routesFromPoints(points: MenuPoint[]): JSX.Element[] {
  return points.map((point, index) => (
    <Route
      key={index}
      index={point.path === ""}
      path={point.hasChilds ? point.path + "/*" : point.path}
      element={point.element}
    />
  ))
}

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

function getMenuPoints(role: string | null): MenuPoint[] {
  return menuPoints
    .filter((point) => point.forRoles.includes(role))
    .sort((a, b) => {
      let res = 0;
      if (a.order && b.order) {
        res = a.order - b.order;
      }
      return res;
    });
}

function App() {
  const user = useAuthSelector();
  const currentPoints: MenuPoint[] = getMenuPoints(
    user != null ? user.role : null
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<NavigatorDispatcher menuPoints={currentPoints} />}
          >
            {routesFromPoints(currentPoints)}
            {routesFromPoints(user ? authMenuPoints : anonimMenuPoints)}
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
