import ProductService from "../service/ProductService";
import ProductServiceFire from "../service/ProductServiceFire";

export const productService: ProductService = new ProductServiceFire();
