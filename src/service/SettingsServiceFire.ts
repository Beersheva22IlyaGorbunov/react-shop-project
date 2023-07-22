import {
  FirestoreError,
  collection,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore'
import SettingsService from './SettingsService'
import firestoreApp from '../config/firebaseConfig'
import FirebaseService from './FirebaseService'
import { Settings } from '../model/redux/SettingsState'

const SETTINGS_COLLECTION_NAME = 'settings'
const HOME_SETTINGS_DOC = 'home_settings'

export default class SettingsServiceFire extends FirebaseService implements SettingsService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    SETTINGS_COLLECTION_NAME
  )

  async set (settings: Settings, image?: File): Promise<void> {
    const docRef = this.getDocRef(this.collectionRef, HOME_SETTINGS_DOC)
    try {
      if (image != null) {
        const [url] = await this.uploadImages([image], 'banner')
        settings.bannerUrl = url
      }
      await setDoc(docRef, settings)
    } catch (err: any) {
      const firestoreError: FirestoreError = err
      const errorMessage = this.getErrorMsg(firestoreError)
      throw errorMessage
    }
  }

  async get (): Promise<Settings> {
    const docRef = this.getDocRef(this.collectionRef, HOME_SETTINGS_DOC)
    const snapshot = await getDoc(docRef)
    const data = snapshot.data()
    const res: Settings = {
      title: '',
      subtitle: '',
      bannerUrl: ''
    }
    if (data != null) {
      res.title = data.title
      res.subtitle = data.subtitle
      res.bannerUrl = data.bannerUrl
    }
    return res
  }
}
