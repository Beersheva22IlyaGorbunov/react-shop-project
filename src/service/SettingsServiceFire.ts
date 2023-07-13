import {
  FirestoreError,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import HomePageSettings from "../model/settings/HomePageSettings";
import SettingsService from "./SettingsService";
import firestoreApp from "../config/firebaseConfig";
import { getDocRef } from "../utils/firebase";
import FirebaseService from "./FirebaseService";

const SETTINGS_COLLECTION_NAME = "settings";
const HOME_SETTINGS_DOC = "home_settings";

export default class SettingsServiceFire extends FirebaseService implements SettingsService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    SETTINGS_COLLECTION_NAME
  );

  async setHome(settings: HomePageSettings, image?: File): Promise<void> {
    const docRef = getDocRef(this.collectionRef, HOME_SETTINGS_DOC);
    if (image) {
      const [url] = await this.uploadImages([image], "banner");
      settings.bannerUrl = url;
    }
    try {
      await setDoc(docRef, settings);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
  }

  async getHome(): Promise<HomePageSettings> {
    const docRef = getDocRef(this.collectionRef, HOME_SETTINGS_DOC);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    const res: HomePageSettings = {
      title: "",
      subtitle: "",
      bannerUrl: "",
    };
    if (data) {
      res.title = data.title;
      res.subtitle = data.subtitle;
      res.bannerUrl = data.bannerUrl;
    }
    return res;
  }
}
