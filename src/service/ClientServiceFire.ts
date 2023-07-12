import { DocumentReference, FirestoreError, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import Client from "../model/Client";
import ClientService from "./ClientService";
import firestoreApp from "../config/firebaseConfig";

const CLIENT_COLLECTION_NAME = "clients"

export default class ClientServiceFire implements ClientService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    CLIENT_COLLECTION_NAME
  );
  
  async addClient(client: Client, userId: string): Promise<Client> {
    const docRef = this.getDocRef(userId);
    try {
      await setDoc(docRef, client);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
    return client;
  }

  private getDocRef(id: string): DocumentReference {
    return doc(this.collectionRef, id);
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