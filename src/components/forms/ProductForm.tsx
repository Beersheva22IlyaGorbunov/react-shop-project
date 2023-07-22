import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import Product from '../../model/Product'
import ActionResult from '../../model/ActionResult'
import useCategories from '../../hooks/useCategories'
import { LoadingButton } from '@mui/lab'
import ImagePreview from '../ImagePreview'

interface Props {
  onSubmit: (product: Product, images: File[]) => Promise<void>
  initial?: Product
}

const emptyProduct: Product = {
  name: '',
  category: '',
  description: '',
  price: 0,
  imgLinks: []
}

const ProductForm: React.FC<Props> = ({ onSubmit, initial = emptyProduct }) => {
  const [product, setProduct] = useState<Product>(initial)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [categoriesLoading, categoriesError, categories] = useCategories()
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')

  function handleNameChange (e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    setProduct((prev) => ({
      ...prev,
      name
    }))
  }

  function handlePriceChange (e: React.ChangeEvent<HTMLInputElement>) {
    const price = +e.target.value
    setProduct((prev) => ({
      ...prev,
      price
    }))
  }

  function handleDescriptionChange (e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value
    setProduct((prev) => ({
      ...prev,
      description
    }))
  }

  function handleCategoryChange (e: SelectChangeEvent) {
    const category = e.target.value
    setProduct((prev) => ({
      ...prev,
      category
    }))
  }

  function handleFilesChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files instanceof FileList) {
      setFiles(Array.from(e.currentTarget.files))
    } else {
      setFiles([])
    }
  }

  function handleFormSubmit (e: any) {
    setSubmitLoading(true)
    e.preventDefault()
    onSubmit(product, files)
      .then(() => e.target.reset())
      .finally(() => setSubmitLoading(false))
  }

  function handleFormChange () {
    setError('')
  }

  function onResetFn () {
    setProduct(initial)
    setFiles([])
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
        {initial !== emptyProduct ? 'Edit' : 'Add'} product
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
            value={product.name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            name='price'
            size='small'
            label='Price'
            type='number'
            onClick={(e) => {
              if (e.target instanceof HTMLInputElement) {
                e.target.select()
              }
            }}
            variant='standard'
            value={product.price}
            onChange={handlePriceChange}
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
            value={product.description}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            required
            variant='standard'
            margin='dense'
            fullWidth
            size='small'
          >
            <InputLabel id='category-label'>Category</InputLabel>
            <Select
              labelId='category-label'
              required
              value={product.category}
              label='category'
              name='category'
              onChange={handleCategoryChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {product.imgLinks.length > 0 &&
        product.imgLinks.map((link, index) => (
          <ImagePreview
            key={index}
            link={link}
            onDelete={() =>
              setProduct((product) => ({
                ...product,
                imgLinks: product.imgLinks.filter(
                  (savedLink) => savedLink !== link
                )
              }))}
          />
        ))}
      {files.length > 0 &&
        files.map((file, index) => (
          <ImagePreview
            key={index}
            link={URL.createObjectURL(file)}
            onDelete={() =>
              setFiles((files) =>
                files.filter((savedFile) => savedFile !== file)
              )}
          />
        ))}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Button variant='contained' component='label'>
          Upload File
          <input
            onChange={handleFilesChange}
            accept='image/png, image/jpeg'
            multiple
            name='images'
            type='file'
            hidden
          />
        </Button>
        {files.length > 0 && (
          <Typography>
            {files.length} {files.length === 1 ? 'file was' : ' files were'}{' '}
            added
          </Typography>
        )}
      </Box>
      {error && <Alert severity='error' title={error} />}
      <Box mt={1} textAlign='end'>
        <Button type='reset' variant='outlined' color='warning'>
          Reset
        </Button>
        <LoadingButton
          type='submit'
          loading={submitLoading}
          variant='contained'
          sx={{ color: 'white', marginInlineStart: 1 }}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default ProductForm
