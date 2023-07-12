import { Observable, catchError, of } from "rxjs";
import { collectionData } from "rxfire/firestore";
import Product from "../model/Product";
import ProductService from "./ProductService";
import {
  FirestoreError,
  collection,
  getFirestore,
  getDocs,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentReference,
  doc,
  setDoc,
} from "firebase/firestore";
import firestoreApp from "../config/firebaseConfig";
import { randomUUID } from "crypto";

const PRODUCTS_COLLECTION_NAME = "products";

export default class ProductServiceFire implements ProductService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    PRODUCTS_COLLECTION_NAME
  );

  async getProducts(): Promise<string | Product[]> {
    const productsSnapshot = await getDocs(this.collectionRef);
    const products: Product[] = [];
    productsSnapshot.forEach((productSnapshot) => {
      const product: Product = this.getProduct(productSnapshot);
      products.push(product);
    });
    return products;
  }

  getProductsRx(): Observable<string | Product[]> {
    return collectionData(this.collectionRef).pipe(
      catchError((err) => {
        const firestoreError: FirestoreError = err;
        const errorMessage = this.getErrorMsg(firestoreError);
        return of(errorMessage);
      })
    ) as Observable<string | Product[]>;
  }

  async addProduct(product: Product): Promise<Product> {
    const newId = randomUUID();
    const docRef = this.getDocRef(newId);
    try {
      await setDoc(docRef, product);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
    return product;
  }

  deleteProduct(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateProduct(updatedProduct: Product): Promise<Product> {
    throw new Error("Method not implemented.");
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

  private getProduct(snapshot: QueryDocumentSnapshot): Product {
    return {
      id: snapshot.data().id,
      name: snapshot.data().name,
      imgLinks: snapshot.data().imgLinks,
      description: snapshot.data().description,
      price: snapshot.data().price,
    };
  }
}
