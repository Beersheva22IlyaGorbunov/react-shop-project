import React from "react";
import ProductTable from "../components/adminPage/ProductTable";
import { Container, Grid, Paper, Tab, Tabs } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import ProductsTab from "../components/adminPage/ProductsTab";
import SideTabsNavigator from "../components/adminPage/SideTabsNavigator";
import UsersTab from "../components/adminPage/UsersTab";
import GeneralSettingsTab from "../components/adminPage/GeneralSettingsTab";
import MenuPoint from "../model/MenuPoint";

const menuPoints: MenuPoint[] = [
  {
    title: "General",
    element: <GeneralSettingsTab />,
    order: 1,
    path: "",
    forRoles: ["admin"],
  },
  {
    title: "Products",
    element: <ProductsTab />,
    order: 2,
    path: "products",
    forRoles: ["admin"],
  },
  {
    title: "Users",
    element: <UsersTab />,
    order: 3,
    path: "users",
    forRoles: ["admin"],
  }
];

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

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<SideTabsNavigator menuPoints={menuPoints}/>}>
        {getMenuPoints("admin")}
      </Route>
    </Routes>
  );
};

export default Admin;
