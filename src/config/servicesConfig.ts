import AuthService from "../service/AuthService";
import AuthServiceFirebase from "../service/AuthServiceFirebase";
import ClientService from "../service/ClientService";
import ClientServiceFire from "../service/ClientServiceFire";
import ProductService from "../service/ProductService";
import ProductServiceFire from "../service/ProductServiceFire";

export const productService: ProductService = new ProductServiceFire();
export const authService: AuthService = new AuthServiceFirebase();
export const clientService: ClientService = new ClientServiceFire();
