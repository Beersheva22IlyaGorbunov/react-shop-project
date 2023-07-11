import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './slices/AuthSlice'
import UserData from '../model/service/UserData'
import RootState from '../model/redux/RootState'
import { useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    authState: authReducer
  }
})

export const useAuthSelector = (): UserData =>
  useSelector((state: RootState) => state.authState.user)
  