import React, { useState } from 'react'
import Category from '../../model/Category'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams
} from '@mui/x-data-grid'
import { Avatar } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import Confirmation from '../common/Confirmation'
import { categoryService } from '../../config/servicesConfig'
import useCodeTypeDispatch from '../../hooks/useCodeTypeDispatch'

interface Props {
  loading?: boolean
  categories: Category[]
}

const getColumns = (
  onRemove: (category: Category) => void,
  onUpdate: (category: Category) => void
): GridColDef[] => [
  { field: 'id', headerName: 'ID', flex: 0.7 },
  { field: 'name', headerName: 'Name', flex: 1.6 },
  { field: 'description', headerName: 'Description', flex: 1.6 },
  {
    field: 'imageUrl',
    headerName: '',
    flex: 0.8,
    renderCell: (params: GridRenderCellParams<Category>) => {
      console.log(params)
      return (
        <Avatar src={params.value} variant='square'>
          {params.row.name}
        </Avatar>
      )
    }
  },
  {
    field: 'actions',
    type: 'actions',
    flex: 0.5,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        icon={<Delete />}
        onClick={() => onRemove(params.row)}
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

const CategoriesTable: React.FC<Props> = ({ loading, categories }) => {
  const [categoryToDelete, setCategoryToDelete] = useState<Category>()
  const codeTypeDispatch = useCodeTypeDispatch()

  async function deleteCategory () {
    const id = categoryToDelete!.id!
    setCategoryToDelete(undefined)
    const res = {
      success: '',
      error: ''
    }
    try {
      await categoryService.deleteCategory(id)
      res.success = `Category ${categoryToDelete!.name} was deleted`
    } catch (e: any) {
      if (typeof e === 'string') {
        res.error = e
      } else {
        res.error = e.message
      }
    }
    setCategoryToDelete(undefined)
    codeTypeDispatch(res.success, res.error)
  }

  function handleDeleteClick (category: Category) {
    setCategoryToDelete(category)
  }

  function handleUpdateClick (category: Category) {}

  return (
    <>
      <DataGrid
        autoHeight
        loading={loading}
        columns={getColumns(handleDeleteClick, handleUpdateClick)}
        rows={categories}
      />
      {(categoryToDelete != null) && (
        <Confirmation
          title='Delete category?'
          body={`You are going to delete category ${categoryToDelete.name}. Are you sure?`}
          onSubmit={deleteCategory}
          onCancel={() => setCategoryToDelete(undefined)}
        />
      )}
    </>
  )
}

export default CategoriesTable
