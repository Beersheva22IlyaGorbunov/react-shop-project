import { Observable } from "rxjs";
import Product from "../model/Product";

export default interface ProductService {
  getProducts(): Promise<Product[] | string>;
  getProductsRx(): Observable<Product[] | string>;
  addProduct(product: Product): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(updatedProduct: Product): Promise<Product>;
}
