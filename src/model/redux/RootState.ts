import AuthState from './AuthState'
import CartState from './CartState'
import CodeState from './CodeState'
import SettingsState from './SettingsState'

interface RootState {
  authState: AuthState
  cartState: CartState
  codeState: CodeState
  settingsState: SettingsState
}

export default RootState
