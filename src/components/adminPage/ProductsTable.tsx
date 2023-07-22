import { Avatar, useMediaQuery, useTheme } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams
} from '@mui/x-data-grid'
import React from 'react'
import Product from '../../model/Product'
import { Delete, Edit, Visibility } from '@mui/icons-material'

interface Props {
  loading?: boolean
  products: Product[]
  onRemoveProduct: (id: string) => void
  onUpdateProduct: (product: Product) => void
}

const getColumns = (
  onRemove: (id: string) => void,
  onUpdate: (product: Product) => void,
  isNarrow?: boolean,
  onDisplayDetails?: (product: Product) => void
): GridColDef[] =>
  isNarrow
    ? [
        { field: 'name', headerName: 'Name', flex: 1.6 },
        {
          field: 'imgLinks',
          headerName: '',
          flex: 0.4,
          renderCell: (params: GridRenderCellParams<Product>) => (
            <Avatar src={params.value[0]} variant='square'>
              {params.row.name}
            </Avatar>
          )
        },
        {
          field: 'actions',
          type: 'actions',
          flex: 0.4,
          getActions: (params: GridRowParams) => [
            <GridActionsCellItem
              icon={<Visibility />}
              onClick={() => {}}
              label='Display'
            />
          ]
        }
      ]
    : [
        { field: 'id', headerName: 'ID', flex: 0.7 },
        { field: 'name', headerName: 'Name', flex: 1.6 },
        {
          field: 'price',
          headerName: 'Price',
          align: 'left',
          headerAlign: 'left',
          type: 'number',
          flex: 1.1
        },
        { field: 'category', headerName: 'Category', flex: 1.7 },
        {
          field: 'imgLinks',
          headerName: '',
          flex: 0.8,
          renderCell: (params: GridRenderCellParams<Product>) => (
            <Avatar src={params.value[0]} variant='square'>
              {params.row.name}
            </Avatar>
          )
        },
        {
          field: 'actions',
          type: 'actions',
          flex: 0.5,
          getActions: (params: GridRowParams) => [
            <GridActionsCellItem
              icon={<Delete />}
              onClick={() => onRemove(params.id.toString())}
              label='Delete'
              showInMenu
            />,
            <GridActionsCellItem
              icon={<Edit />}
              onClick={() => onUpdate(params.row)}
              label='Edit'
              showInMenu
            />
          ]
        }
      ]

const ProductsTable: React.FC<Props> = ({
  loading = false,
  products,
  onRemoveProduct,
  onUpdateProduct
}) => {
  const theme = useTheme()
  const isNarrow = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <DataGrid
      autoHeight
      loading={loading}
      columns={getColumns(onRemoveProduct, onUpdateProduct, isNarrow)}
      rows={products}
    />
  )
}

export default ProductsTable
