import React from 'react'
import Order from '../../model/Order'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import ProductQuantity from '../../model/ProductQuantity'

interface Props {
  loading?: boolean
  orders: Order[]
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.7 },
  { field: 'clientId', headerName: 'CLIENT ID', flex: 1.6 },
  {
    field: 'orderPrice',
    headerName: 'Price',
    align: 'left',
    headerAlign: 'left',
    type: 'number',
    flex: 1.1,
    valueGetter: ({ row }: { row: Order }) => {
      row.products.reduce((accum, product) => {
        return accum + product.price * product.quantity
      }, 0)
    }
  }
]

const OrdersTable: React.FC<Props> = ({ loading = false, orders }) => {
  return <DataGrid autoHeight loading={loading} columns={columns} rows={orders} />
}

export default OrdersTable
