import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CodeType from '../../model/CodeType'
import CodeState from '../../model/redux/CodeState'

const initialState: CodeState = {
  codeMsg: {
    code: CodeType.OK,
    message: ''
  }
}

const slice = createSlice({
  initialState,
  name: 'codeState',
  reducers: {
    set: (state, { payload }: PayloadAction<CodeState>) => {
      state.codeMsg = payload.codeMsg
    },
    reset: (state) => {
      state.codeMsg = initialState.codeMsg
    }
  }
})

export const codeActions = slice.actions
export const codeReducer = slice.reducer
