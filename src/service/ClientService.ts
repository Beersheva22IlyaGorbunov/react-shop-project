import Client from "../model/Client";

export default interface ClientService {
  addClient(client: Client): Promise<Client>;
  getClient(uid: string): Promise<Client>;
}