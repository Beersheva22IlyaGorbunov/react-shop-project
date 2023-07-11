import Product from "./Product";

type Order = {
  id: string;
  products: Product[];
  isDelivery: boolean;
  address: Address;
  status: "placed" | "inProgress" | "isDelivered" | "Delivered";
}

export default Order;
