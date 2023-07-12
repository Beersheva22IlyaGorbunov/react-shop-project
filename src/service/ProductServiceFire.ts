import { Observable, catchError, map, of } from "rxjs";
import { collectionData } from "rxfire/firestore";
import Product from "../model/Product";
import ProductService from "./ProductService";
import { v4 as uuid } from "uuid";
import {
  FirestoreError,
  collection,
  getFirestore,
  getDocs,
  QueryDocumentSnapshot,
  DocumentReference,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  FirebaseStorage,
} from "firebase/storage";
import firestoreApp from "../config/firebaseConfig";
import { getDocRef } from "../utils/firebase";

const PRODUCTS_COLLECTION_NAME = "products";

export default class ProductServiceFire implements ProductService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    PRODUCTS_COLLECTION_NAME
  );
  private readonly storage: FirebaseStorage = getStorage(firestoreApp);

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
      }),
      map((products) => {
        console.log(products);
        return products;
      })
    ) as Observable<string | Product[]>;
  }

  async addProduct(product: Product, images: File[]): Promise<Product> {
    const newId = uuid();
    product.id = newId;
    const docRef = getDocRef(this.collectionRef, newId);
    if (images.length > 0) {
      const urls = await this.uploadImages(images);
      product.imgLinks = urls;
    }
    try {
      await setDoc(docRef, product);
    } catch (err: any) {
      const firestoreError: FirestoreError = err;
      const errorMessage = this.getErrorMsg(firestoreError);
      throw errorMessage;
    }
    return product;
  }

  private async uploadImages(images: File[]): Promise<string[]> {
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(this.storage, `/images/${image.name}`);
      return uploadBytes(storageRef, image);
    });
    const uploadResults = await Promise.all(uploadPromises);
    const urlsPromises = uploadResults.map((res) => getDownloadURL(res.ref));
    const urls = await Promise.all(urlsPromises);
    return urls;
  }

  deleteProduct(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateProduct(updatedProduct: Product): Promise<Product> {
    throw new Error("Method not implemented.");
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
    console.log(snapshot);
    return {
      id: snapshot.id,
      name: snapshot.data().name,
      imgLinks: snapshot.data().imgLinks,
      category: snapshot.data().category,
      description: snapshot.data().description,
      price: snapshot.data().price,
    };
  }
}
