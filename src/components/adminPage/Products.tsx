import { useState } from 'react'
import Product from '../../model/Product'
import ProductsTable from './ProductsTable'
import useProductsRx from '../../hooks/admin/useProductsRx'
import { productService } from '../../config/servicesConfig'
import useCodeTypeDispatch from '../../hooks/useCodeTypeDispatch'
import Confirmation from '../common/Confirmation'
import { Container, Paper } from '@mui/material'
import ProductForm from '../forms/ProductForm'
import CustomModal from '../CustomModal'

const Products = () => {
  const [isLoading, error, products] = useProductsRx()
  const [productToDelete, setProductToDelete] = useState<string>()
  const [productToUpdate, setProductToUpdate] = useState<Product>()
  const codeTypeDispatch = useCodeTypeDispatch()

  async function handleUpdateProduct (product: Product, images: File[]) {
    const res = {
      success: '',
      error: ''
    }
    try {
      await productService.updateProduct(product, images)
      res.success = `Product with ${product.name} was updated`
    } catch (e: any) {
      if (typeof e === 'string') {
        res.error = e
      } else {
        res.error = e.message
      }
    }
    setProductToUpdate(undefined)
    codeTypeDispatch(res.success, res.error)
  }

  async function handleRemoveProduct (id: string) {
    const res = {
      success: '',
      error: ''
    }
    try {
      await productService.deleteProduct(id)
      res.success = `Product with id: ${id} was deleted`
    } catch (e: any) {
      if (typeof e === 'string') {
        res.error = e
      } else {
        res.error = e.message
      }
    }
    setProductToDelete(undefined)
    codeTypeDispatch(res.success, res.error)
  }

  return (
    <>
      <ProductsTable
        loading={isLoading}
        products={products}
        onRemoveProduct={(id) => setProductToDelete(id)}
        onUpdateProduct={(product) => setProductToUpdate(product)}
      />
      {productToDelete && (
        <Confirmation
          title='Delete product?'
          body={`You are going to delete product with id: ${productToDelete}. Are you sure?`}
          onSubmit={async () => await handleRemoveProduct(productToDelete)}
          onCancel={() => setProductToDelete(undefined)}
        />
      )}
      {(productToUpdate != null) && (
        <CustomModal closeConfirmationText='All entered data will be lost.' onClose={() => setProductToUpdate(undefined)}>
          <Container maxWidth='sm' disableGutters>
            <Paper>
              <ProductForm
                initial={productToUpdate}
                onSubmit={handleUpdateProduct}
              />
            </Paper>
          </Container>
        </CustomModal>
      )}
    </>
  )
}

export default Products
