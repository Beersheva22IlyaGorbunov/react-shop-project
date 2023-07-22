import { AuthProvider } from 'firebase/auth'

interface AuthProviderInfo {
  provider: AuthProvider
  name: string
  iconUrl: string
  isEnable: boolean
}

export default AuthProviderInfo
