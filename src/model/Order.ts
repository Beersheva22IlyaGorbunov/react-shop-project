import Address from "./Address";
import Product from "./Product";
import ProductQuantity from "./ProductQuantity";

type Order = {
  id?: string;
  clientId: string;
  products: ProductQuantity[];
  isDelivery: boolean;
  address?: Address;
  // status: OrderStatus;
  // placedAt: Date;
  // updatedAt: Date;/
  statuses: {
    [status in OrderStatus]?: Date
  }
};

export type OrderStatus = "placed" | "inProgress" | "inDelivering" | "delivered" | "readyToTake";

export default Order;
