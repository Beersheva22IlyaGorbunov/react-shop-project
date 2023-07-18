import { useEffect, useState } from "react";
import Order from "../model/Order";
import { orderService } from "../config/servicesConfig";

const useClientOrders = (uid: string): [boolean, string, Order[]] => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");

    orderService
      .getClientOrders(uid)
      .then((res: Order[]) => {
        setOrders(res);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [isLoading, error, orders];
};

export default useClientOrders;
