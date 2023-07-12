import { FirestoreError, collection, getFirestore, setDoc } from "firebase/firestore";
import HomePageSettings from "../model/settings/HomePageSettings";
import SettingsService from "./SettingsService";
import firestoreApp from "../config/firebaseConfig";
import { getDocRef } from "../utils/firebase";

const SETTINGS_COLLECTION_NAME = "settings"
const HOME_SETTINGS_DOC = "home_settings"

export default class SettingsServiceFire implements SettingsService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    SETTINGS_COLLECTION_NAME
  );
  
  async setHome(settings: HomePageSettings): Promise<void> {
    const docRef = getDocRef(this.collectionRef, HOME_SETTINGS_DOC);
    try {
      await setDoc(docRef, settings);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
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