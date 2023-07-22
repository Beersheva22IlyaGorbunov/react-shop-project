import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import AuthState from '../../model/redux/AuthState'
import UserData from '../../model/service/UserData'

const AUTH_ITEM_STORAGE = 'auth'

function getAuthFromSession (): UserData {
  const fromlocalStorage = window.localStorage.getItem(AUTH_ITEM_STORAGE)
  return fromlocalStorage ? JSON.parse(fromlocalStorage) : null
}

const initialState: AuthState = {
  user: getAuthFromSession()
}

const slice = createSlice({
  initialState,
  name: 'authState',
  reducers: {
    signIn: (state, { payload }: PayloadAction<UserData>) => {
      state.user = payload
      if (payload != null) {
        window.localStorage.setItem(AUTH_ITEM_STORAGE, JSON.stringify(payload))
      }
    },
    signOut: (state) => {
      state.user = null
      window.localStorage.removeItem(AUTH_ITEM_STORAGE)
    }
  }
})

export const { signIn, signOut } = slice.actions
export const authReducer = slice.reducer
