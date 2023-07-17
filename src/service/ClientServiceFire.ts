import { DocumentReference, DocumentSnapshot, FirestoreError, QueryDocumentSnapshot, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Client from "../model/Client";
import ClientService from "./ClientService";
import firestoreApp from "../config/firebaseConfig";
import FirebaseService from "./FirebaseService";
import Product from "../model/Product";
import { FirebaseError } from "firebase/app";

const CLIENT_COLLECTION_NAME = "clients"

export default class ClientServiceFire extends FirebaseService implements ClientService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    CLIENT_COLLECTION_NAME
  );
  
  async addClient(client: Client): Promise<Client> {
    const docRef = this.getDocRef(this.collectionRef, client.id);
    try {
      await setDoc(docRef, client);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
    return client;
  }

  async getClient(uid: string): Promise<Client> {
    const docRef = this.getDocRef(this.collectionRef, uid);
    try {
      const response = await getDoc(docRef);
      return this.convertToClient(response);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
  }

  private convertToClient(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Client {
    const data = snapshot.data();
    if (!data) {
      throw new FirebaseError("not-found", "Product not found");
    }
    return {
      id: snapshot.id,
      email: data.email,
      firstName: data.firstName,
      surName: data.surName,
      phone: data.phone,
      address: data.address
    };
  }

}