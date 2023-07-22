import { useEffect, useState } from 'react'
import Product from '../model/Product'
import { productService } from '../config/servicesConfig'

const useProducts = (id?: string[], dependencies?: any[]): [Product[], boolean, string] => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  async function fetchProducts (): Promise<Product[]> {
    let response: string | Product[] = []
    try {
      if (id === undefined) {
        response = await productService.getProducts()
      } else {
        response = await productService.getProductsById(id)
      }
      if (typeof response === 'string') {
        throw response
      } else {
        return response
      }
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchProducts()
      .then((products) => setProducts(products))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, (dependencies != null) ? dependencies : [id])

  return [products, isLoading, error]
}

export default useProducts
