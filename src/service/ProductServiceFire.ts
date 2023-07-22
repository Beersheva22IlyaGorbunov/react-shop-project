import { Observable, catchError, map, of } from 'rxjs'
import { collectionData } from 'rxfire/firestore'
import Product from '../model/Product'
import ProductService from './ProductService'
import { v4 as uuid } from 'uuid'
import {
  collection,
  getFirestore,
  getDocs,
  QueryDocumentSnapshot,
  setDoc,
  getDoc,
  DocumentSnapshot,
  deleteDoc
} from 'firebase/firestore'
import firestoreApp from '../config/firebaseConfig'
import { FirebaseError } from 'firebase/app'
import FirebaseService from './FirebaseService'

const PRODUCTS_COLLECTION_NAME = 'products'

export default class ProductServiceFire
  extends FirebaseService
  implements ProductService {
  private readonly collectionRef = collection(
    getFirestore(firestoreApp),
    PRODUCTS_COLLECTION_NAME
  )

  async getProducts (): Promise<string | Product[]> {
    const productsSnapshot = await getDocs(this.collectionRef)
    const products: Product[] = []
    productsSnapshot.forEach((productSnapshot) => {
      const product: Product = this.convertToProduct(productSnapshot)
      products.push(product)
    })
    return products
  }

  async getProductById (id: string): Promise<Product> {
    console.log(id)
    const docRef = this.getDocRef(this.collectionRef, id)
    try {
      const productsSnapshot = await getDoc(docRef)
      return this.convertToProduct(productsSnapshot)
    } catch (err: any) {
      const firebaseError: FirebaseError = err
      const errorMessage = this.getErrorMsg(firebaseError)
      throw errorMessage
    }
  }

  async getProductsById (ids: string[]): Promise<Product[]> {
    const promises = ids.map(async (id) => {
      console.log(ids, id)
      return await this.getProductById(id)
    })
    return await Promise.all(promises)
  }

  getProductsRx (): Observable<string | Product[]> {
    return collectionData(this.collectionRef).pipe(
      catchError((err) => {
        const firebaseError: FirebaseError = err
        const errorMessage = this.getErrorMsg(firebaseError)
        return of(errorMessage)
      }),
      map((products) => {
        console.log(products)
        return products
      })
    ) as Observable<string | Product[]>
  }

  async addProduct (product: Product, images: File[]): Promise<Product> {
    const newId = uuid()
    product.id = newId
    const docRef = this.getDocRef(this.collectionRef, newId)
    if (images.length > 0) {
      const urls = await this.uploadImages(images, 'images')
      product.imgLinks = urls
    }
    try {
      await setDoc(docRef, product)
    } catch (err: any) {
      const firebaseError: FirebaseError = err
      const errorMessage = this.getErrorMsg(firebaseError)
      throw errorMessage
    }
    return product
  }

  async deleteProduct (id: string): Promise<void> {
    const docRef = this.getDocRef(this.collectionRef, id)
    try {
      await deleteDoc(docRef)
    } catch (err: any) {
      const firebaseError: FirebaseError = err
      const errorMessage = this.getErrorMsg(firebaseError)
      throw errorMessage
    }
  }

  async updateProduct (updatedProduct: Product, images: File[]): Promise<Product> {
    const docRef = this.getDocRef(this.collectionRef, updatedProduct.id!)
    if (images.length > 0) {
      const urls = await this.uploadImages(images, 'images')
      updatedProduct.imgLinks.push(...urls)
    }
    try {
      await setDoc(docRef, updatedProduct)
    } catch (err: any) {
      const firebaseError: FirebaseError = err
      const errorMessage = this.getErrorMsg(firebaseError)
      throw errorMessage
    }
    return updatedProduct
  }

  private convertToProduct (
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Product {
    const data = snapshot.data()
    if (data == null) {
      throw new FirebaseError('not-found', 'Product not found')
    }
    return {
      id: snapshot.id,
      name: data.name,
      imgLinks: data.imgLinks,
      category: data.category,
      description: data.description,
      price: data.price
    }
  }
}
