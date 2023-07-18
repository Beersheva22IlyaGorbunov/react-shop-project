import { useEffect, useState } from "react";
import Order from "../model/Order";
import { clientService, orderService } from "../config/servicesConfig";
import Client from "../model/Client";

const useClient = (id: string): [boolean, string, Client?] => {
  const [client, setClient] = useState<Client>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");

    clientService
      .getClient(id)
      .then((res: Client) => {
        setClient(res);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [isLoading, error, client];
};

export default useClient;
