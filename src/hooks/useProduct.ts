import { useEffect, useState } from 'react'
import Product from '../model/Product'
import { productService } from '../config/servicesConfig'

const useProduct = (id?: string): [boolean, string, Product?] => {
  const [product, setProduct] = useState<Product>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    setError('')
    if (id) {
      productService
        .getProductById(id)
        .then((res: Product) => {
          setProduct(res)
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false))
    } else {
      setError("Can't find product without id")
      setIsLoading(false)
    }
  }, [])

  return [isLoading, error, product]
}

export default useProduct
