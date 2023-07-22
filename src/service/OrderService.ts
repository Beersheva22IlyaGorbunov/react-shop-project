import { Observable } from 'rxjs'
import Order from '../model/Order'

export default interface OrderService {
  placeOrder: (order: Order) => Promise<Order>
  updateOrder: (order: Order) => Promise<Order>
  getClientOrders: (uid: string) => Promise<Order[]>
  getAllOrders: () => Promise<Order[]>
  getAllOrdersRx: () => Observable<Order[] | string>
  deleteOrder: (id: string) => Promise<void>
}
