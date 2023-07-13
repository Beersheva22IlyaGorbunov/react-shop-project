import Cart from "../model/Cart";

export default interface CartService {
  setCart(uid: string, id: string, quantity: number): Promise<void>;
  getCart(uid: string): Promise<Cart>;
  clearCart(uid: string): Promise<void>;
}