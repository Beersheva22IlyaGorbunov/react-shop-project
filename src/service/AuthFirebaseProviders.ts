import { FacebookAuthProvider, GoogleAuthProvider } from '@firebase/auth'
import AuthProviderInfo from '../model/service/AuthProviderInfo'

const providers: Map<string, AuthProviderInfo> = new Map([
  [
    'Google',
    {
      provider: new GoogleAuthProvider(),
      name: 'Google',
      iconUrl: 'https://www.svgrepo.com/show/475656/google-color.svg',
      isEnable: true
    }
  ],
  [
    'Facebook',
    {
      provider: new FacebookAuthProvider(),
      name: 'Facebook',
      iconUrl: 'https://www.svgrepo.com/show/452196/facebook-1.svg',
      isEnable: true
    }
  ]
])

export default providers
