import { useEffect, useState } from "react";
import Product from "../model/Product";
import { productService } from "../config/servicesConfig";

const useProductsRx = (): [boolean, string, Product[]]  => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setIsLoading(true)
    const subscription = productService.getProductsRx().subscribe({
      next: (res: Product[] | string) => {
        if (typeof res === "string") {
          setError(res)
        } else {
          setError("")
          setProducts(res);
        }
        setIsLoading(false);
      }
    })
    return () => subscription.unsubscribe();
  }, []);

  return [isLoading, error, products];
}

export default useProductsRx;