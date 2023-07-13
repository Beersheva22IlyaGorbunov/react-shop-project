import React from "react";
import Category from "../../model/Category";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

type Props = {
  loading?: boolean;
  categories: Category[];
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.7 },
  { field: "name", headerName: "Name", flex: 1.6 },
  { field: "description", headerName: "Description", flex: 1.6 },
  {
    field: "imageUrl",
    headerName: "",
    flex: 0.8,
    renderCell: (params: GridRenderCellParams<Category>) => {
      console.log(params)
      return (<Avatar src={params.value} variant="square">
        {params.row.name}
      </Avatar>)
    },
  },
];

const CategoriesTable: React.FC<Props> = ({ loading, categories }) => {
  return <DataGrid autoHeight loading={loading} columns={columns} rows={categories} />;
};

export default CategoriesTable;
