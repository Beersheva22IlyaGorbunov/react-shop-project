import Address from './Address'

interface Client {
  id: string
  email: string
  firstName: string
  surName: string
  phone: string
  address?: Address
}

export default Client
