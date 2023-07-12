import AuthService from "../service/AuthService";
import AuthServiceFirebase from "../service/AuthServiceFirebase";
import ProductService from "../service/ProductService";
import ProductServiceFire from "../service/ProductServiceFire";

export const productService: ProductService = new ProductServiceFire();
export const authService: AuthService = new AuthServiceFirebase();
