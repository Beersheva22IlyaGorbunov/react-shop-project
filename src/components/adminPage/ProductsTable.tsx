import { Avatar } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import Product from "../../model/Product";

type Props = {
  loading?: boolean;
  products: Product[];
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.7 },
  { field: "name", headerName: "Name", flex: 1.6 },
  {
    field: "price",
    headerName: "Price",
    align: "left",
    headerAlign: "left",
    type: "number",
    flex: 1.1,
  },
  { field: "category", headerName: "Category", flex: 1.7 },
  {
    field: "imgLinks",
    headerName: "",
    flex: 0.8,
    renderCell: (params: GridRenderCellParams<Product>) => (
      <Avatar src={params.value[0]} variant="square">
        {params.row.name}
      </Avatar>
    ),
  },
];

const ProductsTable: React.FC<Props> = ({ loading = false, products }) => {
  return <DataGrid autoHeight loading={loading} columns={columns} rows={products} />;
};

export default ProductsTable;
