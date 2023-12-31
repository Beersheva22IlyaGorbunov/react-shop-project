import { Observable } from 'rxjs'
import Cart from '../model/Cart'

export default interface CartService {
  updateCartItem: (uid: string, id: string, quantity: number) => Promise<void>
  deleteCartItem: (uid: string, id: string) => Promise<void>
  getCart: (uid: string) => Promise<Cart>
  getCartRx: (uid: string) => Observable<string | Cart>
  clearCart: (uid: string) => Promise<void>
}
