import UserData from '../model/service/UserData'
import AuthProviderInfo from '../model/service/AuthProviderInfo'
import LoginData from '../model/service/LoginData'

export default interface AuthService {
  login: (providerName: string, loginData: LoginData) => Promise<UserData>
  register: (user: LoginData) => Promise<string>
  logout: () => Promise<void>
  getAvailableProviders: () => Array<{ providerName: string, providerIconUrl: string }>
}
