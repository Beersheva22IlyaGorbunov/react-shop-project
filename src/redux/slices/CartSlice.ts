import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartState from "../../model/redux/CartState";
import Product from "../../model/Product";
import Cart from "../../model/Cart";

const initialState: CartState = {
  cart: {},
};

const slice = createSlice({
  initialState,
  name: "cartState",
  reducers: {
    setCart: (state, { payload }: PayloadAction<Cart>) => {
      state.cart = payload;
    },
    updateCartItem: (
      state,
      { payload }: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.cart = { ...state.cart, [payload.id]: payload.quantity };
    },
    resetCart: (state) => {
      state = initialState;
    },
  },
});

export const { setCart, updateCartItem, resetCart } = slice.actions;
export const cartReducer = slice.reducer;
