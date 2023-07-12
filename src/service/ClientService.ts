import Client from "../model/Client";

export default interface ClientService {
  addClient(client: Client, userId: string): Promise<Client>;
}