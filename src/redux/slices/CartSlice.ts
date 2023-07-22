import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CartState from '../../model/redux/CartState'
import Cart from '../../model/Cart'

const initialState: CartState = {
  cart: {}
}

const slice = createSlice({
  initialState,
  name: 'cartState',
  reducers: {
    setCart: (state, { payload }: PayloadAction<Cart>) => {
      state.cart = Object.fromEntries(
        Object.entries(payload).filter(([__, value]) => value !== 0)
      )
    },
    updateCartItem: (
      state,
      { payload }: PayloadAction<{ id: string, quantity: number }>
    ) => {
      if (payload.quantity === 0) {
        state.cart = Object.fromEntries(
          Object.entries(state.cart).filter(([key]) => key !== payload.id)
        )
      } else {
        state.cart = { ...state.cart, [payload.id]: payload.quantity }
      }
    },
    resetCart: (state) => {
      state = initialState
    }
  }
})

export const { setCart, updateCartItem, resetCart } = slice.actions
export const cartReducer = slice.reducer
