import { useEffect, useState } from "react";
import Order from "../model/Order";
import { orderService } from "../config/servicesConfig";
import useCodeTypeDispatch from "./useCodeTypeDispatch";

const useClientOrders = (uid: string): [Order[], boolean, string] => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const codeTypeDispatch = useCodeTypeDispatch();

  useEffect(() => {
    setIsLoading(true);
    setError("");

    orderService
      .getClientOrders(uid)
      .then((res: Order[]) => {
        setOrders(res);
      })
      .catch((err) => {
        codeTypeDispatch("", err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [uid]);

  return [orders, isLoading, error];
};

export default useClientOrders;
