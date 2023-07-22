import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import AuthService from './AuthService'
import firebaseApp from '../config/firebaseConfig'
import UserData from '../model/service/UserData'
import LoginData from '../model/service/LoginData'
import authProviders from './AuthFirebaseProviders'

const ADMINISTRATORS_COLLECTION = 'administrators'

export default class AuthServiceFirebase implements AuthService {
  private readonly auth = getAuth(firebaseApp)
  private readonly administratorsCollection = collection(
    getFirestore(firebaseApp),
    ADMINISTRATORS_COLLECTION
  )

  async register (user: LoginData): Promise<string> {
    const userCredentials = await createUserWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    )
    sendEmailVerification(userCredentials.user).catch((err) => console.log(err))
    return userCredentials.user.uid
  }

  async login (providerName: string, loginData: LoginData): Promise<UserData> {
    let userData: UserData = null
    try {
      const userCredentials =
        providerName.toLowerCase() === 'email'
          ? await this.loginWithEmail(
            loginData.email,
            loginData.password
          )
          : await this.loginWithExternalProvider(providerName)
      console.log(userCredentials)
      userData = {
        email: userCredentials.user.email || '',
        uid: userCredentials.user.uid,
        avatarURL: userCredentials.user.photoURL || undefined,
        role: (await this.isAdmin(userCredentials.user.uid)) ? 'admin' : 'user'
      }
    } catch (e) {
      throw new Error('Wrong credentials')
    }
    return userData
  }

  async loginWithEmail (email: string, password: string): Promise<UserCredential> {
    const userCredentials = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    )

    return userCredentials
  }

  async loginWithExternalProvider (
    providerName: string
  ): Promise<UserCredential> {
    const providerInfo = authProviders.get(providerName)
    if (providerInfo === undefined) {
      throw new Error(`Can't find authentication provider ${providerName}`)
    }
    return await signInWithPopup(this.auth, providerInfo.provider)
  }

  private async isAdmin (uid: any): Promise<boolean> {
    const docRef = doc(this.administratorsCollection, uid)
    return (await getDoc(docRef)).exists()
  }

  async logout (): Promise<void> {
    return await signOut(this.auth)
  }

  getAvailableProviders (): Array<{ providerName: string, providerIconUrl: string }> {
    return Array.from(authProviders.entries())
      .filter((entry) => entry[1].isEnable)
      .map((entry) => ({
        providerName: entry[0],
        providerIconUrl: entry[1].iconUrl
      }))
  }
}
