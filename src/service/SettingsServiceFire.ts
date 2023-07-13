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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const SETTINGS_COLLECTION_NAME = "settings";
const HOME_SETTINGS_DOC = "home_settings";

export default class SettingsServiceFire implements SettingsService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    SETTINGS_COLLECTION_NAME
  );
  private readonly storage = getStorage(firestoreApp);

  async setHome(settings: HomePageSettings, image?: File): Promise<void> {
    const docRef = getDocRef(this.collectionRef, HOME_SETTINGS_DOC);
    if (image) {
      const [url] = await this.uploadImages([image]);
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

  private async uploadImages(images: File[]): Promise<string[]> {
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(this.storage, `/banner/${image.name}`);
      return uploadBytes(storageRef, image);
    });
    const uploadResults = await Promise.all(uploadPromises);
    const urlsPromises = uploadResults.map((res) => getDownloadURL(res.ref));
    const urls = await Promise.all(urlsPromises);
    return urls;
  }

  private getErrorMsg(error: FirestoreError): string {
    let errMsg = error.message;
    switch (error.code) {
      case "unauthenticated":
      case "permission-denied": {
        errMsg = "Authentication";
        break;
      }
      case "not-found": {
        errMsg = "Not found";
        break;
      }
    }
    return errMsg;
  }
}
