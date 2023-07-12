import Address from "./Address";

type Client = {
  email: string;
  firstName: string;
  surName: string;
  phone: string;
  address?: Address;
};

export default Client;
