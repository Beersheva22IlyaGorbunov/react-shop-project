import { Button, Container, Modal, Paper, Typography } from '@mui/material'
import useCategories from '../../hooks/useCategories'
import CategoriesTable from './CategoriesTable'
import { useState } from 'react'
import CategoryForm from '../forms/CategoryForm'
import Category from '../../model/Category'
import { categoryService } from '../../config/servicesConfig'
import useCodeTypeDispatch from '../../hooks/useCodeTypeDispatch'

const CategoriesTab = () => {
  const [isLoading, error, categories] = useCategories()
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
  const codeTypeDispatch = useCodeTypeDispatch()

  async function handleAddCategory (
    category: Category,
    file?: File
  ): Promise<void> {
    const res = {
      success: '',
      error: ''
    }
    try {
      await categoryService.addCategory(category, file)
      res.success = `Category ${category.name} was added`
    } catch (e) {
      if (typeof e === 'string') {
        res.error = e
      }
    }
    codeTypeDispatch(res.success, res.error)
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h5'>Categories settings</Typography>
      <Button
        variant='contained'
        sx={{ color: 'white', my: 2 }}
        onClick={() => setModalIsVisible(true)}
      >
        Add category
      </Button>
      <CategoriesTable loading={isLoading} categories={categories} />
      <Modal
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
      >
        <Container maxWidth='sm' sx={{ mb: 4 }} disableGutters>
          <Paper>
            <CategoryForm onSubmit={handleAddCategory} />
          </Paper>
        </Container>
      </Modal>
    </Paper>
  )
}

export default CategoriesTab
