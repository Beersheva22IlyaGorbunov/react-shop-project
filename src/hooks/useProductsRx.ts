import { useEffect, useState } from "react";
import Product from "../model/Product";
import { productService } from "../config/servicesConfig";

const useProductsRx = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const subscription = productService.getProductsRx().subscribe({
      next: (res: Product[] | string) => {
        if (typeof res === "string") {

        } else {
          setProducts(res);
        }
      }
    })
    return () => subscription.unsubscribe();
  }, []);

  return products;
}

export default useProductsRx;