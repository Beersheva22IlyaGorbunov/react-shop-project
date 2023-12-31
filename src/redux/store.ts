import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/AuthSlice'
import UserData from '../model/service/UserData'
import RootState from '../model/redux/RootState'
import { useSelector } from 'react-redux'
import { cartReducer } from './slices/CartSlice'
import Cart from '../model/Cart'
import { codeReducer } from './slices/CodeSlice'
import { settingsReducer } from './slices/SettingsSlice'
import CodeType from '../model/CodeType'

export const store = configureStore({
  reducer: {
    authState: authReducer,
    cartState: cartReducer,
    codeState: codeReducer,
    settingsState: settingsReducer
  }
})

export const useAuthSelector = (): UserData =>
  useSelector((state: RootState) => state.authState.user)
export const useCartSelector = (): Cart =>
  useSelector((state: RootState) => state.cartState.cart)
export const useCartItemSelector = (id: string): number =>
  useSelector((state: RootState) => state.cartState.cart[id] || 0)
export const useCodeTypeSelector = (): {
  code: CodeType
  message: string
} => useSelector((state: RootState) => state.codeState.codeMsg)
