import React from 'react'
import Product from '../../model/Product'
import ProductsTable from './ProductsTable'
import useProductsRx from '../../hooks/admin/useProductsRx'

const Products = () => {
  const [isLoading, error, products] = useProductsRx();
  console.log(products)

  return (
    <ProductsTable loading={isLoading} products={products}/>
  )
}

export default Products