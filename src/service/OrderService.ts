import Order from "../model/Order";
import Product from "../model/Product";


export default interface OrderService {
  placeOrder(products: Product[]): Promise<Order>;
  getOrders(): Promise<Order[]>;
}