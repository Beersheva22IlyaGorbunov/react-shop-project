import AuthState from "./AuthState";
import CartState from "./CartState";

type RootState = {
  authState: AuthState;
  cartState: CartState;
};

export default RootState;
