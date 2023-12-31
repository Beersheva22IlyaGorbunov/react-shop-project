import AuthService from '../service/AuthService'
import AuthServiceFirebase from '../service/AuthServiceFirebase'
import CartService from '../service/CartService'
import CartServiceFire from '../service/CartServiceFire'
import CategoryService from '../service/CategoryService'
import CategoryServiceFire from '../service/CategoryServiceFire'
import ClientService from '../service/ClientService'
import ClientServiceFire from '../service/ClientServiceFire'
import OrderService from '../service/OrderService'
import OrderServiceFire from '../service/OrderServiceFire'
import ProductService from '../service/ProductService'
import ProductServiceFire from '../service/ProductServiceFire'
import SettingsService from '../service/SettingsService'
import SettingsServiceFire from '../service/SettingsServiceFire'

export const productService: ProductService = new ProductServiceFire()
export const authService: AuthService = new AuthServiceFirebase()
export const clientService: ClientService = new ClientServiceFire()
export const settingService: SettingsService = new SettingsServiceFire()
export const cartService: CartService = new CartServiceFire()
export const categoryService: CategoryService = new CategoryServiceFire()
export const orderService: OrderService = new OrderServiceFire()
