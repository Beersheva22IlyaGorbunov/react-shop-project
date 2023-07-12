import { useEffect, useState } from "react";
import Product from "../model/Product";
import { productService } from "../config/servicesConfig";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts().then((res: Product[] | string) => {
      if (typeof res === "string") {

      } else {
        setProducts(res);
      }
    })
  }, []);

  return products;
}

export default useProducts;
