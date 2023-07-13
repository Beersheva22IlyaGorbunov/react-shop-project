import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import Category from "../model/Category";
import CategoryService from "./CategoryService";
import FirebaseService from "./FirebaseService";
import firestoreApp from "../config/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { v4 as uuid } from "uuid";
import { getDocRef } from "../utils/firebase";

const CATEGORIES_COLLECTION_NAME = "categories";

export default class CategoryServiceFire
  extends FirebaseService
  implements CategoryService
{
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    CATEGORIES_COLLECTION_NAME
  );

  async getCategories(): Promise<Category[]> {
    const categoriesSnapshot = await getDocs(this.collectionRef);
    const categories: Category[] = [];
    categoriesSnapshot.forEach((productSnapshot) => {
      const category: Category = this.snapshotToCategory(productSnapshot);
      categories.push(category);
    });
    return categories;
  }
  async addCategory(category: Category, image?: File | undefined): Promise<Category> {
    const newId = uuid();
    category.id = newId;
    const docRef = getDocRef(this.collectionRef, newId);
    if (image) {
      const [url] = await this.uploadImages([image], "categories");
      category.imageUrl = url;
    }
    try {
      await setDoc(docRef, category);
    } catch (err: any) {
      const firebaseError: FirebaseError = err;
      const errorMessage = this.getErrorMsg(firebaseError);
      throw errorMessage;
    }
    return category;
  }
  updateCategory(
    category: Category,
    image?: File | undefined
  ): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private snapshotToCategory(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Category {
    const data = snapshot.data();
    if (!data) {
      throw new FirebaseError("not-found", "Product not found");
    }
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      description: data.description
    }
  }
}
