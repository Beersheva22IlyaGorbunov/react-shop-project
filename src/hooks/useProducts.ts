import { useEffect, useState } from "react";
import Product from "../model/Product";
import { productService } from "../config/servicesConfig";

const useProducts = (): [boolean, string, Product[]] => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true)
    productService
      .getProducts()
      .then((res: Product[] | string) => {
        if (typeof res === "string") {
        } else {
          setProducts(res);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [isLoading, error, products];
};

export default useProducts;
