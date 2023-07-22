import Address from './Address'
import Product from './Product'
import ProductQuantity from './ProductQuantity'
import orderConfig from '../config/orderConfig.json'
const { statuses } = orderConfig

interface Order {
  id?: string
  clientId: string
  products: ProductQuantity[]
  isDelivery: boolean
  address?: Address
  statuses: Array<{ status: OrderStatus, timestamp: Date }>
}

// export type OrderStatus =
//   "placed"
//   | "inProgress"
//   | "inDelivering"
//   | "readyToPick"
//   | "finished"

export type OrderStatus = keyof typeof statuses

export default Order
