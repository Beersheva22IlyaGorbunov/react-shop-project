import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import Category from '../../model/Category'
import ActionResult from '../../model/ActionResult'

interface Props {
  initial?: Category
  onSubmit: (category: Category, file?: File) => Promise<void>
}

const emptyCategory: Category = {
  name: '',
  imageUrl: '',
  description: ''
}

const CategoryForm: React.FC<Props> = ({
  initial = emptyCategory,
  onSubmit
}) => {
  const [category, setCategory] = useState<Category>(initial)
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<string>('')

  function handleNameChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCategory((prev) => ({ ...prev, name: e.target.value }))
  }

  function handleDescriptionChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCategory((prev) => ({ ...prev, description: e.target.value }))
  }

  function handleFilesChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files instanceof FileList) {
      setFile(e.currentTarget.files[0])
    } else {
      setFile(undefined)
    }
  }

  async function handleFormSubmit (e: any) {
    e.preventDefault()
    const res = await onSubmit(category, file)
    e.target.reset()
  }

  function handleFormChange () {
    setError('')
  }

  function onResetFn () {
    setCategory(initial)
    setFile(undefined)
  }

  return (
    <Box
      component='form'
      p={2}
      onChange={handleFormChange}
      onReset={onResetFn}
      onSubmit={handleFormSubmit}
    >
      <Typography variant='h5' mb={2}>
        {initial !== emptyCategory ? 'Edit' : 'Add'} category
      </Typography>
      <Grid container spacing={1} columns={12}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            name='name'
            size='small'
            label='Name'
            variant='standard'
            value={category.name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            name='description'
            size='small'
            label='Description'
            variant='standard'
            value={category.description}
            onChange={handleDescriptionChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Button variant='contained' component='label'>
          Upload File
          <input
            onChange={handleFilesChange}
            accept='image/png, image/jpeg'
            name='images'
            type='file'
            hidden
          />
        </Button>
      </Box>
      {error && <Alert severity='error' title={error} />}
      <Box mt={1} textAlign='end'>
        <Button type='reset' variant='outlined' color='warning'>
          Reset
        </Button>
        <Button
          type='submit'
          variant='contained'
          sx={{ color: 'white', marginInlineStart: 1 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default CategoryForm
