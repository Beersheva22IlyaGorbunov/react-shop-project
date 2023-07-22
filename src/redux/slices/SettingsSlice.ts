import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CodeType from '../../model/CodeType'
import CodeState from '../../model/redux/CodeState'
import SettingsState, { Settings } from '../../model/redux/SettingsState'

const initialState: SettingsState = {
  settings: undefined
}

const slice = createSlice({
  initialState,
  name: 'settingsState',
  reducers: {
    set: (state, { payload }: PayloadAction<Settings>) => {
      state.settings = payload
    }
  }
})

export const settingsActions = slice.actions
export const settingsReducer = slice.reducer
