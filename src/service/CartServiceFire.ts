import { CollectionReference, collection, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import CartService from "./CartService";
import firestoreApp from "../config/firebaseConfig";
import Cart from "../model/Cart";
import { getDocRef } from "../utils/firebase";
import { FirebaseError } from "firebase/app";
import FirebaseService from "./FirebaseService";

const CARTS_COLLECTION_NAME = "carts";
const USER_CART_COLLECTION_NAME = "cart";

export default class CartServiceFire
  extends FirebaseService
  implements CartService
{
  private readonly cartCollectionRef = collection(
    getFirestore(firestoreApp),
    CARTS_COLLECTION_NAME
  );

  async setCart(uid: string, id: string, quantity: number): Promise<void> {
    if (uid.length > 0) {
      const userCollectionRef = this.getUserCartRef(uid);
      const docRef = getDocRef(userCollectionRef, id);
      try {
        await setDoc(docRef, { quantity });
      } catch (err: any) {
        const firebaseError: FirebaseError = err;
        const errorMessage = this.getErrorMsg(firebaseError);
        throw errorMessage;
      }
    } else {
      throw "Authentication";
    }
  }

  async getCart(uid: string): Promise<Cart> {
    if (uid.length > 0) {
      const userCollectionRef = this.getUserCartRef(uid);
      try {
        const res: Cart = {}
        const docs = await getDocs(userCollectionRef);
        docs.forEach((doc) => res[doc.id] = doc.data().quantity)
        return res
      } catch (err: any) {
        const firebaseError: FirebaseError = err;
        const errorMessage = this.getErrorMsg(firebaseError);
        throw errorMessage;
      }
    } else {
      throw "Authentication";
    }
  }

  private getUserCartRef(uid: string): CollectionReference {
    return collection(this.cartCollectionRef, uid, USER_CART_COLLECTION_NAME);
  }

  clearCart(uid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
